import "../styles/globals.css";
// translations
import { Providers } from "../components/layout/providers/Providers";
// layouts
import Default from "../components/layouts/Default";
import Auth from "../components/layouts/Auth";
// loading
import Router from "next/router";
import NProgress from "nprogress"; //nprogress module
import "../styles/nprogress.css"; //styles of nprogress
import { SessionProvider } from "next-auth/react";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
	switch (Component.layout) {
		case "default":
			return (
				<SessionProvider session={session}>
					<Providers>
						<Default>{<Component {...pageProps} />}</Default>
					</Providers>
				</SessionProvider>
			);
		case "auth":
			return (
				<SessionProvider session={session}>
					<Providers>
						<Auth>{<Component {...pageProps} />}</Auth>
					</Providers>
				</SessionProvider>
			);
		default:
			return (
				<SessionProvider session={session}>
					<Providers>
						<Component {...pageProps} />
					</Providers>
				</SessionProvider>
			);
	}
}

export default MyApp;
