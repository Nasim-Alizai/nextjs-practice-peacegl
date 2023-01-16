/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
	await knex.schema.createTable("accounts", function (table) {
		table.increments("id");
		table.uuid("userId", { useBinaryUuid: false, primaryKey: false });
		table.foreign("userId").references("users.id").deferrable("deferred");
		table.text("type");
		table.text("provider");
		table.text("providerAccountId");
		table.text("refresh_token");
		table.text("access_token");
		table.integer("expires_at");
		table.text("token_type");
		table.text("scope");
		table.text("id_token");
		table.text("session_state");
		table.text("oauth_token_secret");
		table.text("oauth_token");
	});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
	await knex.raw("DROP TABLE accounts CASCADE");
};
