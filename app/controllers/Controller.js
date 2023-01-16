export default class Controller {
	parseQuery(req) {
		let sortBy =
			req.query["sortBy[]"] != undefined ? req.query["sortBy[]"] : [];
		let { page, perPage, search, replaceItems, itemsCount } = req.query;
		if (typeof sortBy == "string") {
			sortBy = [JSON.parse(sortBy)];
		} else if (typeof sortBy == "object") {
			sortBy = sortBy.map((item) => {
				return JSON.parse(item);
			});
		}
		if (page == undefined || page == 0) {
			page = 1;
		}
		if (perPage == -1) {
			perPage = 1000000000000;
			page = 1;
		}
		perPage = perPage ?? 10;
		search = search ? search : "";
		replaceItems = replaceItems ? replaceItems == "true" : false;
		itemsCount = itemsCount ? parseInt(itemsCount) : 0;
		return { sortBy, page, perPage, search, replaceItems, itemsCount };
	}

	async fetchData(req, Model, relations, searchCols) {
		try {
			let { sortBy, page, perPage, search, replaceItems, itemsCount } =
				this.parseQuery(req);
			const query = () => Model.query().where("deleted_at", null);
			let data = await this.search(
				relations(
					query()
						.limit(replaceItems ? itemsCount : perPage)
						.offset(
							perPage * page -
								perPage +
								(replaceItems ? perPage - itemsCount : 0),
						)
						.orderBy(
							sortBy.length == 0
								? [{ column: "created_at", order: "desc" }]
								: sortBy,
						),
				),
				search,
				searchCols,
			);
			return {
				result: true,
				data: {
					items: data,
					total: await this.search(query().count(), search, searchCols),
				},
				status: 200,
			};
		} catch (e) {
			return {
				result: false,
				status: 500,
				error: e,
			};
		}
	}

	async uniqueness(req, Model) {
		try {
			let { column, data } = req.query;
			return {
				result: true,
				data: {
					result: await this.exists(column, data, Model),
				},
				status: 200,
			};
		} catch (e) {
			return {
				result: false,
				status: 500,
				error: e,
			};
		}
	}

	async exists(column, data, Model) {
		let user = await Model.query().where(column, data).first();
		return user ? true : false;
	}

	search(query, search, searchColumns) {
		if (search) {
			for (let i = 0; i < searchColumns.length; i++) {
				const cols = searchColumns[i].split(",");
				if (i == 0)
					query = query.whereRaw(
						`CONCAT(${this.#getCols(cols)}) ilike '%${search}%'`,
					);
				else
					query = query.orWhereRaw(
						`CONCAT(${this.#getCols(cols)}) ilike '%${search}%'`,
					);
			}
			return query;
		}
		return query;
	}

	#getCols(cols) {
		var str = "";
		for (let i = 0; i < cols.length; i++) {
			const col = cols[i].trim();
			str += col + (i < cols.length - 1 ? " , ' ' , " : "");
		}
		return str;
	}
}
