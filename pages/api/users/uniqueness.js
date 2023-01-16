import UserController from "../../../app/controllers/UserController";
export default async function handler(req, res) {
	const userController = new UserController();
	switch (req.method) {
		case "GET": {
			let { result, data, status, error } = await userController.uniqueness(
				req
			);
			if (result) {
				res.status(status).json(data);
			} else {
				res.status(status).json(error);
			}
			break;
		}
		default:
			break;
	}
}
