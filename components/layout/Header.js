import { Header, Burger, Group, useMantineTheme } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import { useEffect, useState } from "react";
import ToolbarLogo from "./Toolbar/ToolbarLogo";
import ToolbarThemeSwitch from "./Toolbar/ToolbarThemeSwitch";

const AppHeader = ({ opened, setOpened }) => {
	const theme = useMantineTheme();
	const { width, height } = useViewportSize();
	const [isClientSide, setIsClientSide] = useState(false);
	useEffect(() => {
		setIsClientSide(true);
	});
	return isClientSide ? (
		<Header
			className='custom-header'
			height={width > theme.breakpoints.sm ? 70 : 108}
			p='md'>
			{width < theme.breakpoints.sm && (
				<div className='mb-2 flex justify-between'>
					<ToolbarLogo
						height={30}
						color={
							theme.colorScheme == "dark"
								? theme.colors.gray[0]
								: theme.colors.dark[5]
						}
						primary={theme.primaryColor}
					/>
					{width < theme.breakpoints.sm && (
						<Group>
							<ToolbarThemeSwitch />
						</Group>
					)}{" "}
				</div>
			)}
			<div style={{ display: "flex", alignItems: "center" }}>
				{width < theme.breakpoints.sm && (
					<Burger
						opened={true}
						onClick={() => setOpened((o) => !o)}
						size='sm'
						color={theme.colors.gray[6]}
						mr='xl'
					/>
				)}
				{width > theme.breakpoints.sm && (
					<ToolbarLogo
						height={30}
						color={
							theme.colorScheme == "dark"
								? theme.colors.gray[0]
								: theme.colors.dark[5]
						}
						primary={theme.primaryColor}
					/>
				)}
				<Group ml='auto'>
					{width > theme.breakpoints.sm && (
						<>
							<ToolbarThemeSwitch />
						</>
					)}
				</Group>
			</div>
		</Header>
	) : (
		<></>
	);
};
export default AppHeader;
