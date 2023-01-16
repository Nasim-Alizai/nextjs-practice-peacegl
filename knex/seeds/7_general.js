/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
let { faker } = require("@faker-js/faker");
const bcrypt = require("bcryptjs");
const password = "password";
const hash = bcrypt.hashSync(password, 10);
exports.seed = async function (knex) {
	// Deletes ALL existing entries
	await knex("sessions").del();
	await knex("loginable").del();
	await knex("users").del();
	await knex("attachments").del();
	for (let i = 0; i < 50; i++) {
		let attachment = await knex("attachments")
			.insert({
				path: faker.image.avatar(),
				name: "",
				mime_type: "image/png",
				size: "20000",
			})
			.returning("id");
		let user = await knex("users")
			.insert({
				firstname: faker.name.firstName(),
				lastname: faker.name.lastName(),
				username: faker.helpers.unique(faker.internet.userName),
				email: faker.helpers.unique(faker.internet.email),
				phone: faker.helpers.unique(faker.phone.number),
				whatsapp: faker.helpers.unique(faker.phone.number),
				job_title: faker.company.bsNoun(),
				gender: faker.helpers.arrayElement(["male", "female", "none_binary"]),
				status: faker.helpers.arrayElement(["active", "blocked"]),
				attachment_id: attachment[0].id,
				birth_date: faker.date.past(),
			})
			.returning("*");
		console.log(user[0].username);

		let user_id = user[0].id;
		await knex("loginable").insert({
			loginable_type: "user",
			loginable_id: user_id,
			password: hash,
		});
	}
	let image = await knex("attachments").first();
	let user = await knex("users")
		.insert({
			firstname: "admin",
			lastname: "admin",
			username: faker.helpers.unique(faker.internet.userName),
			email: "admin@admin.com",
			phone: faker.helpers.unique(faker.phone.number),
			whatsapp: faker.helpers.unique(faker.phone.number),
			job_title: faker.company.bsNoun(),
			gender: faker.helpers.arrayElement(["male", "female", "none_binary"]),
			status: "active",
			birth_date: faker.date.past(),
			attachment_id: image.id,
		})
		.returning("id");

	let user_id = user[0].id;
	await knex("loginable").insert({
		loginable_type: "user",
		loginable_id: user_id,
		password: hash,
	});
};
