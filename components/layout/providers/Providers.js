import {
	ColorSchemeProvider,
	createEmotionCache,
	MantineProvider,
	useMantineTheme,
} from "@mantine/core";
import Head from "next/head";
import React, { useState } from "react";
import { Provider } from "react-redux";
import useStore from "../../../store/store";
import GlobalStyles from "../../GlobalStyles";
import rtlPlugin from "stylis-plugin-rtl";
const rtlCache = createEmotionCache({
	key: "mantine-rtl",
	stylisPlugins: [rtlPlugin],
});
export const Providers = ({ children }) => {
	const [colorScheme, setColorScheme] = useState("dark");
	const toggleColorScheme = (value) =>
		setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));
	const [rtl, setRtl] = useState(false);
	const theme = useMantineTheme();
	const store = useStore();
	return (
		<Provider store={store}>
			<Head>
				<title>CRUD for Refa</title>
				<meta name='description' content='admin panel' />
			</Head>
			<ColorSchemeProvider
				colorScheme={colorScheme}
				toggleColorScheme={toggleColorScheme}>
				<MantineProvider
					withGlobalStyles
					withNormalizeCSS
					theme={{
						colorScheme,
						breakpoints: {
							xs: 500,
							sm: 800,
							md: 1000,
							lg: 1200,
							xl: 1400,
						},
						defaultGradient: {
							from: theme.colors.blue[9],
							to: theme.colors.blue[4],
							deg: 50,
						},
						defaultRadius: "md",
						primaryColor: "blue",
						dir: rtl ? "rtl" : "ltr",
						primaryShade: { light: 7, dark: 7 },
					}}
					emotionCache={rtl ? rtlCache : undefined}>
					<GlobalStyles />
					<div dir={rtl ? "rtl" : "ltr"} className='hello'>
						{children}
					</div>
				</MantineProvider>
			</ColorSchemeProvider>
		</Provider>
	);
};
