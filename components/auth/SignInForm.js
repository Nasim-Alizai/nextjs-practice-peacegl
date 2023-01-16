import {
	FacebookButton,
	GithubButton,
	GoogleButton,
	TwitterButton,
} from "./social_btns/SocialButtons";
import { signIn } from "next-auth/react";
import { useForm } from "@mantine/form";
import { useRouter } from "next/router";
import Link from "next/link";
import {
	TextInput,
	PasswordInput,
	Paper,
	Group,
	Button,
	Divider,
	Anchor,
	Box,
	Alert,
} from "@mantine/core";

import { IconAlertCircle } from "@tabler/icons";
import { useEffect, useState } from "react";
export function SignInForm(props) {
	const router = useRouter();
	const [showError, setShowError] = useState(true);
	useEffect(() => {
		console.log(showError);
	}, [showError]);
	const form = useForm({
		initialValues: {
			email: "",
			name: "",
			password: "",
			terms: true,
		},
		validate: {
			email: (val) => (/^\S+@\S+.\S+$/.test(val) ? null : "Invalid email"),
			password: (val) =>
				val.length <= 3
					? "Password should include at least 4 characters"
					: null,
		},
	});
	const getError = () => {
		switch (router.query.error) {
			case "CredentialsSignin":
				return "Invalid Credentials, Please try again!";
			case "OAuthCreateAccount":
				return "Account doesn't exist, Please try a different account!";
			case "OAuthAccountNotLinked":
				return "Account is not linked, Please try a different account!";
			default:
				return "An Error occured, Please try again!";
		}
	};
	const submitForm = async (values) => {
		await signIn("credentials", {
			email: values.email,
			password: values.password,
			callbackUrl: router.query.callbackUrl ?? process.env.APP_URL + "/home",
		});
	};
	return (
		<Paper radius="md" p="xl" withBorder {...props}>
			<Group align={"center"} position={"center"} mb="md" mt="0">
				<GoogleButton
					radius="xl"
					onClick={() =>
						signIn("google", {
							callbackUrl:
								router.query.callbackUrl ?? process.env.APP_URL + "/home",
						})
					}
				>
					Google
				</GoogleButton>
				<GithubButton
					radius="xl"
					onClick={() =>
						signIn("github", {
							callbackUrl:
								router.query.callbackUrl ?? process.env.APP_URL + "/home",
						})
					}
				>
					Github
				</GithubButton>{" "}
				<FacebookButton
					radius="xl"
					onClick={() =>
						signIn("facebook", {
							callbackUrl:
								router.query.callbackUrl ?? process.env.APP_URL + "/home",
						})
					}
				>
					Facebook
				</FacebookButton>
			</Group>

			<Divider label="Or continue with email" labelPosition="center" my="lg" />

			<form onSubmit={form.onSubmit(submitForm)}>
				{router.query.error && showError ? (
					<Alert
						icon={<IconAlertCircle size={16} />}
						color="red"
						withCloseButton
						variant="outline"
						className="mb-5"
						pr={40}
						onClose={() => setShowError(false)}
					>
						{getError()}
					</Alert>
				) : (
					<></>
				)}
				<TextInput
					required
					label="Email"
					placeholder="hello@mantine.dev"
					value={form.values.email}
					onChange={(event) =>
						form.setFieldValue("email", event.currentTarget.value)
					}
					mb={20}
					error={form.errors.email && "Invalid email"}
				/>
				<PasswordInput
					required
					label="Password"
					placeholder="Your password"
					value={form.values.password}
					mb={20}
					onChange={(event) =>
						form.setFieldValue("password", event.currentTarget.value)
					}
					error={
						form.errors.password &&
						"Password should include at least 6 characters"
					}
				/>
				<Group position="apart" pt="lg">
					<Link href="/auth/forgot-password">
						<Anchor color="dimmed" size="sm">
							<Box ml={5}>Forgot Password?</Box>
						</Anchor>
					</Link>
					<Button type="submit">Login</Button>
				</Group>
			</form>
		</Paper>
	);
}
