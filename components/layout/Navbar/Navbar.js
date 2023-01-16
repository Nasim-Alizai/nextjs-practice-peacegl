import {
	Navbar,
	createStyles,
	ScrollArea,
	useMantineTheme,
} from "@mantine/core";

import { UserButton } from "./User/UserButton";
import { LinksGroup } from "./NavbarLinksGroup";
import { useEffect, useState } from "react";
import { useViewportSize } from "@mantine/hooks";
import MainLink from "./MainLink";
import MenuItems from "../../../configs/menu";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

const useStyles = createStyles((theme) => ({
	aside: {
		flex: "0 0 60px",
		backgroundColor:
			theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
		borderRight: `1px solid ${
			theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[3]
		}`,
	},

	main: {
		flex: 1,
		backgroundColor:
			theme.colorScheme === "dark"
				? theme.colors.dark[7]
				: theme.colors.gray[0],
		paddingTop: "16px",
	},

	navbar: {
		backgroundColor:
			theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.white,
	},

	footer: {
		borderTop: `1px solid ${
			theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
		}`,
	},
}));

export function AppNavbar(props) {
	const { data } = useSession();
	const router = useRouter();
	const { classes, cx } = useStyles();
	const theme = useMantineTheme();
	const { width } = useViewportSize();
	const [active, setActive] = useState(
		MenuItems.filter((item) => !router.route.search(item.route))[0] ??
			MenuItems[0]
	);
	const [activeLink, setActiveLink] = useState(
		active?.items?.filter((item) => item.link == router.route)[0]?.label
	);
	const [isClientSide, setIsClientSide] = useState(false);
	useEffect(() => {
		setIsClientSide(true);
	});

	const mainLinks = MenuItems.map((link, i) => (
		<MainLink
			active={active}
			link={link}
			onClick={() => setActive(link)}
			key={i}
		/>
	));

	const links = active.items?.map((item) => (
		<LinksGroup
			activeLink={activeLink}
			{...item}
			key={item.label}
			link={item.link}
			setActive={setActiveLink}
		/>
	));

	return isClientSide ? (
		<Navbar
			fixed
			hiddenBreakpoint="sm"
			hidden={props.hidden}
			width={{ sm: 300 }}
			className={cx(classes.navbar, "pb-0")}
		>
			<Navbar.Section grow className={`flex`}>
				<div className={cx(classes.aside, "flex flex-col items-center pt-4")}>
					{mainLinks}
				</div>
				<div className={classes.main}>
					<ScrollArea
						style={{
							height: `calc(100vh - ${
								width > theme.breakpoints.sm ? 216 : 236
							}px)`,
						}}
					>
						{links}
					</ScrollArea>
				</div>
			</Navbar.Section>
			<Navbar.Section className={classes.footer}>
				<UserButton
					image={data ? data?.user?.image?.path : ""}
					name={data ? `${data?.user.firstname} ${data?.user.lastname}` : ""}
					email={data ? data?.user.email : ""}
				/>
			</Navbar.Section>
		</Navbar>
	) : (
		<></>
	);
}
