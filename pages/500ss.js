import {
	createStyles,
	Container,
	Title,
	Text,
	Button,
	SimpleGrid,
} from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";
import Error500 from "../components/svgs/500";

const useStyles = createStyles((theme) => ({
	root: {
		paddingTop: 80,
		paddingBottom: 80,
	},

	title: {
		fontWeight: 900,
		fontSize: 34,
		marginBottom: theme.spacing.md,
		fontFamily: `Greycliff CF, ${theme.fontFamily}`,

		[theme.fn.smallerThan("sm")]: {
			fontSize: 32,
		},
	},

	control: {
		[theme.fn.smallerThan("sm")]: {
			width: "100%",
		},
	},

	mobileImage: {
		[theme.fn.largerThan("sm")]: {
			display: "none",
		},
	},

	desktopImage: {
		[theme.fn.smallerThan("sm")]: {
			display: "none",
		},
	},
}));

export default function Page500(props) {
	const { classes } = useStyles();

	return (
		<Container className={(classes.root, "h-screen flex align-center")}>
			<SimpleGrid
				spacing={80}
				cols={2}
				breakpoints={[{ maxWidth: "sm", cols: 1, spacing: 40 }]}
				className="items-center"
			>
				<Error500 className={classes.mobileImage} />
				<div>
					<Title className={classes.title}>
						Something bad just happened...
					</Title>
					<Text color="dimmed" size="lg">
						Our servers could not handle your request. Don't worry, our
						development team was already notified. Try refreshing the page.
					</Text>
					<Button
						variant="outline"
						size="md"
						mt="xl"
						className={classes.control}
					>
						Refresh the page
					</Button>
				</div>
				{props.children}
				<Error500 className={classes.desktopImage} />
			</SimpleGrid>
		</Container>
	);
}
