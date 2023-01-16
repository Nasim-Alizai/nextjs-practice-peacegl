import axios from "axios";

export default class Helper {
	async fetchItems(
		[
			search,
			perPageNum,
			pageNum,
			sortByItem,
			setItems,
			setTotal,
			setPageNum,
			setLoading,
			itemsCount = 0,
		],
		path
	) {
		setLoading(true);
		try {
			let res = await axios.get(path, {
				params: {
					search,
					perPage: perPageNum,
					page: pageNum,
					sortBy: sortByItem.map((item) => {
						item = item.split("|");
						return {
							column: item[0],
							order: item[1],
						};
					}),
					replaceItems: itemsCount > 0,
					itemsCount,
				},
			});
			if (res.status == 200) {
				if (res.data) {
					await setItems((items) =>
						itemsCount > 0 ? [...items, ...res?.data?.items] : res?.data?.items
					);
					await setTotal(res?.data?.total[0]?.count);
					if (
						Math.ceil(Number(res?.data?.total[0]?.count) / perPageNum) < pageNum
					)
						setPageNum(1);
				}
			}
		} catch (e) {}
		setLoading(false);
	}

	async destroy(setItems, selectedItems, path) {
		var temp = [];
		try {
			setItems((data) =>
				data.filter((item, i) => {
					let find = selectedItems.findIndex((item2) => {
						return item2.id == item.id;
					});
					if (find >= 0) {
						temp.push({ index: i, item });
					}
					return find < 0;
				})
			);
			let ids = selectedItems.map((item) => item.id);
			let res = await axios.delete(path, { data: { ids } });
			if (res?.data?.result == false) {
				throw "error occured";
			}
		} catch (e) {
			temp.forEach((item) => {
				setItems((data) => {
					data.splice(item.index, 0, item.item);
					return data;
				});
			});
		}
	}

	async exists([column, data], path) {
		try {
			let res = await axios.get(path, {
				params: {
					column: column,
					data: data,
				},
			});
			if (res.status == 200) {
				return res.data;
			} else {
				return false;
			}
		} catch (e) {
			return false;
		}
	}

	async create(data, path) {
		try {
			let res = await axios.post(path, data);
			if (res.status == 201) {
				return res.data;
			} else {
				return false;
			}
		} catch (e) {
			return false;
		}
	}

	async update(data, path) {
		try {
			let res = await axios.patch(path, data);
			if (res.status == 202) {
				return res.data;
			} else {
				return false;
			}
		} catch (e) {
			return false;
		}
	}

	async uploadFile(file, path) {
		try {
			let res = await axios.post(
				path,
				{ file },
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
				}
			);
			if (res.status == 201) {
				return res.data;
			} else {
				return false;
			}
		} catch (e) {
			return false;
		}
	}

	async addItem(item, items, setItems, setTotal, perPageNum, pageNum) {
		if (pageNum == 1) {
			let newItems = items;
			if (items.length == perPageNum) {
				newItems.pop();
			}
			setItems([item, ...newItems]);
			setTotal((total) => parseInt(total) + 1);
		}
	}
	async updateItem(item, setItems) {
		setItems((items) =>
			items.map((el) => {
				if (el.id == item.id) el = item;
				return el;
			})
		);
	}
}
