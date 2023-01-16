import {
	createStyles,
	Table,
	Checkbox,
	ScrollArea,
	useMantineTheme,
	LoadingOverlay,
} from "@mantine/core";

import Th from "./Th";
import TablePagination from "./TablePagination";
import Tr from "./Tr";
import { memo } from "react";
const useStyles = createStyles((theme) => ({
	rowSelected: {
		backgroundColor:
			theme.colorScheme === "dark"
				? theme.fn.rgba(theme.colors[theme.primaryColor][7], 0.2)
				: theme.colors[theme.primaryColor][0],
	},
}));

const DataTable = (props) => {
	let { data, headers, loading } = props;
	const theme = useMantineTheme();
	const [selection, setSelection] = props.selection;
	const [sortBy, setSortBy] = props.sortBy;
	// const [descSort, setdescSort] = props.descSort;

	const toggleRow = (item) =>
		setSelection((current) =>
			current.findIndex((item2) => item.id == item2.id) > -1
				? current.filter((item3) => item3.id !== item.id)
				: [...current, item]
		);
	const toggleAll = () =>
		setSelection((current) =>
			current.length === data.length ? [] : data.map((item) => item)
		);

	const setSorting = async (field) => {
		if (sortBy.includes(`${field}|asc`)) {
			let filter = sortBy.filter((item) => item != `${field}|asc`);
			await setSortBy([...filter, `${field}|desc`]);
		} else if (sortBy.includes(`${field}|desc`)) {
			let filter = sortBy.filter((item) => item != `${field}|desc`);
			await setSortBy([...filter]);
		} else {
			await setSortBy([...sortBy, `${field}|asc`]);
		}
	};

	const isDesc = (value) => {
		return sortBy.includes(`${value}|desc`);
	};
	const isSorted = (value) => {
		return sortBy.includes(`${value}|desc`) || sortBy.includes(`${value}|asc`);
	};
	// sort end
	// rows
	const rows = data.map((item) => {
		const selected = selection.findIndex((item2) => item.id == item2.id) > -1;
		return (
			<Tr
				item={item}
				selected={selected}
				headers={headers}
				useStyles={useStyles}
				toggleRow={toggleRow}
				props={props}
				key={item.id}
			></Tr>
		);
	});

	return (
		<>
			<ScrollArea
				style={{ height: 610, position: "relative" }}
				offsetScrollbars
			>
				<LoadingOverlay visible={loading} overlayBlur={2} />
				<div>
					<Table verticalSpacing="sm" horizontalSpacing="md" highlightOnHover>
						<thead
							style={{
								position: "sticky",
								top: 0,
								backgroundColor:
									theme.colorScheme == "light"
										? theme.colors.gray[0]
										: theme.colors.dark[6],
								zIndex: 2,
							}}
						>
							<tr>
								<th style={{ width: 40 }}>
									<Checkbox
										onChange={toggleAll}
										checked={selection.length === data.length}
										indeterminate={
											selection.length > 0 && selection.length !== data.length
										}
										transitionDuration={0}
									/>
								</th>
								{headers.map((header, i) => (
									<Th
										sorted={isSorted(header.value)}
										sort={header.sort}
										reversed={isDesc(header.value)}
										onSort={() => setSorting(header.value)}
										key={i}
									>
										{header.title}
									</Th>
								))}
							</tr>
						</thead>
						<tbody>{rows}</tbody>
					</Table>
				</div>
			</ScrollArea>
			<TablePagination
				page={props.page}
				perPage={props.perPage}
				total={props.total}
			/>
		</>
	);
};
DataTable.defaultProps = {
	loading: false,
};
export default memo(DataTable);
