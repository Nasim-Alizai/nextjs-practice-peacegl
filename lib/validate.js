import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../pages/api/auth/[...nextauth]";

const authenticate = async (req, res) => {
	const data = await unstable_getServerSession(req, res, authOptions);
	if (data?.user) {
		return { loggedIn: true, user: data?.user, perm: data?.perm };
	} else {
		res.status(401).json({ error: "unauthorized" });
		return { loggedIn: false };
	}
};

const checkScope = async (perm, code, res) => {
	if (perm.includes(code)) {
		return true;
	} else {
		res.status(401).json({ error: "unauthorized" });
		return false;
	}
};

const returnData = async (passedData, res) => {
	let { result, data, status, error } = passedData;
	if (result) {
		res.status(status).json(data);
	} else {
		res.status(status).json({ error });
	}
};

export { authenticate, checkScope, returnData };
