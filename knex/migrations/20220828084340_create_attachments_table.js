/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
	await knex.schema.createTable("attachments", function (table) {
		table.increments("id");
		table.string("path");
		table.string("name");
		table.string("mime_type");
		table.string("size");
		// table.uuid("created_by", { useBinaryUuid: false, primaryKey: false });
		// table.foreign("created_by").references("users.id").deferrable("deferred");
		table.timestamps(true, true, false);
		table.timestamp("deleted_at", { useTz: true }).nullable();
	});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
	await knex.raw("DROP TABLE attachments CASCADE");
};
