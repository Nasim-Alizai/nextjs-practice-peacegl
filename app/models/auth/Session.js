import User from "../User";

const { Model } = require("objection");
const { getKnex } = require("../../../knex");
Model.knex(getKnex());

export default class Session extends Model {
	static get tableName() {
		return "sessions";
	}
	static get idColumn() {
		return "id";
	}

	static get relationMappings() {
		// Importing models here is one way to avoid require loops.

		return {
			user: {
				relation: Model.BelongsToOneRelation,
				modelClass: User,
				join: {
					from: "accounts.userId",
					to: "users.id",
				},
			},
		};
	}
}
