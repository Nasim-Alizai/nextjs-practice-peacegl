import { Pagination, Select } from "@mantine/core";
import React from "react";

const TablePagination = (props) => {
	const [activePage, setPage] = props.page;
	const [perPage, setPerPage] = props.perPage;
	return (
		<div className="flex justify-end mt-5 pb-4 px-4">
			<Select
				style={{ width: 100 }}
				value={perPage}
				mr="md"
				onChange={(value) => {
					setPerPage(value);
					if (Math.ceil(Number(props.total) / value) <= activePage) setPage(1);
				}}
				data={[
					{ value: 10, label: "10" },
					{ value: 25, label: "25" },
					{ value: 50, label: "50" },
					{ value: 100, label: "100" },
				]}
			/>
			<Pagination
				page={activePage}
				onChange={setPage}
				total={Math.ceil(Number(props.total) / perPage)}
			/>
		</div>
	);
};

export default TablePagination;
