"use client";

import Link from "next/link";
import { Menu, rem, Center, Box, NavLink } from "@mantine/core";
import {
  IconCalendarEvent,
  IconChartArcs,
  IconChartArrowsVertical,
  IconChevronDown,
  IconClipboardData,
  IconFileFilled,
  IconForms,
  IconNotes,
  IconRosetteDiscountCheckFilled,
  IconUserFilled,
} from "@tabler/icons-react";
import classes from "../Header.module.css";

const links = [
  {
    label: "Scouting",
    links: [
      {
        link: "/stand-form",
        label: "Stand Form",
        icon: <IconForms style={{ width: rem(16), height: rem(16) }} />,
        perm: "member",
      },
      {
        link: "/pit-form",
        label: "Pit Form",
        icon: <IconForms style={{ width: rem(16), height: rem(16) }} />,
        perm: "member",
      },
      {
        link: "/qualitative-form",
        label: "Qualitative Form",
        icon: <IconNotes style={{ width: rem(16), height: rem(16) }} />,
        perm: "member",
      },
      {
        link: "https://docs.google.com/spreadsheets/d/1o3Zq0R6JktLXxcCSOGEzkoghX8Ohov_7OLkTfa1uthg/edit?usp=sharing",
        label: "Schedule",
        icon: <IconCalendarEvent style={{ width: rem(16), height: rem(16) }} />,
        perm: "member",
      },
    ],
  },
  {
    label: "Records",
    links: [
      {
        link: "/records/stand-forms",
        label: "Stand Forms",
        icon: <IconFileFilled style={{ width: rem(16), height: rem(16) }} />,
        perm: "member",
      },
      {
        link: "/records/pit-forms",
        label: "Pit Forms",
        icon: <IconFileFilled style={{ width: rem(16), height: rem(16) }} />,
        perm: "member",
      },
      {
        link: "/records/users",
        label: "Users",
        icon: <IconUserFilled style={{ width: rem(16), height: rem(16) }} />,
        perm: "admin",
      },
      {
        link: "/records/verify",
        label: "Verify",
        icon: (
          <IconRosetteDiscountCheckFilled
            style={{ width: rem(16), height: rem(16) }}
          />
        ),
        perm: "lead",
      },
    ],
  },
  {
    label: "Analysis",
    links: [
      {
        link: "/data",
        label: "Team Data",
        icon: <IconClipboardData style={{ width: rem(16), height: rem(16) }} />,
        perm: "member",
      },
      {
        link: "/matches",
        label: "Matches",
        icon: (
          <IconChartArrowsVertical
            style={{ width: rem(16), height: rem(16) }}
          />
        ),
        perm: "member",
      },
      {
        link: "/simulation",
        label: "Simulation",
        icon: <IconChartArcs style={{ width: rem(16), height: rem(16) }} />,
        perm: "member",
      },
    ],
  },
];

export default function NavLinks() {
  // const [isHovering, setIsHovering] = useState(false);

  const items = links.map((link) => {
    const menuItems = link.links?.map((item) => (
      <Menu.Item
        key={item.link}
        component={Link}
        leftSection={item.icon}
        href={item.link}
      >
        {item.label}
      </Menu.Item>
    ));

    return (
      <Menu
        key={link.label}
        trigger="hover"
        transitionProps={{ exitDuration: 0 }}
        withinPortal
      >
        <Menu.Target>
          <Box
            className={classes.link}
            // onMouseEnter={() => setIsHovering(true)}
            // onMouseLeave={() => setIsHovering(false)}
          >
            <Center>
              <span className={classes.linkLabel}>{link.label}</span>
              {/* {isHovering ? <IconChevronUp size="0.9rem" stroke={1.5} /> : <IconChevronDown size="0.9rem" stroke={1.5} /> } */}
              <IconChevronDown size="0.9rem" stroke={1.5} />
            </Center>
          </Box>
        </Menu.Target>
        <Menu.Dropdown>{menuItems}</Menu.Dropdown>
      </Menu>
    );
  });

  return items;
}

export function MobileNavLinks(close: () => void) {
  const items = links.map((link) => {
    const menuItems = link.links?.map((item) => (
      <NavLink
        key={item.link}
        component={Link}
        href={item.link}
        label={item.label}
				leftSection={item.icon}
				onClick={close}
      />
    ));

    return (
      <NavLink key={link.label} label={link.label} childrenOffset={28}>
        {menuItems}
      </NavLink>
    );
  });

  return items;
}
