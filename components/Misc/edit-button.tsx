import { ActionIcon, Group, rem } from "@mantine/core";
import { IconPencil } from "@tabler/icons-react";
import Link from "next/link";

interface Props {
	id: string;
	form: "stand-forms" | "pit-forms";
}

export function EditButton({ id, form }: Props) {
	return (
		<Link href={`/records/${form}/${id}/edit`}>
			<Group justify="center">
				<ActionIcon variant="subtle" color="gray">
					<IconPencil
						style={{ width: rem(16), height: rem(16) }}
						stroke={1.5}
					/>
				</ActionIcon>
			</Group>
		</Link>
	);
}
