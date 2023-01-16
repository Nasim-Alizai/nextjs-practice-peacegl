import { useSelector, useDispatch } from "react-redux";
import { Button, useMantineTheme } from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons";
import { useAlert } from "../../Helpers/hooks/alert";
import { useSession, signIn, signOut } from "next-auth/react";
import { useToaster } from "../../Helpers/hooks/toaster";
const Home = (props) => {
	const counter = useSelector((state) => state.count);
	const dispatch = useDispatch();
	const asdf = useSession();
	return (
		<div>
			<Button
				onClick={() => {
					// signIn();
					useToaster(
						"hahah kjhkj kjhkj kjhkjkj kjhkjfd kjjhdsfk askhkjh ",
						"green",
						IconAlertCircle,
					);
				}}
				variant='gradient'
				gradient={{ from: "indigo", to: "cyan" }}>
				{"increment"}
			</Button>
			<Button
				onClick={() => {
					useAlert(
						"Are you sure you want to delete 45 items?",
						"This action is not reversable.",
						"Confirm",
						"Cancel",
						() => {
							console.log("Confirm");
						},
						() => {
							console.log("cancel");
						},
						"red",
						IconAlertCircle,
					);
				}}
				variant='gradient'
				gradient={{ from: "indigo", to: "cyan" }}>
				{"alert"}
			</Button>
			<h3>The count is {counter}</h3>
		</div>
	);
};

Home.layout = "default";
import { getSession } from "next-auth/react";
export async function getServerSideProps(context) {
	const session = await getSession({ req: context.req });
	if (!session) {
		let callback = encodeURIComponent(
			process.env.APP_URL + context.resolvedUrl,
		);
		return {
			redirect: {
				destination: `/auth/signin?callbackUrl=${callback}`,
				permanent: false,
			},
		};
	}
	return { props: { session } };
}
export default Home;
