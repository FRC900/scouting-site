"use client";

import { useState } from "react";
import { type QualitativeForm } from "../../lib/definitions";
import { useOnlineStatus } from "../../lib/hooks/useOnlineStatus";
import { useDisclosure } from "@mantine/hooks";
import { useMantineTheme } from "@mantine/core";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { QualitativeFormSchema } from "../../lib/constants";

interface Props {
  create: boolean;
  defaultForm?: QualitativeForm;
  id: string;
}

export default function QualitativeForm({ create, defaultForm, id}: Props) {
  const [submitting, setSubmitting] = useState<"" | "fetching" | "done">("");
  const isOnline = useOnlineStatus();
  const [opened, { toggle }] = useDisclosure(false);
  const theme = useMantineTheme();

  const { control } = useForm<QualitativeForm>({
    resolver: zodResolver(QualitativeFormSchema),
    defaultValues: {
      match: undefined,
      alliance: undefined,
      team: {
        notes: "",
        defence: "0",
        defencenotes: "",
        status: "4",
        hpnotes: "",
      },
    }
  })

}