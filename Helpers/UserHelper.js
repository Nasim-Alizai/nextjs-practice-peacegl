import Helper from "./Helper";
export default class UserHelper extends Helper {
	#path = "/api/users";
	async fetchItems(...options) {
		await super.fetchItems(options, this.#path);
	}

	async destroy(setItems, selectedItems) {
		await super.destroy(setItems, selectedItems, this.#path);
	}

	async exists(...options) {
		return await super.exists(options, "/api/users/uniqueness");
	}

	async create(data) {
		data = JSON.parse(JSON.stringify(data));
		delete data.image;
		return await super.create(data, this.#path);
	}

	async update(data) {
		data = JSON.parse(JSON.stringify(data));
		delete data.image;
		delete data.password;
		delete data.confirm_password;
		return await super.update(data, this.#path);
	}

	async uploadImage(file) {
		return await super.uploadFile(file, "/api/attachments/user_profile");
	}
}
