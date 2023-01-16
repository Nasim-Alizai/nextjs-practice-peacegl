export default class GlobalHelper {
	async fetchItems(data) {
		try {
			let res = await axios.get("/api/clients", { params: data });
			if (res.status == 200) {
				return res.data;
			} else {
				return false;
			}
		} catch (e) {
			return false;
		}
	}
	dataURLtoFile = (dataurl, filename) => {
		var arr = dataurl.split(","),
			mime = arr[0].match(/:(.*?);/)[1],
			bstr = atob(arr[1]),
			n = bstr.length,
			u8arr = new Uint8Array(n),
			extention = dataurl.substring(
				"data:image/".length,
				dataurl.indexOf(";base64")
			);
		while (n--) {
			u8arr[n] = bstr.charCodeAt(n);
		}
		return new File([u8arr], filename + "." + extention, {
			type: mime,
		});
	};
}
