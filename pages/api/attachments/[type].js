import nextConnect from "next-connect";
import multer from "multer";
import AttachmentController from "../../../app/controllers/AttachmentController";
import fs from "fs";
import { authenticate } from "../../../lib/validate";

let filename = "";
let fileData = null;
let attachmentController = new AttachmentController();

const upload = multer({
	storage: multer.diskStorage({
		destination: (req, file, cb) => {
			let dest = "." + attachmentController.getFileDest(req.query.type);
			fileData = file;
			fs.mkdirSync(dest, { recursive: true });
			cb(null, dest);
		},
		filename: (req, file, cb) => {
			filename = attachmentController.getFileName(file);
			cb(null, filename);
		},
	}),
});

const apiRoute = nextConnect({
	onError(error, req, res) {
		res.status(501).json({
			result: false,
			error: `Sorry something Happened! ${error.message}`,
		});
	},
	onNoMatch(req, res) {
		res
			.status(405)
			.json({ result: false, error: `Method '${req.method}' Not Allowed` });
	},
});

apiRoute.use(async (req, res, next) => {
	let { user, loggedIn, perm } = await authenticate(req, res);
	if (loggedIn) {
		await next();
	}
});

apiRoute.use(upload.array("file"));

apiRoute.post(async (req, res) => {
	let { user, loggedIn, perm } = await authenticate(req, res);
	let dest = attachmentController.getFileDest(req.query.type);
	let attachment = await attachmentController.createAttchment({
		file: fileData,
		path: `${dest}/${filename}`,
	});
	res.status(201).json({ result: true, attachment_id: attachment.id });
	filename = "";
	fileData = null;
});

export default apiRoute;

export const config = {
	api: {
		bodyParser: false,
	},
};
