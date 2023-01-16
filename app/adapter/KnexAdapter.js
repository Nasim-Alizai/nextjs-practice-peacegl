import Account from "../models/auth/Account";
import Session from "../models/auth/Session";
import VerificationToken from "../models/auth/VerificationToken";
import User from "../models/User";

export default function KnexAdapter(client, options = {}) {
	return {
		async createUser(user) {
			throw "Account doesn't exist";
		},
		async getUser(id) {
			return await User.query()
				.where({
					id: id,
					deleted_at: null,
					status: "active",
				})
				.withGraphFetched("[image(selectColumns)]")
				.modifiers({
					selectColumns: (builder) => {
						builder.select("id", "path");
					},
				})
				.first();
		},
		async getUserByEmail(email) {
			return await User.query()
				.where({
					email: email,
				})
				.withGraphFetched("[image(selectColumns)]")
				.modifiers({
					selectColumns: (builder) => {
						builder.select("id", "path");
					},
				})
				.first();
		},
		async getUserByAccount({ providerAccountId, provider }) {
			let account = await Account.query()
				.where("providerAccountId", providerAccountId)
				.first();
			if (!account) return null;
			return await User.query()
				.where({
					id: account.userId,
				})
				.withGraphFetched("[image(selectColumns)]")
				.modifiers({
					selectColumns: (builder) => {
						builder.select("id", "path");
					},
				})
				.first();
		},
		async updateUser({ id, ...data }) {
			return await User.query().where("id", id).update(data);
		},
		async deleteUser(userId) {
			return await User.query().where("id", userId).del();
		},
		async linkAccount(account) {
			return await Account.query().insert(account);
		},
		async unlinkAccount({ providerAccountId, provider }) {
			return await Account.query()
				.where("providerAccountId", providerAccountId)
				.del();
		},
		async createSession(session) {
			return await Session.query().insert(session).returning("*");
		},
		async getSessionAndUser(sessionToken) {
			let session = await Session.query()
				.where("sessionToken", sessionToken)
				.first();
			if (!session) {
				return null;
			}
			let user = await User.query()
				.where({
					id: session.userId,
					deleted_at: null,
					status: "active",
				})
				.withGraphFetched("[image(selectColumns)]")
				.modifiers({
					selectColumns: (builder) => {
						builder.select("id", "path");
					},
				})
				.first();
			if (!user) {
				return null;
			}
			return { user, session };
		},
		async updateSession(data) {
			return await Session.query()
				.where("sessionToken", data.sessionToken)
				.update(data);
		},
		async deleteSession(sessionToken) {
			return await Session.query().where("sessionToken", sessionToken).del();
		},
		async createVerificationToken(data) {
			return await VerificationToken.query().insert(data).returning("*");
		},
		async useVerificationToken({ identifier, token }) {
			try {
				const verificationToken = await VerificationToken.query()
					.where("token", token)
					.del();
				return verificationToken;
			} catch (error) {
				if (error) return null;
				throw error;
			}
		},
	};
}
