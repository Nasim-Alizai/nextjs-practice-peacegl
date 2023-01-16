import { useState } from "react";
import {
	Group,
	Box,
	Collapse,
	ThemeIcon,
	Text,
	UnstyledButton,
	createStyles,
} from "@mantine/core";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons";
import { useRouter } from "next/router";

const useStyles = createStyles((theme) => ({
	control: {
		padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
		color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
		fontSize: theme.fontSizes.sm,
		"&:hover": {
			backgroundColor:
				theme.colorScheme === "dark"
					? theme.colors.dark[5]
					: theme.colors.gray[0],
			color: theme.colorScheme === "dark" ? theme.white : theme.black,
		},
	},

	link: {
		textDecoration: "none",
		padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
		paddingLeft: 30,
		marginLeft: 30,
		fontSize: theme.fontSizes.sm,
		color:
			theme.colorScheme === "dark"
				? theme.colors.dark[0]
				: theme.colors.gray[7],
		borderLeft: `1px solid ${
			theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
		}`,

		"&:hover": {
			backgroundColor:
				theme.colorScheme === "dark"
					? theme.colors.dark[5]
					: theme.colors.gray[0],
			color: theme.colorScheme === "dark" ? theme.white : theme.black,
		},
	},

	active: {
		backgroundColor:
			theme.colorScheme === "dark"
				? theme.colors.dark[4]
				: theme.colors.gray[1],
		color: theme.colorScheme === "dark" ? theme.white : theme.black,
	},

	chevron: {
		transition: "transform 200ms ease",
	},
}));

export function LinksGroup({
	icon: Icon,
	label,
	initiallyOpened,
	links,
	activeLink,
	setActive,
	link,
}) {
	const router = useRouter();
	const { classes, theme, cx } = useStyles();
	const hasLinks = Array.isArray(links);
	const [opened, setOpened] = useState(initiallyOpened || false);
	const ChevronIcon = theme.dir === "ltr" ? IconChevronRight : IconChevronLeft;
	const items = (hasLinks ? links : []).map((link) => (
		<Text
			component="a"
			className={cx(
				classes.link,
				activeLink == link.label ? classes.active : "",
				" font-medium block"
			)}
			href={link.link}
			key={link.label}
			onClick={(event) => {
				event.preventDefault();
				setActive(link.label);
				router.push(link?.link);
			}}
		>
			{link.label}
		</Text>
	));

	return (
		<>
			<UnstyledButton
				onClick={() => {
					setOpened((o) => !o);
					setActive(label);
					!hasLinks ? router.push(link) : null;
				}}
				className={cx(
					classes.control,
					activeLink == label ? classes.active : "",
					"font-medium block w-full"
				)}
			>
				<Group position="apart" spacing={0}>
					<Box sx={{ display: "flex", alignItems: "center" }}>
						<ThemeIcon variant="light" size={30}>
							<Icon size={18} />
						</ThemeIcon>
						<Box ml="md">{label}</Box>
					</Box>
					{hasLinks && (
						<ChevronIcon
							className={classes.chevron}
							size={14}
							stroke={1.5}
							style={{
								transform: opened
									? `rotate(${theme.dir === "rtl" ? -90 : 90}deg)`
									: "none",
							}}
						/>
					)}
				</Group>
			</UnstyledButton>
			{hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}
		</>
	);
}
