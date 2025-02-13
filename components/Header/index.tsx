"use client";

import { Burger, Container, Group, Title, Box, Center, Button } from "@mantine/core";
import classes from "./Header.module.css";
import NavLinks from "./NavLinks";
import { useDisclosure } from "@mantine/hooks";
import Link from "next/link";
import { signOut } from "../../auth";
import { serverSignOut } from "../../lib/actions";

export default function Header() {
  const [opened, { toggle }] = useDisclosure(false);

  const items = NavLinks();

  return (
    <header className={classes.header}>
      <Container size="md">
        <div className={classes.inner}>
          <Link href="/" className={classes.link}>
            <Title order={3}>Zebracorn Scouting</Title>
          </Link>
          <Group gap={5} visibleFrom="sm">
            {items}
            <form
              action={async () => {
                await serverSignOut();
              }}
            >
              <Button
								variant="subtle"
								color="gray"
								radius="md"
								fw="500"
								size="compact-md"
								className={classes.link}
              >
                <Center>
                  <span className={classes.linkLabel}>Sign Out</span>
                </Center>
              </Button>
            </form>
          </Group>
          <Burger opened={opened} onClick={toggle} size="sm" hiddenFrom="sm" />
        </div>
      </Container>
    </header>
  );
}
