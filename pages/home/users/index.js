import { breadcrumb, headers } from "../../../configs/pages/users";
import {
	ActionIcon,
	Anchor,
	Avatar,
	Group,
	Modal,
	Select,
	Text,
	Tooltip,
} from "@mantine/core";
import {
	IconUser,
	IconGenderMale,
	IconGenderFemale,
	IconGenderBigender,
} from "@tabler/icons";
import { useEffect, useState } from "react";
import { useDebouncedState } from "@mantine/hooks";
import UserHelper from "../../../Helpers/UserHelper";
import DataTable from "../../../components/Datatable/Datatable";
import PageActions from "../../../components/layout/Page/PageActions";
import PageHeader from "../../../components/layout/Page/PageHeader";
import CreateUserStepper from "../../../components/users/create_user/CreateUserStepper";
import PageBody from "../../../components/layout/Page/PageBody";
import { useAlert } from "../../../Helpers/hooks/alert";
import moment from "moment";

const Users = () => {
	let userHelper = new UserHelper();
	const selection = useState([]);
	const sortBy = useState([]);
	const page = useState(1);
	const perPage = useState(10);
	const [selectedItems, setSelectedItems] = selection;
	const [perPageNum] = perPage;
	const [pageNum, setPageNum] = page;
	const [sortByItem] = sortBy;
	const [items, setItems] = useState([]);
	const [total, setTotal] = useState(0);
	const [showCreate, setShowCreate] = useState(false);
	const [search, setSearch] = useDebouncedState("", 500);
	const [loading, setLoading] = useState(false);
	const [isUpdate, setIsUpdate] = useState(false);
	const [showTrash, setShowTrash] = useState(false);
	useEffect(() => {
		getUsers();
	}, [`${sortByItem}`, perPageNum, pageNum, search]);

	const getUsers = async () => {
		await userHelper.fetchItems(
			search,
			perPageNum,
			pageNum,
			sortByItem,
			setItems,
			setTotal,
			setPageNum,
			setLoading
		);
		setSelectedItems([]);
	};

	const onCreate = () => {
		setIsUpdate(false);
		setShowCreate(true);
	};

	const onUpdate = () => {
		setIsUpdate(true);
		setShowCreate(true);
	};

	const onDelete = () => {
		useAlert(
			`Are you sure you want to delete ${selectedItems.length} item(s)?`,
			"",
			"Yes, Delete",
			"Cancel",
			async () => {
				await userHelper.destroy(setItems, selectedItems);
				await userHelper.fetchItems(
					search,
					perPageNum,
					pageNum,
					sortByItem,
					setItems,
					setTotal,
					setPageNum,
					setLoading,
					selectedItems.length
				); // fetch replaced Items
				setSelectedItems([]);
			},
			() => {},
			"red"
		);
	};

	const addUser = (user) => {
		userHelper.addItem(user, items, setItems, setTotal, perPageNum, pageNum);
	};
	const updateUser = (user) => {
		userHelper.updateItem(user, setItems);
	};
	const statusChange = (id, value) => {
		setItems((items) =>
			items.map((item) => {
				if (item.id == id) {
					item.status = value;
				}
				return item;
			})
		);
	};

	return (
		<div>
			<PageHeader
				icon={<IconUser size={50} />}
				breadcrumb={breadcrumb}
				title="Users"
			/>
			<PageBody>
				<Modal
					opened={showTrash}
					onClose={() => setShowTrash(false)}
					title="Introduce yourself!"
				>
					{/* Modal content */}
				</Modal>
				<PageActions
					selectedItems={selectedItems}
					title="Users"
					total={total}
					onCreate={onCreate}
					onUpdate={onUpdate}
					onDelete={onDelete}
					onSearch={(s) => {
						setSearch(s);
					}}
					onTrash={() => {
						setShowTrash(true);
					}}
				/>
				<CreateUserStepper
					isUpdate={isUpdate}
					selectedItems={selectedItems}
					show={showCreate}
					setShow={setShowCreate}
					addUser={addUser}
					updateUser={updateUser}
				/>
				<DataTable
					data={items}
					headers={headers}
					selection={selection}
					sortBy={sortBy}
					page={page}
					perPage={perPage}
					total={total}
					loading={loading}
					firstname={(props) => (
						<Group spacing="sm" noWrap>
							<Avatar size={26} src={props.item.image?.path} radius={26} />
							<Text size="sm" weight={500}>
								{props.item.firstname} {props.item.lastname}
							</Text>
						</Group>
					)}
					email={(props) => (
						<Anchor href={`mailto:${props.item.email}`} target="_blank">
							{props.item.email}
						</Anchor>
					)}
					phone={(props) => (
						<Anchor href={`call:${props.item.phone}`} target="_blank">
							{props.item.phone}
						</Anchor>
					)}
					birth_date={(props) => (
						<div>
							{moment(props.item.birth_date).format("DD MMM YYYY | h:mm")}
						</div>
					)}
					created_at={(props) => (
						<div>
							{moment(props.item.created_at).format("DD MMM YYYY | h:mm")}
						</div>
					)}
					updated_at={(props) => (
						<div>
							{moment(props.item.updated_at).format("DD MMM YYYY | h:mm")}
						</div>
					)}
					gender={(props) => (
						<div className="flex justify-center w-full">
							{props.item.gender == "male" ? (
								<Tooltip label="Male">
									<ActionIcon color="blue" radius="md" variant="filled">
										<IconGenderMale size={20} />
									</ActionIcon>
								</Tooltip>
							) : props.item.gender == "female" ? (
								<Tooltip label="Female">
									<ActionIcon color="pink" radius="md" variant="filled">
										<IconGenderFemale size={20} />
									</ActionIcon>
								</Tooltip>
							) : (
								<Tooltip label="None Binary">
									<ActionIcon color="violet" radius="md" variant="filled">
										<IconGenderBigender size={20} />
									</ActionIcon>
								</Tooltip>
							)}
						</div>
					)}
					status={(props) => (
						<Select
							className="w-24 no-margin"
							size={"xs"}
							value={props.item.status}
							onChange={(value) => {
								statusChange(props.item.id, value);
							}}
							data={[
								{ label: "Active", value: "active" },
								{ label: "Blocked", value: "blocked" },
								{ label: "Removed", value: "removed" },
							]}
						/>
					)}
				/>
			</PageBody>
		</div>
	);
};
Users.layout = "default";
import { getSession } from "next-auth/react";
export async function getServerSideProps(context) {
	const session = await getSession({ req: context.req });
	if (!session) {
		let callback = encodeURIComponent(
			process.env.APP_URL + context.resolvedUrl
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
export default Users;
