import { Button, Modal, Text, Title, useMantineTheme } from "@mantine/core";
import { IconAlertCircle, IconChecks, IconX } from "@tabler/icons";
import { useDispatch, useSelector } from "react-redux";

const Alert = () => {
	const alert = useSelector((state) => state.alert);
	const dispatch = useDispatch();
	const theme = useMantineTheme();
	return (
		<Modal
			centered
			closeOnClickOutside={false}
			closeOnEscape={false}
			withCloseButton={false}
			opened={alert.show}
			onClose={() => dispatch({ type: "alert/closeAlert" })}
			transition="scale"
			transitionDuration={300}
			transitionTimingFunction="ease"
		>
			<div className=" min-h-fit flex flex-col justify-between">
				<div
					className="flex justify-center p-6 -m-5 rounded-t-lg"
					style={{
						backgroundColor: theme.fn.rgba(
							theme.colors[alert.color ? alert.color : "red"][3],
							0.1
						),
					}}
				>
					{alert.icon ? (
						<alert.icon
							size={100}
							color={theme.colors[alert.color ? alert.color : "red"][6]}
						/>
					) : (
						<IconAlertCircle
							size={100}
							color={theme.colors[alert.color ? alert.color : "red"][6]}
						/>
					)}
				</div>
				<div className="">
					<div className="text-center mt-10">
						<Title order={4}>{alert?.title}</Title>
						<Text>{alert?.subtitle}</Text>
					</div>
					<div className="flex justify-center mt-4">
						<Button
							leftIcon={<IconX size={20} stroke={3} />}
							variant="gradient"
							className="mx-1"
							gradient={{
								from: theme.colors.red[9],
								to: theme.colors.red[5],
							}}
							onClick={async () => {
								await alert?.onCancel();
								dispatch({ type: "alert/closeAlert" });
							}}
						>
							{alert?.cancelText}
						</Button>
						<Button
							leftIcon={<IconChecks size={20} stroke={3} />}
							className="mx-1"
							variant="gradient"
							data-autofocus
							onClick={async () => {
								await alert?.onConfirm();
								dispatch({ type: "alert/closeAlert" });
							}}
						>
							{alert?.confirmText}
						</Button>
					</div>
				</div>
			</div>
		</Modal>
	);
};

export default Alert;
