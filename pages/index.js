import { useRouter } from "next/router";
import { useEffect } from "react";
const Home = (props) => {
	const router = useRouter();
	useEffect(() => {
		router.push("/home");
	});
	return <></>;
};

// import { getSession } from "next-auth/react";
// export async function getServerSideProps(context) {
// 	const session = await getSession({ req: context.req });
// 	if (!session) {
// 		return {
// 			redirect: {
// 				destination: "/auth/signin",
// 				permanent: false,
// 			},
// 		};
// 	}
// 	return { props: { session } };
// }
export default Home;
