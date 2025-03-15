import { Form, useForm } from "react-hook-form";
import { TextInput } from "./inputs/TextInput";
import { type RegisterForm } from "../../lib/definitions";
import { Stack, Group, useMantineTheme, Button } from "@mantine/core";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterFormSchema } from "../../lib/constants";
import { PasswordInput } from "./inputs/PasswordInput";
import { useOnlineStatus } from "../../lib/hooks/useOnlineStatus";
import { useState } from "react";
import { register } from "../../lib/actions";

export default function RegisterForm({ toggle = () => {} }) {
  const theme = useMantineTheme();
  const isOnline = useOnlineStatus();
  const [submitting, setSubmitting] = useState<"" | "fetching" | "done">("");

  const { control } = useForm<RegisterForm>({
    resolver: zodResolver(RegisterFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirm: "",
    },
  });

  const submit = (data: RegisterForm) => {
    if (isOnline) {
      setSubmitting("fetching");
      register(data);
      setSubmitting("done");
    }
  };

  return (
    <>
      <Form
        control={control}
        onSubmit={({ data }) => submit(data)}
        onError={(e) => console.log(e)}
      >
        <Stack>
          <p>registering disabled sorry</p>
          {/* <TextInput
            name="name"
            control={control}
            label="First Name"
            placeholder="Your Preferred Name"
          />
          <TextInput
            name="email"
            control={control}
            label="Email"
            placeholder="Your Email"
          />
          <PasswordInput
            name="password"
            control={control}
            label="Password"
            placeholder="Your Password"
          />
          <PasswordInput
            name="confirm"
            control={control}
            label="Confirm Password"
            placeholder="Your Password"
          /> */}
          <Group justify="space-between">
            <Button
              variant="subtle"
              onClick={toggle}
              color={theme.colors.pillow[0]}
            >
              Already have an account? Login
            </Button>
            <Button
              type="submit"
              color={theme.colors.milkshake[4]}
              disabled={submitting === "fetching"}
            >
              Register
            </Button>
          </Group>
        </Stack>
      </Form>
    </>
  );
}
