/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
	await knex.schema.createTable("loginable", function (table) {
		table.increments("id");
		table
			.uuid("loginable_id", { useBinaryUuid: false, primaryKey: false })
			.defaultTo(knex.raw("gen_random_uuid()")).notNullable();
		table.string("loginable_type").notNullable();
		table.string("password").notNullable();
	});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
	await knex.raw("DROP TABLE loginable CASCADE");
};
