import Controller from "./Controller";
import User from "../models/User";
import bcrypt from "bcryptjs";
import { schema, updateSchema } from "../../configs/pages/users";

export default class UserController extends Controller {
	constructor() {
		super();
	}

	#searchColumns = [
		"firstname",
		"lastname",
		"firstname, lastname",
		"email",
		"phone",
		"whatsapp",
		"username",
		"gender",
		"job_title",
		"status",
	];

	async fetchData(req) {
		return await super.fetchData(
			req,
			User,
			this.#attachRelations,
			this.#searchColumns,
		);
	}

	async store(req) {
		try {
			return await User.transaction(async (trx) => {
				let data = await this.#validateStore(req.body);
				let {
					firstname,
					lastname,
					email,
					phone,
					whatsapp,
					username,
					birth_date,
					gender,
					job_title,
					password,
					confirm_password,

					attachment_id,
				} = data;
				let user = await User.query().insert({
					firstname,
					lastname,
					email,
					phone,
					whatsapp,
					username,
					birth_date,
					gender,
					job_title,
					attachment_id,
				});
				if (user)
					await user.$relatedQuery("loginable").insert({
						loginable_type: "user",
						password: bcrypt.hashSync(password, 10),
					});
				if (user)
					user = await this.#attachRelations(User.query().findById(user.id));
				return {
					result: true,
					data: {
						user,
					},
					status: 201,
				};
			});
		} catch (e) {
			return {
				result: false,
				status: 500,
				error: e,
			};
		}
	}

	async #validateStore(data) {
		let validate = schema.validate(data);
		if (validate.error) throw validate.error.details;
		let emailExists = await super.exists("email", validate.value.email, User);
		if (emailExists) throw "email exists";
		let usernameExists = await super.exists(
			"username",
			validate.value.username,
			User,
		);
		if (usernameExists) throw "username exists";
		return validate.value;
	}

	#attachRelations(query) {
		return query
			.withGraphFetched("[image(selectColumns)]")

			.modifiers({
				selectColumns: (builder) => {
					builder.select("id", "path");
				},
			});
	}

	async uniqueness(req) {
		return super.uniqueness(req, User);
	}

	async update(req) {
		try {
			return await User.transaction(async (trx) => {
				let data = await this.#validateUpdate(req.body);
				let {
					id,
					firstname,
					lastname,
					email,
					phone,
					whatsapp,
					username,
					birth_date,
					gender,
					job_title,

					attachment_id,
				} = data;
				let user = await this.#attachRelations(
					User.query().patchAndFetchById(id, {
						firstname,
						lastname,
						email,
						phone,
						whatsapp,
						username,
						birth_date,
						gender,
						job_title,
						attachment_id,
					}),
				);
				if (user) {
					user = await this.#attachRelations(User.query().findById(user.id));
				}
				return {
					result: true,
					data: {
						user,
					},
					status: 202,
				};
			});
		} catch (e) {
			return {
				result: false,
				status: 500,
				error: e,
			};
		}
	}

	async #validateUpdate(data) {
		let validate = updateSchema.validate(data);
		if (validate.error) throw validate.error.details;
		return validate.value;
	}

	async destroy(req) {
		try {
			let { ids } = req.body;
			await User.query()
				.whereIn("id", ids)
				.update({ deleted_at: new Date(), status: "removed" });
			return {
				result: true,
				data: {
					result: true,
				},
				status: 202,
			};
		} catch (e) {
			return {
				result: false,
				status: 500,
				error: e,
			};
		}
	}
}
