import { Checkbox } from "@mantine/core";
import { memo } from "react";

const Tr = ({ item, headers, useStyles, selected, toggleRow, props }) => {
	const { classes, cx } = useStyles();
	return (
		<tr key={item.id} className={cx({ [classes.rowSelected]: selected })}>
			<td>
				<Checkbox
					checked={selected}
					onChange={() => toggleRow(item)}
					transitionDuration={0}
				/>
			</td>
			{headers.map((header, i) => {
				let Component = props[header.value];
				let values = header.value.split(".");
				return (
					<td key={i}>
						<div className="flex flex-nowrap  whitespace-nowrap">
							{props[header.value] ? (
								<Component item={item} />
							) : values.length == 1 ? (
								item[header.value]
							) : values.length == 2 ? (
								item[values[0]] ? (
									item[values[0]][values[1]]
								) : (
									""
								)
							) : values.length == 3 ? (
								item[values[0]][values[1]][values[2]]
							) : (
								values.length == 4 &&
								item[values[0]][values[1]][values[2]][values[3]]
							)}
						</div>
					</td>
				);
			})}
		</tr>
	);
};

export default memo(Tr);
