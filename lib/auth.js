import Loginable from "../app/models/Loginable";
import User from "../app/models/User";
const bcrypt = require("bcryptjs");
import * as jwt from "jsonwebtoken";
import Session from "../app/models/auth/Session";

const authorize = async (credentials, req) => {
	const user = await User.query()
		.where({
			email: credentials.email,
			deleted_at: null,
			status: "active",
		})
		.first();
	if (user) {
		const loginable = await Loginable.query()
			.where({
				loginable_id: user.id,
			})
			.first();
		if (loginable) {
			if (await bcrypt.compare(credentials.password, loginable.password)) {
				return user;
			}
		}
	}
	return null;
};

const encode = async ({ token, secret }) => {
	return jwt.sign({ ...token, userId: token.id }, secret, {
		algorithm: "HS512",
		expiresIn: process.env.JWT_MAX_AGE, // 30 days
	});
};

const decode = async ({ secret, token }) => {
	return jwt.verify(token, secret, { algorithms: ["HS512"] });
};

const insertSession = async (user, tokenEnq) => {
	let ses = await Session.query().where("userId", user.id).first();
	if (!ses) {
		await Session.query().insert({
			sessionToken: tokenEnq,
			userId: user.id,
			expires: new Date(
				parseInt(new Date().getTime()) + parseInt(process.env.JWT_MAX_AGE),
			),
		});
	} else {
		await Session.query()
			.where("id", ses.id)
			.patch({
				sessionToken: tokenEnq,
				expires: new Date(
					parseInt(new Date().getTime()) + parseInt(process.env.JWT_MAX_AGE),
				),
			});
	}
};

const jwtCallback = async ({ token, user, account, profile, isNewUser }) => {
	if (token && user) {
		token.user = user;
		let tokenEnq = await encode({ token, secret: process.env.NEXTAUTH_SECRET });
		await insertSession(user, tokenEnq);
	}
	return token;
};

const getPermissions = async (user) => {
	let temp = [];
	let user_with_perm = await User.query()
		.where("id", user.id)

		.modifiers({
			selectCol: (builder) => {
				builder.select("permissions.code");
			},
		})
		.first();
	return temp.map((item) => item?.code);
};

const sessionCallback = async ({ session, token, user }) => {
	session.user = user;
	session.perm = await getPermissions(user);
	return session;
};

export { authorize, encode, decode, jwtCallback, sessionCallback };
