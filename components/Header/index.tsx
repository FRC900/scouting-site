import { Paper, Title } from "@mantine/core";
import NavLinks from "./NavLinks";
import styles from './Header.module.css'

export default function Header() {
	return (
		<Paper className={styles.header}>x``
			{/* <Image
					src="/Logo-Slate.png"
					width={32}
					height={32}
					alt="Zebracorns Logo"
					unoptimized
				/> */} 
			<Title order={3}>Zebracorn Scouting</Title>
			<NavLinks />
		</Paper>
	);
}
