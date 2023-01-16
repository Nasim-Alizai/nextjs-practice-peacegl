import { useForm } from "@mantine/form";
import {
	TextInput,
	Paper,
	Group,
	Button,
	Anchor,
	Box,
	Center,
} from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons";
import Link from "next/link";

export function ForgotPasswordForm(props) {
	const form = useForm({
		initialValues: {
			email: "",
		},

		validate: {
			email: (val) => (/^\S+@\S+.\S+$/.test(val) ? null : "Invalid email"),
		},
	});

	return (
		<Paper radius="md" p="xl" withBorder {...props}>
			<form onSubmit={form.onSubmit(() => {})}>
				<TextInput
					required
					label="Email"
					placeholder="hello@mantine.dev"
					value={form.values.email}
					onChange={(event) =>
						form.setFieldValue("email", event.currentTarget.value)
					}
					error={form.errors.email && "Invalid email"}
				/>

				<Group position="apart" pt="0">
					<Link href="/auth/signin">
						<Anchor color="dimmed" size="sm">
							<Center inline>
								<IconArrowLeft size={12} stroke={1.5} />
								<Box ml={5}>Back to login page</Box>
							</Center>
						</Anchor>
					</Link>
					<Button>Reset password</Button>
				</Group>
			</form>
		</Paper>
	);
}
