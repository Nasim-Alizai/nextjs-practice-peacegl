import { Text, Title } from "@mantine/core";
import { ForgotPasswordForm } from "../../components/auth/ForgotPasswordForm";
const forgotPassword = () => {
	return (
		<>
			<Title order={3} align="center" mb={0}>
				Forgot your password?
			</Title>
			<Text color="dimmed" align="center" size="sm" mb={16}>
				Enter your email to get a reset link
			</Text>
			<ForgotPasswordForm />
		</>
	);
};
forgotPassword.layout = "auth";
export default forgotPassword;
