import Controller from "./Controller";
import Attachments from "../models/Attachment";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";

export default class AttachmentController extends Controller {
	constructor() {
		super();
	}

	async fetchData(req) {}

	async store(req) {}
	update() {}
	delete() {}

	getFileDest(type) {
		switch (type) {
			case "user_profile": {
				return "/public/uploads/profiles";
			}
			default: {
				return "/public/uploads";
			}
		}
	}

	async createAttchment(data) {
		var stats = fs.statSync("." + data.path);
		var fileSizeInBytes = stats["size"];
		let attachment = await Attachments.query()
			.insert({
				path: data.path.replace("public/", ""),
				name: data.file.originalname,
				mime_type: data.file.mimetype,
				size: fileSizeInBytes,
			})
			.returning("*");
		return attachment;
	}

	getFileName(file) {
		return uuidv4() + "-" + new Date().getTime() + file.originalname;
	}
}
