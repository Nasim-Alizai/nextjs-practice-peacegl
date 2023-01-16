import { getKnex } from "../../knex";

const { faker } = require("@faker-js/faker");

 export default async function handler(req, res) {
    const knex = getKnex();

    const user = await knex("users").insert({
			firstname: faker.name.firstName(),
			lastname: faker.name.lastName(),
			username: faker.helpers.unique(faker.internet.userName),
			email: faker.helpers.unique(faker.internet.email),
			phone: faker.helpers.unique(faker.phone.number),
			job_title: faker.company.bsNoun(),
			image: faker.image.avatar(),
			gender: faker.helpers.arrayElement(["male", "female", "none_binary"]),
			status: faker.helpers.arrayElement(["active", "blocked", "removed"]),
			birth_date: faker.date.birthdate(),
		}).returning('id');

        res.status(200).json(user);

};


