import { Form, useForm } from "react-hook-form";
import { TextInput } from "./inputs/TextInput";
import { type RegisterForm } from "../../lib/definitions";
import { Stack, Group, Anchor, useMantineTheme, Button } from "@mantine/core";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterFormSchema } from "../../lib/constants";
import { PasswordInput } from "./inputs/PasswordInput";

export default function RegisterForm({ toggle = () => {} }) {
	const theme = useMantineTheme();

	const { control } = useForm<RegisterForm>({
		resolver: zodResolver(RegisterFormSchema),
    defaultValues:{
      name: "",
      email: "",
      password: "",
      confirm: "",
    }
	});

	return (
		<>
			<Form
				control={control}
				onSubmit={({ data }) => console.log(data)}
				onError={(e) => console.log(e)}
			>
				<Stack>
					<TextInput
						name="name"
						control={control}
						label="First Name"
						placeholder="Your Preferred Name"
					/>
					<TextInput
						name="email"
						control={control}
						label="NCSSM Email"
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
					/>
					<Group justify="space-between">
						<Button variant="subtle" onClick={toggle} color={theme.colors.pillow[0]}>Already have an account? Login</Button>
						<Button type="submit" color={theme.colors.milkshake[4]}>
							Register
						</Button>
					</Group>
				</Stack>
			</Form>
		</>
	);
}
