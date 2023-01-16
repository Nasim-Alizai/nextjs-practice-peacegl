import { useState } from "react";
import { AppShell, Footer, Anchor, Text, useMantineTheme } from "@mantine/core";
import { AppNavbar } from "../layout/Navbar/Navbar";
import AppHeader from "../layout/Header";
import Alert from "../utils/alert/Alert";
import Toaster from "../utils/toaster/Toaster";
export default function AppShellDemo({ children }) {
	const theme = useMantineTheme();
	const [opened, setOpened] = useState(false);
	return (
		<>
			<AppShell
				styles={{
					main: {
						background:
							theme.colorScheme === "dark"
								? theme.colors.dark[8]
								: theme.colors.gray[0],
					},
				}}
				padding='0'
				navbarOffsetBreakpoint='sm'
				asideOffsetBreakpoint='sm'
				header={<AppHeader opened={opened} setOpened={setOpened} />}
				navbar={<AppNavbar hidden={!opened} />}
				footer={<Footer height={40} p='xs'></Footer>}>
				<div className='w-full'>{children}</div>
				<Alert />
				<Toaster />
			</AppShell>
		</>
	);
}
