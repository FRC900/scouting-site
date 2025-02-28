import {
  type NumberInputProps as $NumberInputProps,
  NumberInput as $NumberInput,
  Button,
  Group,
  NumberInputHandlers,
  Stack,
  Text,
} from "@mantine/core";
import { useCounter } from "@mantine/hooks";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import { useRef } from "react";
import {
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";

type Title = {
  title: string;
};

export type IncrementorProps<T extends FieldValues> = UseControllerProps<T> &
  Omit<$NumberInputProps, "value" | "defaultValue"> &
  Title;

export function Incrementor<T extends FieldValues>({
  name,
  control,
  defaultValue,
  rules,
  shouldUnregister,
  onChange,
  title,
  ...props
}: IncrementorProps<T>) {
  const {
    field: { value, onChange: fieldOnChange, ...field },
    fieldState,
  } = useController<T>({
    name,
    control,
    defaultValue,
    rules,
    shouldUnregister,
  });

  const handlersRef = useRef<NumberInputHandlers>(null);

  return (
    <Stack gap="xs">
      <Text size="sm">{title}</Text>
      <Group gap="xs" justify="center">
        <Button
          variant="default"
          radius="md"
          onClick={() => handlersRef.current?.decrement()}
        >
          <IconChevronDown color="var(--mantine-color-red-text)" />
        </Button>
        <$NumberInput
          value={value}
          onChange={(e) => {
            fieldOnChange(e);
            onChange?.(e);
          }}
          error={fieldState.error?.message}
          {...field}
          {...props}
          hideControls
          handlersRef={handlersRef}
          step={1}
          min={0}
          w={100}
        />
        <Button
          variant="default"
          radius="md"
          onClick={() => handlersRef.current?.increment()}
        >
          <IconChevronUp color="var(--mantine-color-teal-text)" />
        </Button>
      </Group>
    </Stack>
  );
}
