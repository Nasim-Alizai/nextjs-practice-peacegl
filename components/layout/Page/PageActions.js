import { Button, Input, Menu } from "@mantine/core";
import {
	IconDotsVertical,
	IconEye,
	IconFilter,
	IconDatabaseExport,
	IconTrash,
	IconEdit,
	IconPlus,
	IconDatabaseImport,
	IconSettings,
	IconSearch,
} from "@tabler/icons";

const PageActions = ({
	selectedItems,
	title,
	total,
	onSearch,
	onCreate,
	onUpdate,
	onDelete,
	onTrash,
}) => {
	return (
		<div className="p-5">
			<div className="flex items-center justify-between">
				<div className="font-bold">
					{title} ({total})
				</div>
				<div>
					<Input
						size={"md"}
						onChange={(e) => {
							onSearch ? onSearch(e.target.value.trim()) : () => {};
						}}
						placeholder="Search..."
						icon={<IconSearch size={16} stroke={1.5} />}
					/>
				</div>
			</div>
			<div className="py-2 flex items-center justify-between">
				<Button
					className="px-2 m-1"
					variant="gradient"
					onClick={() => {
						console.log("add refresh function on your page actions");
					}}
				>
					<IconEye />
				</Button>
				<Button
					className="m-1 hidden lg:block"
					leftIcon={<IconFilter />}
					variant="gradient"
				>
					Filter
				</Button>
				<Button className="m-1 px-2 block lg:hidden" variant="gradient">
					<IconFilter />
				</Button>
				{selectedItems.length > 0 ? (
					<>
						{selectedItems.length == 1 ? (
							<>
								<Button
									className="m-1 hidden lg:block"
									leftIcon={<IconEdit />}
									variant="gradient"
									onClick={onUpdate}
								>
									Edit
								</Button>
								<Button
									className="m-1 px-2 block lg:hidden"
									variant="gradient"
									onClick={onUpdate}
								>
									<IconEdit />
								</Button>
							</>
						) : (
							<></>
						)}
						<Button
							className="m-1 hidden lg:block"
							leftIcon={<IconTrash />}
							variant="gradient"
							gradient={{ from: "red", to: "orange" }}
							onClick={onDelete}
						>
							Delete
						</Button>
						<Button
							className="m-1 px-2 block lg:hidden"
							variant="gradient"
							gradient={{ from: "red", to: "orange" }}
							onClick={onDelete}
						>
							<IconTrash />
						</Button>
					</>
				) : (
					<></>
				)}
				<Button
					className="m-1 ml-auto hidden lg:block"
					leftIcon={<IconPlus />}
					variant="gradient"
					onClick={onCreate}
				>
					Create
				</Button>
				<Button
					className="m-1 ml-auto px-2 block lg:hidden"
					variant="gradient"
					onClick={onCreate}
				>
					<IconPlus />
				</Button>
				<Menu shadow="md" width={200} position={"bottom-end"}>
					<Menu.Target>
						<Button className="px-2 m-1" variant={"default"}>
							<IconDotsVertical />
						</Button>
					</Menu.Target>

					<Menu.Dropdown>
						<Menu.Item icon={<IconDatabaseExport size={16} />}>
							Export
						</Menu.Item>
						<Menu.Item icon={<IconDatabaseImport size={16} />}>
							Import
						</Menu.Item>
						<Menu.Item icon={<IconSettings size={16} />}>Settings</Menu.Item>
						<Menu.Item
							color="red"
							onClick={onTrash}
							icon={<IconTrash size={14} />}
						>
							Trash
						</Menu.Item>
					</Menu.Dropdown>
				</Menu>
			</div>
		</div>
	);
};

export default PageActions;
