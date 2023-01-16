import Attachment from "./Attachment";
import Loginable from "./Loginable";

const { Model } = require("objection");
const { getKnex } = require("../../knex");
Model.knex(getKnex());

export default class User extends Model {
	static get tableName() {
		return "users";
	}
	static get idColumn() {
		return "id";
	}

	static get relationMappings() {
		// Importing models here is one way to avoid require loops.

		return {
			image: {
				relation: Model.BelongsToOneRelation,
				modelClass: Attachment,
				join: {
					from: "users.attachment_id",
					to: "attachments.id",
				},
			},
			loginable: {
				relation: Model.HasOneRelation,
				modelClass: Loginable,
				join: {
					from: "users.id",
					to: "loginable.loginable_id",
				},
			},
		};
	}
}
