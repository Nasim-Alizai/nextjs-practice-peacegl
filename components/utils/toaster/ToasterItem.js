import { Avatar, Notification } from "@mantine/core";
import { useDispatch } from "react-redux";
import { IconCheck } from "@tabler/icons";
import { useEffect } from "react";

const ToasterItem = ({ item }) => {
	const dispatch = useDispatch();

	useEffect(() => {
		setTimeout(() => {
			dispatch({ type: "toaster/removeToaster", payload: item.id });
		}, 4000);
	});

	return (
		<Notification
			onClose={() =>
				dispatch({ type: "toaster/removeToaster", payload: item.id })
			}
			color={item.color}
			mb={"sm"}
			className='toasterCustom'>
			<Avatar className='mr-2' color={item.color} radius='xl'>
				{item.icon ? (
					<item.icon size={20} radius='xl' />
				) : (
					<IconCheck size={20} radius='xl' />
				)}
			</Avatar>

			{item.title}
		</Notification>
	);
};

export default ToasterItem;
