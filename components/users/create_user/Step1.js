import { Radio, TextInput } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import {
	IconId,
	IconCalendar,
	IconUsers,
	IconPhone,
	IconBrandWhatsapp,
} from "@tabler/icons";
import InputMask from "react-input-mask/lib/react-input-mask.development";
const Step1 = ({ form }) => {
	return (
		<div>
			<div className="flex flex-col md:flex-row ">
				<div className="w-full px-3 my-4">
					<TextInput
						label="First name"
						required
						icon={<IconId />}
						variant="filled"
						placeholder="First name"
						size={"md"}
						className="mt-1"
						{...form.getInputProps("firstname")}
						onBlur={() => form.validateField("firstname")}
					/>
				</div>
				<div className="w-full px-3 my-4">
					<TextInput
						label="Last name"
						required
						icon={<IconId />}
						variant="filled"
						placeholder="Last name"
						size={"md"}
						className="mt-1"
						{...form.getInputProps("lastname")}
						onBlur={() => form.validateField("lastname")}
					/>
				</div>
			</div>
			<div className="flex flex-col md:flex-row">
				<div className="w-full px-3 my-4">
					<DatePicker
						label="Birth Date"
						required
						icon={<IconCalendar />}
						variant="filled"
						placeholder="Birth Date"
						size={"md"}
						className="mt-1"
						dropdownPosition={"flip"}
						{...form.getInputProps("birth_date")}
						onBlur={() => form.validateField("birth_date")}
					/>
				</div>
				<div className="w-full px-3 my-4">
					<TextInput
						label="Job Title"
						required
						icon={<IconUsers />}
						variant="filled"
						placeholder="Job Title"
						size={"md"}
						className="mt-1"
						{...form.getInputProps("job_title")}
						onBlur={() => form.validateField("job_title")}
					/>
				</div>
			</div>
			<div className="flex flex-col md:flex-row">
				<div className="w-full px-3 my-4">
					<TextInput
						label="Phone"
						required
						icon={<IconPhone />}
						variant="filled"
						placeholder="Phone"
						size={"md"}
						className="mt-1"
						{...form.getInputProps("phone")}
						mask="+99 999 999 999"
						component={InputMask}
						onBlur={() => form.validateField("phone")}
					/>
				</div>
				<div className="w-full px-3 my-4">
					<TextInput
						label="Whatsapp"
						required
						icon={<IconBrandWhatsapp />}
						variant="filled"
						placeholder="Whatsapp"
						size={"md"}
						className="mt-1"
						{...form.getInputProps("whatsapp")}
						mask="+99 999 999 999"
						component={InputMask}
						onBlur={() => form.validateField("whatsapp")}
					/>
				</div>
			</div>

			<div className="flex flex-col md:flex-row">
				<div className="w-full px-3 my-4">
					<Radio.Group
						name="favoriteFramework"
						label="Gender"
						required
						className="mt-1"
						size={"md"}
						{...form.getInputProps("gender")}
						onBlur={() => form.validateField("gender")}
					>
						<Radio value="male" label="Male" />
						<Radio value="female" label="Female" />
						<Radio value="none_binary" label="None Binary" />
					</Radio.Group>
				</div>
			</div>
		</div>
	);
};

export default Step1;
