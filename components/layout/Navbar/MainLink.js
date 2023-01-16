import { createStyles, Tooltip, UnstyledButton } from "@mantine/core";
import React from "react";

const useStyles = createStyles((theme) => ({
	mainLink: {
		width: 40,
		height: 40,
		borderRadius: theme.fn.radius(),
		color:
			theme.colorScheme === "dark"
				? theme.colors.dark[0]
				: theme.colors.gray[7],
		margin: "5px 0",
		"&:hover": {
			backgroundColor:
				theme.colorScheme === "dark"
					? theme.colors.dark[5]
					: theme.colors.gray[0],
		},
	},

	mainLinkActive: {
		"&, &:hover": {
			backgroundColor: theme.fn.variant({
				variant: "light",
				color: theme.primaryColor,
			}).background,
			color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
				.color,
		},
	},
}));

export default function MainLink(props) {
	const { classes, cx } = useStyles();

	return (
		<Tooltip
			label={props.link.label}
			position="right"
			withArrow
			transitionDuration={0}
			key={props.link.label}
		>
			<UnstyledButton
				aria-label={props.link.label}
				onClick={() => props.onClick(props.link.label)}
				className={cx(
					classes.mainLink,
					{ [classes.mainLinkActive]: props.link.label === props.active.label },
					"flex justify-center items-center"
				)}
			>
				<props.link.icon stroke={1.5} />
			</UnstyledButton>
		</Tooltip>
	);
}
