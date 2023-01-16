import { IconGauge, IconHome2, IconUser, IconLock } from "@tabler/icons";
const MenuItems = [
	{
		icon: IconHome2,
		label: "Home",
		route: "/home",
		items: [
			{ label: "Dashboard", icon: IconGauge, link: "/home" },
			{ label: "Users", icon: IconUser, link: "/home/users" },
		],
	},
];
export default MenuItems;
