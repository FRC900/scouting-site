"use client";

import { Blockquote, Container, useMantineTheme, Group } from "@mantine/core";
import { IconPencil } from "@tabler/icons-react";
import { Note } from "../../lib/definitions";

interface NotesProps {
  notes: Note[];
}

export default function Notes({ notes }: NotesProps) {
  const theme = useMantineTheme()

  if (!Array.isArray(notes)) return <>notes not an array error...sowwy</>;

  const items = notes.map((note, index) => (
    <Blockquote key={index} cite={"- " + note.user} color={theme.colors.milkshake[4]} icon={<IconPencil />} mt="xl">
      {note.note}
    </Blockquote>
  )); 

  return (
    <Container>
      <Group>{items}</Group>
    </Container>
  )
}