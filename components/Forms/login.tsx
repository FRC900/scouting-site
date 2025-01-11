'use client';

import { Paper, Stack, Button, useMantineTheme, Group, Text } from "@mantine/core";
import { Form, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type LoginForm } from "../../lib/definitions";
import { LoginFormSchema } from "../../lib/constants";
import { TextInput } from "./inputs/TextInput";
import { PasswordInput } from "./inputs/PasswordInput";
import { useActionState } from "react";
import { authenticate } from "../../lib/actions";
import { IconExclamationCircle } from "@tabler/icons-react";

export default function LoginForm({ toggle = () => {} }) {
  const theme = useMantineTheme();

  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined,
  )

  const { control } = useForm<LoginForm>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    }
  });

  return(
    <Paper>
      <Form
        control={control}
        onSubmit={() => formAction}
        onError={(e) => console.log(e)}
      >
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
            <Button variant="subtle" onClick={toggle} color={theme.colors.pillow[0]}>Don&apos;t have an account? Register</Button>
            <Button type="submit" color={theme.colors.milkshake[4]}>Login</Button>
          </Group>
          {errorMessage && (
            <>
              <IconExclamationCircle />
              <Text size="sm" c="red">{errorMessage}</Text>
            </>
          )}
        </Stack>
      </Form>
    </Paper>
  )
}