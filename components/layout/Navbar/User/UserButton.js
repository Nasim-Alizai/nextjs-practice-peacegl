import {
	UnstyledButton,
	Group,
	Avatar,
	Text,
	createStyles,
	Menu,
	useMantineTheme,
} from "@mantine/core";
import { IconChevronRight } from "@tabler/icons";
import UserActionMenu from "./UserActionMenu";
import { useViewportSize } from "@mantine/hooks";

const useStyles = createStyles((theme) => ({
	user: {
		display: "block",
		width: "100%",
		padding: theme.spacing.md,
		color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,

		"&:hover": {
			backgroundColor:
				theme.colorScheme === "dark"
					? theme.colors.dark[8]
					: theme.colors.gray[0],
		},
	},
}));

export function UserButton({ image, name, email, icon, ...others }) {
	const { classes } = useStyles();
	const theme = useMantineTheme();
	const { width } = useViewportSize();

	return (
		<Menu
			withArrow
			position={width < theme.breakpoints.sm ? "top-end" : "right-end"}
			width={200}
		>
			<Menu.Target>
				<UnstyledButton className={classes.user} {...others}>
					<Group>
						<Avatar src={image} radius="xl" alt={name} />
						<div style={{ flex: 1 }}>
							<Text size="sm" weight={500}>
								{name}
							</Text>
							<Text color="dimmed" size="xs">
								{email}
							</Text>
						</div>
						{icon || <IconChevronRight size={14} stroke={1.5} />}
					</Group>
				</UnstyledButton>
			</Menu.Target>
			<UserActionMenu />
		</Menu>
	);
}
