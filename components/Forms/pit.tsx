"use client";

import { Stack, Button, useMantineTheme, Group, Modal } from "@mantine/core";
import { useForm, Form } from "react-hook-form";
import { type PitForm } from "../../lib/definitions";
import { PitFormSchema } from "../../lib/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { NumberInput } from "./inputs/NumberInput";
import { Select } from "./inputs/Select";
import { TextInput } from "./inputs/TextInput";
import { createPitForm, deletePitForm, updatePitForm } from "../../lib/actions";
import { useEffect, useState } from "react";
import { useOnlineStatus } from "../../lib/hooks/useOnlineStatus";
import { useDisclosure } from "@mantine/hooks";
import { MultiSelect } from "./inputs/MultiSelect";
import { Checkbox } from "./inputs/Checkbox";

interface Props {
  create: boolean;
  defaultForm?: PitForm;
  id: string;
}

export default function PitForm({ create, defaultForm, id }: Props) {
  const [submitting, setSubmitting] = useState<"" | "fetching" | "done">("");
  // const [file, setFile] = useState<File | null>(null);
  const isOnline = useOnlineStatus();
  const [opened, { toggle }] = useDisclosure(false);
  const theme = useMantineTheme();

  const { control } = useForm<PitForm>({
    resolver: zodResolver(PitFormSchema),
    defaultValues: {
      team: undefined,
      drive: undefined,
      weight: undefined,
      preferredscoring: undefined,
      connection: undefined,
      reversible: false,
      bumpernotes: "",
      notes: "",
      ...defaultForm,
      electrical: defaultForm?.electrical.toString() || undefined,
      bumpers: defaultForm?.bumpers.toString() || undefined,
    },
  });

  const submit = (data: PitForm, create: boolean, id: string) => {
    if (isOnline) {
      setSubmitting("fetching");
      if (create) {
        createPitForm(data).then(() => setSubmitting("done"));
      } else {
        updatePitForm(data, id).then(() => setSubmitting("done"));
      }
    }
  };

  useEffect(() => {
      if (create) {
        if (submitting === "done") {
          window.location.reload()
        }
      }
    }, [submitting, create]);

  return (
    <Form
      control={control}
      onSubmit={({ data }) => submit(data, create, id)}
      onError={(e) => console.log(e)}
    >
      <Stack>
        <NumberInput name="team" control={control} label="Team Number" />
        <Select
          name="drive"
          control={control}
          label="Drive Train"
          placeholder="Select"
          data={[
            { label: "Swerve", value: "swerve" },
            { label: "Tank", value: "tank" },
            { label: "Mecanum", value: "mecanum" },
            { label: "Other", value: "other" },
          ]}
        />
        <NumberInput
          name="weight"
          control={control}
          label="Weight (lbs)"
          description="Without bumpers and battery."
        />
        <Select
          name="preferredscoring"
          control={control}
          label="Preferred Gamepiece"
          description="For Qualifications."
          placeholder="Select"
          data={[
            { label: "Coral", value: "coral" },
            { label: "Algae", value: "algae" },
          ]}
        />
        <Select
          name="electrical"
          control={control}
          label="Electrical Rating"
          placeholder="Select"
          data={[
            { label: "1 - Incomplete", value: "1" },
            { label: "2 - Hazardous", value: "2" },
            { label: "3 - Messy", value: "3" },
            { label: "4 - Acceptable", value: "4" },
            { label: "5 - Star Struck", value: "5" },
          ]}
        />
        <MultiSelect
          name="connection"
          control={control}
          label="Connectors Used"
          placeholder="Select"
          data={[
            { label: "Solder + Heatshrink", value: "solder" },
            { label: "Electrical Tape", value: "tape" },
            { label: "Crimps", value: "crimp" },
            { label: "Pinch Connectors", value: "pinch" },
            { label: "Other", value: "other" },
          ]}
          w={225}
        />
        <Select
          name="bumpers"
          control={control}
          label="Bumpers Rating"
          placeholder="Select"
          data={[
            { label: "1 - Poor", value: "1" },
            { label: "2 - Good", value: "2" },
            { label: "3 - Excellent", value: "3" },
          ]}
        />
        <Checkbox
          name="reversible"
          control={control}
          label="Reversible Bumprers?"
          color={theme.colors.milkshake[4]}
        />
        <TextInput
          name="bumpernotes"
          control={control}
          label="Bumper Notes"
          placeholder="Yap about bumpers"
        />
        <TextInput
          name="notes"
          control={control}
          label="Notes"
          placeholder="Additional Information Here"
        />

        {/* <Stack gap={1}>
          <Group justify="center">
            <FileButton onChange={setFile} accept="image/png,image/jpeg">
              {(props) => (
                <Button
                  color={theme.colors.snow[0]}
                  variant="light"
                  leftSection={
                    <IconPhotoUp style={{ width: rem(14), height: rem(14) }} />
                  }
                  {...props}
                >
                  Upload Robot Photo
                </Button>
              )}
            </FileButton>
          </Group>
          {file && (
            <Text size="md" ta="center" mt="sm">
              Image: {file.name}
            </Text>
          )}
        </Stack> */}

        <Group justify="end">
          <Button
            type="submit"
            disabled={submitting === "fetching"}
            color={theme.colors.milkshake[4]}
          >
            {create ? "Submit" : "Update"}
          </Button>
          {!create ? (
            <Button
              disabled={submitting === "fetching"}
              color={theme.colors.rose[5]}
              onClick={() => {
                toggle();
                console.log(opened);
              }}
            >
              Delete
            </Button>
          ) : (
            <></>
          )}
        </Group>
        <Modal
          opened={opened}
          onClose={toggle}
          title="Are you sure you want to delete? This cannot be undone."
          centered
        >
          <Group justify="center" align="center">
            <Button
              type="submit"
              variant="outline"
              color="red"
              size="md"
              onClick={() => {
                deletePitForm(id).then(() => toggle());
              }}
            >
              Delete
            </Button>
            <Button
              variant="filled"
              color={theme.colors.milkshake[4]}
              size="md"
              onClick={toggle}
            >
              Cancel
            </Button>
          </Group>
        </Modal>
      </Stack>
    </Form>
  );
}
