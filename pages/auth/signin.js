import { Text, Title } from "@mantine/core";
import { SignInForm } from "../../components/auth/SignInForm";
import { getSession } from "next-auth/react";

const signin = () => {
	return (
		<>
			<Title order={2} align="center" mb={0}>
				Welcome back!
			</Title>
			<Text color="dimmed" align="center" size="sm" mb={16}>
				Login with{" "}
			</Text>
			<SignInForm />
		</>
	);
};
signin.layout = "auth";
// export async function getServerSideProps(context) {
// 	const session = await getSession({ req: context.req });
// 	if (session) {
// 		return {
// 			redirect: {
// 				destination: "/",
// 				permanent: false,
// 			},
// 		};
// 	}
// 	return { props: { session } };
// }

export default signin;
