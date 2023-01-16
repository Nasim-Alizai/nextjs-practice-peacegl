import { useTheme } from "@emotion/react";
import {
	Button,
	CloseButton,
	Modal,
	ScrollArea,
	Stepper,
	Title,
} from "@mantine/core";
import { useEffect, useState } from "react";
import {
	IconChevronRight,
	IconChevronLeft,
	IconSend,
	IconRotate,
	IconCheck,
} from "@tabler/icons";
import { useViewportSize } from "@mantine/hooks";
import Done from "./Done";
import Head from "next/head";

const CStepper = ({ show, setShow, steps, form, submit, title , isUpdate }) => {
	const theme = useTheme();
	const [active, setActive] = useState(0);
	const { height, width } = useViewportSize();
	const [isClient, setIsClient] = useState(false);
	const [invalids, setInvalids] = useState([]);
	const [loading, setLoading] = useState(null);

	let stepInside = [
		...steps,
		{
			title: "Done",
			icon: <IconCheck stroke={4} />,
			step: () => <Done />,
		},
	];

	useEffect(() => {
		setIsClient(true);
	});

	const styles = {
		stepperBodyFooter: {
			background:
				theme.colorScheme == "dark"
					? theme.colors.dark[7]
					: theme.colors.gray[0],
			borderTop: `1px solid ${
				theme.colorScheme == "dark"
					? theme.colors.gray[8]
					: theme.colors.gray[4]
			}`,
		},
		stepperBody: {
			background:
				theme.colorScheme == "dark"
					? theme.colors.dark[7]
					: theme.colors.gray[0],
		},
	};
	const next = async () => {
		setLoading(active);
		if (active < stepInside.length - 1) {
			let res = await stepInside[active].validate();
			if (res) {
				setInvalids(invalids.filter((item) => item != active));
				setActive(active + 1);
				form.clearErrors();
			} else {
				if (!invalids.includes(active)) {
					setInvalids([...invalids, active]);
				}
			}
		}
		setLoading(null);
	};
	const prev = () => {
		if (active > 0) {
			setActive(active - 1);
		}
	};
	const restart = () => {
		setActive(0);
		form.reset();
	};
	const changeStep = async (index) => {
		if (active !== stepInside.length - 1) {
			let res = true;
			for (let i = 0; i < index; i++) {
				let stepRes = await stepInside[i].validate();
				if (stepRes) {
					setInvalids(invalids.filter((item) => item != i));
				} else {
					if (!invalids.includes(i)) {
						setInvalids([...invalids, i]);
					}
				}
				res = res && stepRes;
			}
			if (res && index !== stepInside.length - 1) {
				setActive(index);
			}
		}
	};

	const submitInside = async () => {
		if (active < stepInside.length - 1) {
			let res = await stepInside[active].validate();
			if (res) {
				setInvalids(invalids.filter((item) => item != active));
				setLoading(active);
				form.validate();
				if (form.isValid()) {
					let res = await submit();
					if (res) {
						setInvalids(invalids.filter((item) => item != active));
						setActive((active) => active + 1);
					} else {
						setInvalids([...invalids, active]);
					}
				}
				form.clearErrors();
			} else {
				if (!invalids.includes(active)) {
					setInvalids([...invalids, active]);
				}
			}
		}
		setLoading(null);
	};
	const onClose = () => {
		setShow(false);
		form.reset();
		form.clearErrors();
		setActive(0);
		setInvalids([]);
	};
	return isClient ? (
		<>
			<Modal
				opened={show}
				onClose={onClose}
				centered
				size={1000}
				className="custom-modal"
				withCloseButton={false}
				overlayOpacity={0.5}
				overlayBlur={3}
				transition="pop"
				lockScroll={true}
				closeOnClickOutside={false}
			>
				<div
					style={{ maxHeight: 700, minHeight: 700 }}
					className="flex flex-col md:flex-row rounded-3xl overflow-hidden"
				>
					<div
						className={`stpper-sidebar w-full md:w-72  flex items-center px-5 py-5 justify-center md:justify-start ${
							theme.colorScheme == "dark" ? "dark" : ""
						}`}
					>
						<Stepper
							active={active}
							onStepClick={changeStep}
							orientation={
								width > theme.breakpoints.sm ? "vertical" : "horizontal"
							}
						>
							{stepInside.map((step, i) => (
								<Stepper.Step
									icon={step.icon}
									label={width > theme.breakpoints.sm ? step.title : null}
									key={i}
									props={step.props}
									color={invalids.includes(i) ? "red" : theme.primaryColor}
									loading={loading == i}
								/>
							))}
						</Stepper>
					</div>
					<div className="w-full relative" style={styles.stepperBody}>
						<CloseButton
							className="close-btn"
							aria-label="Close modal"
							onClick={onClose}
						/>
						<div className="content p-5 pb-20">
							<Title order={3} className="mt-4">
								{title ? title : ""}
							</Title>
							<div
								className=" relative"
								style={{ height: width > theme.breakpoints.sm ? 540 : 450 }}
							>
								{stepInside.map((step, i) => (
									<div
										key={i}
										className={`stepper-item ${active == i ? "show" : "hide"} `}
									>
										<ScrollArea
											style={{
												height: width > theme.breakpoints.sm ? 540 : 450,
											}}
										>
											{active == i ? (
												<step.step form={form} props={step.props} />
											) : (
												<></>
											)}
										</ScrollArea>
									</div>
								))}
							</div>
						</div>
						<div
							className="stepper-body-footer flex items-center justify-between p-4  border-t border-gray-100"
							style={styles.stepperBodyFooter}
						>
							<div>
								{active !== 0 && active !== stepInside.length - 1 ? (
									<Button
										className="m-1"
										leftIcon={<IconChevronLeft />}
										variant="gradient"
										onClick={prev}
									>
										Prev
									</Button>
								) : (
									<></>
								)}
							</div>
							<div>
								{active == stepInside.length - 2 ? (
									<Button
										className="m-1 "
										rightIcon={<IconSend />}
										variant="gradient"
										type={"submit"}
										onClick={submitInside}
									>
										{isUpdate ? 'Update' :'Submit'}
									</Button>
								) : active == stepInside.length - 1 ? (
									<Button
										className="m-1 "
										rightIcon={<IconRotate />}
										variant="gradient"
										onClick={restart}
									>
										Restart
									</Button>
								) : (
									<Button
										className="m-1 "
										rightIcon={<IconChevronRight />}
										variant="gradient"
										onClick={next}
									>
										Next
									</Button>
								)}
							</div>
						</div>
					</div>
				</div>
			</Modal>
			<style jsx global>{`
				.custom-modal .mantine-Modal-inner {
					z-index: 10000;
					position: fixed;
				}
				.custom-modal .mantine-Modal-modal {
					padding: 0;
					background: transparent;
				}
				.custom-modal .mantine-Modal-close {
					margin-right: 20px;
					margin-top: 20px;
				}
				.custom-modal .mantine-Stepper-stepBody {
					margin-top: 14px;
				}
				.custom-modal .close-btn {
					position: absolute;
					top: 16px;
					right: 16px;
				}
				.stpper-sidebar {
					background: rgba(200, 200, 200, 0.7);
					backdrop-filter: blur(10px);
					transition: all 0.5s !important;
				}
				.stpper-sidebar.dark {
					background: rgba(0, 0, 0, 0.3);
				}
				.stepper-body-footer {
					position: absolute;
					bottom: 0;
					right: 0;
					left: 0;
				}
				.stepper-item {
					position: absolute;
					top: 0;
					right: 0;
					left: 0;
					bottom: 0;
					transform: rotateX(0);
					opacity: 1;
					transition: all 0.7s;
					z-index: 1;
				}
				.hide {
					transform: rotateX(180deg);
					opacity: 0;
					z-index: 0;
				}
			`}</style>
		</>
	) : (
		<></>
	);
};

export default CStepper;
