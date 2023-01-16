import UserController from "../../../app/controllers/UserController";
import { authenticate, checkScope, returnData } from "../../../lib/validate";
const userController = new UserController();

export default async function handler(req, res) {
	let { user, loggedIn } = await authenticate(req, res);
	if (loggedIn) {
		switch (req.method) {
			case "GET": {
				let data = await userController.fetchData(req);
				returnData(data, res);

				break;
			}
			case "POST": {
				let data = await userController.store(req);
				returnData(data, res);

				break;
			}
			case "PATCH": {
				let data = await userController.update(req);
				returnData(data, res);

				break;
			}
			case "DELETE": {
				let data = await userController.destroy(req);
				returnData(data, res);

				break;
			}
			default:
				res.status(401).json({ error: "method unsupported" });
				break;
		}
	}
}
