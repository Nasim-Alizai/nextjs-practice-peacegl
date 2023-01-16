import { Menu } from "@mantine/core";
import React from "react";
import {
	IconSettings,
	IconSwitchHorizontal,
	IconLogout,
	IconPlayerPause,
	IconTrash,
} from "@tabler/icons";
import { signOut } from "next-auth/react";
import { useAlert } from "../../../../Helpers/hooks/alert";
export default function UserActionMenu() {
	const signOutHandler = () => {
		useAlert(
			"Are you sure you want to Log out?",
			"",
			"Log out",
			"Cancel",
			() => {
				signOut();
			},
			() => {},
			"red",
			IconLogout,
		);
	};
	return (
		<Menu.Dropdown>
			<Menu.Item
				icon={<IconLogout size={14} stroke={1.5} />}
				onClick={() => signOutHandler()}>
				Logout
			</Menu.Item>

			<Menu.Item
				icon={<IconSettings size={14} stroke={1.5} />}
				onClick={() => {}}>
				Settings
			</Menu.Item>

			<Menu.Label>Danger zone</Menu.Label>
			<Menu.Item color='red' icon={<IconTrash size={14} stroke={1.5} />}>
				Delete account
			</Menu.Item>
		</Menu.Dropdown>
	);
}
