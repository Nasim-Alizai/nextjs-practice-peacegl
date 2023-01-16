import { getKnex } from "../../knex";

export default async function handler(req, res) {
	const knex = getKnex();
	res.status(200).json(["ksksk"]);
}
