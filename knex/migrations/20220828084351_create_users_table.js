/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
	await knex.schema.createTable("users", function (table) {
		table
			.uuid("id", { useBinaryUuid: false, primaryKey: true })
			.defaultTo(knex.raw("gen_random_uuid()"));
		table.string("firstname").notNullable();
		table.string("lastname").notNullable();
		table.string("job_title").notNullable();
		table.string("username").unique().notNullable();
		table.string("email").unique().notNullable();
		table.string("phone").notNullable();
		table.string("whatsapp").notNullable();
		table.integer("attachment_id").unsigned().nullable();
		table
			.foreign("attachment_id")
			.references("attachments.id")
			.deferrable("deferred");
		table.enu("gender", ["male", "female", "none_binary"]).notNullable();
		table
			.enu("status", ["active", "blocked", "removed"])
			.notNullable()
			.defaultTo("active");
		table.datetime("birth_date", { precision: 6 }).notNullable();
		table.timestamps(true, true, false);
		table.timestamp("deleted_at", { useTz: true }).nullable();
	});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
	await knex.raw("DROP TABLE users CASCADE");
};
