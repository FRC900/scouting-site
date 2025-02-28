"use client";

import {
  Burger,
  Container,
  Group,
  Title,
  Box,
  Center,
  Button,
  Drawer,
} from "@mantine/core";
import classes from "./Header.module.css";
import NavLinks, { MobileNavLinks } from "./NavLinks";
import { useDisclosure } from "@mantine/hooks";
import Link from "next/link";
import { serverSignOut } from "../../lib/actions";

export default function Header() {
  const [opened, { close, toggle }] = useDisclosure(false);

  const items = NavLinks();
  const mobileItems = MobileNavLinks(close);

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
                type="submit"
              >
                <Center>
                  <span className={classes.linkLabel}>Sign Out</span>
                </Center>
              </Button>
            </form>
          </Group>
          <Drawer
            offset={8}
            radius="md"
            opened={opened}
            onClose={close}
            title="Navigation"
            position="left"
            size="xs"
          >
            {mobileItems}
          </Drawer>
          <Burger opened={opened} onClick={toggle} size="sm" hiddenFrom="sm" />
        </div>
      </Container>
    </header>
  );
}
