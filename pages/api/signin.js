import { getKnex } from "../../knex";
const bcrypt = require("bcryptjs");

export default async function handler(req, res) {
	if (req.method == "POST") {
		const knex = getKnex();
		const user = await knex("users")
			.where({ email: req.body.email, status: "active" })
			.select("id", "firstname", "lastname", "email", "username")
			.first();
		if (user) {
			const loginable = await knex("loginable")
				.where({ loginable_id: user.id })
				.first();
			if (loginable) {
				if (await bcrypt.compare(req.body.password, loginable.password)) {
					res.status(200).json(user);
				} else {
					res.status(401).json({ message: "Incorrect Email or Password!" });
				}
			} else {
				res.status(401).json({ message: "Invalid credentials!" });
			}
		} else {
			res.status(401).json({ message: "Invalid credentials!" });
		}
	} else {
		res.status(405).json({ message: "Method not allowed!" });
	}
}
