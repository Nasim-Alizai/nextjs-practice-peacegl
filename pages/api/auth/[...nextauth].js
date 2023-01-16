import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";
import KnexAdapter from "../../../app/adapter/KnexAdapter";
import {
	authorize,
	decode,
	encode,
	jwtCallback,
	sessionCallback,
} from "../../../lib/auth";
export const authOptions = {
	adapter: KnexAdapter(),
	// Configure one or more authentication providers
	providers: [
		GithubProvider({
			clientId: process.env.GITHUB_ID,
			clientSecret: process.env.GITHUB_SECRET,
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		}),
		FacebookProvider({
			clientId: process.env.FACEBOOK_CLIENT_ID,
			clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
		}),
		CredentialsProvider({
			name: "credentials",
			credentials: {
				email: { label: "email", type: "text", placeholder: "email" },
				password: { label: "Password", type: "password" },
			},
			authorize,
		}),
	],
	session: {
		jwt: true,
		maxAge: process.env.JWT_MAX_AGE,
	},
	jwt: {
		encode,
		decode,
	},
	callbacks: {
		jwt: jwtCallback,
		session: sessionCallback,
	},
	pages: {
		signIn: "/auth/signin",
		error: "/auth/error",
	},
};

export default NextAuth(authOptions);
