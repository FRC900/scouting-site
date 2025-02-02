'use client';

// import { useActionState } from "react";
// import { authenticate } from "../../lib/actions";
import { Paper, Stack, Button, useMantineTheme, Group, Anchor } from "@mantine/core";
import { Form, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type LoginForm } from "../../lib/definitions";
import { LoginFormSchema } from "../../lib/constants";
import { TextInput } from "./inputs/TextInput";
import { PasswordInput } from "./inputs/PasswordInput";
import { useDisclosure } from "@mantine/hooks";

export default function LoginForm({ toggle = () => {} }) {
  const theme = useMantineTheme();

  // const [errorMessage, formAction, isPending] = useActionState(
  //   authenticate,
  //   undefined,
  // )

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
        onSubmit={({ data }) => console.log(data)}
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
        </Stack>
      </Form>
    </Paper>
  )
}