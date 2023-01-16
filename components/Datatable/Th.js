import { Center, Group, Text, UnstyledButton } from "@mantine/core";
import { IconChevronUp, IconChevronDown, IconSelector } from "@tabler/icons";

export default function Th({ children, reversed, sorted, onSort, sort }) {
	const Icon = sorted
		? reversed
			? IconChevronUp
			: IconChevronDown
		: IconSelector;
	return (
		<th className={"p-0"}>
			{sort == false ? (
				<UnstyledButton className={"w-full "}>
					<Group position="apart">
						<Text weight={600} size="sm" className="whitespace-nowrap">
							{children}
						</Text>
					</Group>
				</UnstyledButton>
			) : (
				<UnstyledButton onClick={onSort} className={"w-full"}>
					<Group position="apart" noWrap>
						<Text weight={600} size="sm" className="whitespace-nowrap">
							{children}
						</Text>
						<Center className={""}>
							<Icon size={14} stroke={1.5} />
						</Center>
					</Group>
				</UnstyledButton>
			)}
		</th>
	);
}
