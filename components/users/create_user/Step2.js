import { PasswordInput, TextInput } from "@mantine/core";
import { IconAt, IconKey, IconLock } from "@tabler/icons";

const Step2 = ({ form, props }) => {
	return (
		<>
			<div>
				<div className='flex flex-col md:flex-row'>
					<div className='w-full px-3 my-4'>
						<TextInput
							label='Email'
							required
							icon={<IconAt />}
							variant='filled'
							placeholder='Email'
							size={"md"}
							className='mt-1'
							{...form.getInputProps("email")}
							onBlur={() => form.validateField("email")}
						/>
					</div>
					<div className='w-full px-3 my-4'>
						<TextInput
							label='Username'
							required
							icon={<IconKey />}
							variant='filled'
							placeholder='Username'
							size={"md"}
							className='mt-1'
							{...form.getInputProps("username")}
							onBlur={() => form.validateField("username")}
						/>
					</div>
				</div>
				{!props.isUpdate ? (
					<div className='flex flex-col md:flex-row'>
						<div className='w-full px-3 my-4'>
							<PasswordInput
								label='Password'
								required
								icon={<IconLock />}
								variant='filled'
								placeholder='Password'
								size={"md"}
								className='mt-1'
								{...form.getInputProps("password")}
								onBlur={() => form.validateField("password")}
							/>
						</div>
						<div className='w-full px-3 my-4'>
							<PasswordInput
								label='Confirm Password'
								required
								icon={<IconLock />}
								variant='filled'
								placeholder='Confirm Password'
								size={"md"}
								className='mt-1'
								{...form.getInputProps("confirm_password")}
								onBlur={() => form.validateField("confirm_password")}
							/>
						</div>
					</div>
				) : (
					<></>
				)}
			</div>
		</>
	);
};

export default Step2;
