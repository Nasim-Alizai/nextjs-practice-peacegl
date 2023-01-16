const { Model } = require("objection");
const { getKnex } = require("../../knex");
Model.knex(getKnex());

export default class Loginable extends Model {
	static get tableName() {
		return "loginable";
	}
	static get idColumn() {
		return "id";
	}

	static get relationMappings() {
		// Importing models here is one way to avoid require loops.

		return {};
	}
}
