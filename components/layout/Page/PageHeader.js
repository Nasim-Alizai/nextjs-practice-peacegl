import Head from "next/head";
import { Paper, ActionIcon, createStyles } from "@mantine/core";
import { IconDotsVertical } from "@tabler/icons";
import PageHeaderTitle from "./pageHeaderTitle";
import {
	MouseParallaxContainer,
	MouseParallaxChild,
} from "react-parallax-mouse";
import { memo } from "react";

const useStyles = createStyles((theme) => ({
	pageHeader: {
		background:
			theme.colorScheme == "dark" ? theme.colors.dark[7] : theme.colors.gray[1],
		borderRadius: theme.fn.radius(),
	},
}));

const PageHeader = (props) => {
	const { classes, cx } = useStyles();
	return (
		<>
			<Head>
				<title>Peacegl - {props.title}</title>
			</Head>

			<MouseParallaxContainer
				useWindowMouseEvents
				className='parallax'
				containerStyles={{
					margin: "1.25rem",
					borderRadius: "8px",
				}}>
				<MouseParallaxChild
					factorX={0.03}
					factorY={0.02}
					updateStyles={{
						background: "url(/assets/images/Header-PNG-Image.png)",
						backgroundPositionY: "50%",
						backgroundPositionX: "90%",
						transform: "scale(1.3)",
						position: "absolute",
						filter: "brightness(150%)",
						backgroundSize: "contain",
						width: "100%",
						height: "95%",
						backfaceVisibility: "hidden",
						backgroundRepeat: "no-repeat",
						bottom: "-10px",
					}}
				/>
				<Paper shadow='sm' p='md' className={cx(classes.pageHeader)}>
					<div className='flex items-center justify-between relative'>
						<PageHeaderTitle
							icon={props.icon}
							breadcrumb={props.breadcrumb}
							title={props.title}></PageHeaderTitle>
						<ActionIcon size='lg' className='self-start'>
							<IconDotsVertical size={22} />
						</ActionIcon>
					</div>
				</Paper>
			</MouseParallaxContainer>
		</>
	);
};

export default memo(PageHeader);
