import { createStyles } from "@mantine/core";
import React from "react";
const useStyles = createStyles((theme) => ({
	pageBody: {
		background:
			theme.colorScheme == "dark" ? theme.colors.dark[7] : theme.colors.gray[1],
		borderRadius: theme.fn.radius(),
	},
}));
const PageBody = ({ children }) => {
	const { classes, cx } = useStyles();
	return (
		<div className="p-5 pt-0">
			<div className={classes.pageBody}>{children}</div>
		</div>
	);
};

export default PageBody;
