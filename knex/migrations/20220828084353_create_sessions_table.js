/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
	await knex.schema.createTable("sessions", function (table) {
		table.increments("id");
		table.timestamp("expires", { useTz: true });
		table.text("sessionToken");
		table.uuid("userId", { useBinaryUuid: false, primaryKey: false });
		table.foreign("userId").references("users.id").deferrable("deferred");
	});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
	await knex.raw("DROP TABLE sessions CASCADE");
};
