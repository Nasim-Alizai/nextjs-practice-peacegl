import User from "../User";

const { Model } = require("objection");
const { getKnex } = require("../../../knex");
Model.knex(getKnex());

export default class Account extends Model {
	static get tableName() {
		return "accounts";
	}
	static get idColumn() {
		return "id";
	}

	static get relationMappings() {
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
