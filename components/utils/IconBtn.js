import { ActionIcon } from "@mantine/core";
import React from "react";

export default function IconBtn({ children, onClick, ariaLabel }) {
	return (
		<ActionIcon
			onClick={onClick}
			size="lg"
			sx={(theme) => ({
				backgroundColor:
					theme.colorScheme === "dark"
						? theme.colors.dark[6]
						: theme.colors.gray[0],
				color:
					theme.colorScheme === "dark"
						? theme.colors.gray[4]
						: theme.colors.dark[6],
			})}
			aria-label={ariaLabel}
		>
			{children}
		</ActionIcon>
	);
}
