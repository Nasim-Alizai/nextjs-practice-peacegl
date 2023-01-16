import CStepper from "../../stepper/CStepper";
import { IconInfoCircle, IconLock, IconPhoto } from "@tabler/icons";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import { joiResolver, useForm } from "@mantine/form";
import { schema, updateSchema } from "../../../configs/pages/users";
import UserHelper from "../../../Helpers/UserHelper";
import { memo, useEffect } from "react";

const CreateUserStepper = ({
	show,
	setShow,
	addUser,
	updateUser,
	isUpdate,
	selectedItems,
}) => {
	const userHelper = new UserHelper();

	const submit = async () => {
		if (!isUpdate) {
			let res = await userHelper.create(form.values);
			if (res) {
				addUser(res.user);
				return true;
			} else {
				false;
			}
		} else {
			let res = await userHelper.update({
				...form.values,
				id: selectedItems[0].id,
			});
			if (res) {
				updateUser(res.user);
				return true;
			} else {
				false;
			}
		}
	};
	const exists = async (column, data) => {
		let res = await userHelper.exists(column, data);
		return res.result;
	};

	const form = useForm({
		initialValues: {
			firstname: "",
			lastname: "",
			email: "",
			phone: "",
			whatsapp: "",
			username: "",
			birth_date: "",
			gender: "",
			job_title: "",
			image: null,
			password: "",
			confirm_password: "",
			attachment_id: "",
		},
		validate: joiResolver(schema),
		validateInputOnBlur: true,
	});

	useEffect(() => {
		if (show && isUpdate && selectedItems.length == 1) {
			let item = selectedItems[0];
			form.setValues({
				firstname: item.firstname,
				lastname: item.lastname,
				birth_date: new Date(item.birth_date),
				job_title: item.job_title,
				phone: item.phone,
				whatsapp: item.whatsapp,
				gender: item.gender,
				email: item.email,
				username: item.username,
				image: item.image.path,
				attachment_id: item.image.id.toString(),
				password: "null",
				confirm_password: "null",
			});
		}
	}, [show]);

	const steps = [
		{
			title: "General Info",
			icon: <IconInfoCircle size={22} />,
			step: Step1,
			props: {
				isUpdate,
			},
			async validate() {
				form.validate();
				let res =
					form.isValid("firstname") &&
					form.isValid("lastname") &&
					form.isValid("birth_date") &&
					form.isValid("job_title") &&
					form.isValid("phone") &&
					form.isValid("whatsapp") &&
					form.isValid("gender");
				return res;
			},
		},
		{
			title: "Credentials",
			icon: <IconLock size={22} />,
			step: Step2,
			props: {
				isUpdate,
			},
			async validate() {
				let emailExist = false;
				let usernameExist = false;
				if (!isUpdate) {
					emailExist = await exists("email", form.values.email);
					usernameExist = await exists("username", form.values.username);
					if (emailExist || usernameExist) {
						form.setErrors({
							email: emailExist ? `Email Already Exists` : "",
							username: usernameExist ? `Username Already Exists` : "",
						});
						return false;
					}
				}
				form.validate();
				return !isUpdate
					? !emailExist &&
							!usernameExist &&
							form.isValid("email") &&
							form.isValid("username") &&
							form.isValid("password") &&
							form.isValid("confirm_password")
					: form.isValid("email") && form.isValid("username");
			},
		},
		{
			title: "Image",
			icon: <IconPhoto size={22} />,
			step: Step3,
			props: {
				isUpdate,
			},
			validate() {
				return true;
			},
		},
	];
	return (
		<form>
			<CStepper
				show={show}
				setShow={setShow}
				steps={steps}
				form={form}
				submit={submit}
				title='Create User'
			/>
		</form>
	);
};

export default memo(CreateUserStepper);
