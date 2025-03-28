"use client";

import { Blockquote, Container, useMantineTheme, Group } from "@mantine/core";
import {
  IconMoodConfuzed,
  IconMoodHappy,
  IconMoodWrrr,
  IconPencil,
  IconPercentage0,
  IconWifiOff,
} from "@tabler/icons-react";
import { Note } from "../../lib/definitions";

interface NotesProps {
  notes: Note[];
}

export default function Notes({ notes }: NotesProps) {
  const theme = useMantineTheme();

  if (!Array.isArray(notes)) return <>notes not an array error...sowwy</>;

  const items = notes.map((note, index) => {
    let icon = <IconPencil />;
    let color = theme.colors.pillow[1];
    switch(note.status) {
      case 0:
        icon = <IconPercentage0 />;
        color = theme.colors.dark[0];
        break;
      case 1:
        icon = <IconMoodConfuzed />;
        color = theme.colors.rose[5];
        break;
      case 2:
        icon = <IconMoodWrrr />;
        color = theme.colors.sunflower[5];
        break;
      case 3:
        icon = <IconWifiOff />;
        color = theme.colors.cornflower[7];
        break;
      case 4:
        icon = <IconMoodHappy />;
        color = theme.colors.amethyst[3];
        break;
      case 5:
        icon = <IconMoodHappy />;
        color = theme.colors.electric[6];
        break;
    }

    return (
      <Blockquote
        key={index}
        cite={"- " + note.user}
        color={color}
        icon={icon}
        mt="xl"
      >
        {note.note}
      </Blockquote>
    );
  });

  return (
    <Container>
      <Group>{items}</Group>
    </Container>
  );
}
