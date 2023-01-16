import User from "./User";
const { Model } = require("objection");
const { getKnex } = require("../../knex");
Model.knex(getKnex());

export default class Attachment extends Model {
	static get tableName() {
		return "attachments";
	}
	static get idColumn() {
		return "id";
	}

	static get relationMappings() {
		// Importing models here is one way to avoid require loops.

		return {
			users: {
				relation: Model.HasManyRelation,
				modelClass: User,
				join: {
					from: "attachments.id",
					to: "users.attachment_id",
				},
			},
		};
	}
}
