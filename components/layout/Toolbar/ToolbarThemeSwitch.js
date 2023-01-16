import { useMantineColorScheme, useMantineTheme } from "@mantine/core";
import { IconSun, IconMoonStars } from "@tabler/icons";
import IconBtn from "../../utils/IconBtn";

export default function ToolbarThemeSwitch() {
	const { colorScheme, toggleColorScheme } = useMantineColorScheme();
	const theme = useMantineTheme();

	return (
		<IconBtn ariaLabel="Theme toggler" onClick={() => toggleColorScheme()}>
			{colorScheme === "dark" ? (
				<IconSun color={theme.colors.yellow[4]} size={18} />
			) : (
				<IconMoonStars color={theme.colors.dark[6]} size={18} />
			)}
		</IconBtn>
	);
}
