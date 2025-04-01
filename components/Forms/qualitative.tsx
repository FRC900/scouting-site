"use client";

import { useState } from "react";
import { type QualitativeForm } from "../../lib/definitions";
import { useOnlineStatus } from "../../lib/hooks/useOnlineStatus";
import { useDisclosure } from "@mantine/hooks";
import { Stack, useMantineTheme } from "@mantine/core";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, useForm } from "react-hook-form";
import { QualitativeFormSchema } from "../../lib/constants";
import { NumberInput } from "./inputs/NumberInput";
import { Select } from "./inputs/Select";

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
      // t1notes: "",
      // t1defence: "0",
      // t1defencenotes: "",
      // t1status: "4",
      // t1hpnotes: "",
      // t2notes: "",
      // t2defence: "0",
      // t2defencenotes: "",
      // t2status: "4",
      // t2hpnotes: "",
      // t3notes: "",
      // t3defence: "0",
      // t3defencenotes: "",
      // t3status: "4",
      // t3hpnotes: "",
    }
  })

  return(
    <Form
      control={control}
    >
      <Stack>
        <NumberInput name="match" control={control} label="Match Number" />
        <Select name="alliance"
          control={control}
          label="Alliance"
          placeholder="Select"
          data={[
            { label: "Red Alliance", value: "red" },
            { label: "Blue Alliance", value: "blue" }
          ]}
        />
      </Stack>
    </Form>
  )
}