import { Anchor, Breadcrumbs, Title, Avatar } from "@mantine/core";
import Link from "next/link";
import { IconUser } from "@tabler/icons";

function PageHeaderTitle(props) {
	const items = props.breadcrumb.map((item, index) => (
		<div className="flex items-center" key={index}>
			<span className="mr-2 flex justify-center items-center">
				<item.icon size={20} />
			</span>
			{item.href == "false" ? (
				<span>{item.title}</span>
			) : (
				<Link href={item.href} passHref>
					<Anchor component="a">{item.title}</Anchor>
				</Link>
			)}
		</div>
	));
	return (
		<div className="flex items-center">
			<Avatar radius={50} size={"xl"} className="mr-3">
				{props.icon ? props.icon : <IconUser />}
			</Avatar>
			<span className="flex flex-col justify-between ">
				<Title order={1} mb="0">
					{props.title}
				</Title>
				<Breadcrumbs separator="→">{items}</Breadcrumbs>
			</span>
		</div>
	);
}
export default PageHeaderTitle;
