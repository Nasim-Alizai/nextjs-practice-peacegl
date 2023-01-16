/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
	await knex.schema.createTable("verification_tokens", function (table) {
		table.increments("id");
		table.string("token");
		table.timestamp("expires", { useTz: true });
	});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
	await knex.raw("DROP TABLE verification_tokens CASCADE");
};
