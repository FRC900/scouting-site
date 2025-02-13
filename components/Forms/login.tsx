"use client";

import {
  Paper,
  Stack,
  Button,
  useMantineTheme,
  Group,
  Text,
} from "@mantine/core";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type LoginForm } from "../../lib/definitions";
import { LoginFormSchema } from "../../lib/constants";
import { TextInput } from "./inputs/TextInput";
import { PasswordInput } from "./inputs/PasswordInput";
import { useFormState } from "react-dom";
import { authenticate } from "../../lib/actions";
import { useSearchParams } from "next/navigation";
import { IconExclamationCircle } from "@tabler/icons-react";

export default function LoginForm({ toggle = () => {} }) {
  const theme = useMantineTheme();

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/data";

  const [errorMessage, formAction, isPending] = useFormState(
    authenticate,
    undefined
  );

  const { control, handleSubmit } = useForm<LoginForm>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<LoginForm> = (data) => {
    formAction;
  }

  return (
    <Paper>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack>
          <TextInput
            name="email"
            control={control}
            label="Username"
            placeholder="Your Username"
          />
          <PasswordInput
            name="password"
            control={control}
            label="Password"
            placeholder="Your Password"
          />
          <Group justify="space-between">
            <Button
              variant="subtle"
              onClick={toggle}
              color={theme.colors.pillow[0]}
            >
              Don&apos;t have an account? Register
            </Button>
            <input type="hidden" name="redirectTo" value={callbackUrl} />
            <Button color={theme.colors.milkshake[4]}>
              Login
            </Button>
          </Group>
          {errorMessage && (
            <>
              <IconExclamationCircle />
              <Text size="sm" c="red">{errorMessage}</Text>
            </>
          )}
        </Stack>
      </form>
    </Paper>
  );
}
