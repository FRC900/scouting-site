import {
  type NumberInputProps as $NumberInputProps,
  NumberInput as $NumberInput,
} from "@mantine/core";
import {
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";

export type NumberInputProps<T extends FieldValues> = UseControllerProps<T> &
  Omit<$NumberInputProps, "value" | "defaultValue">;

export function NumberInput<T extends FieldValues>({
  name,
  control,
  defaultValue,
  rules,
  shouldUnregister,
  onChange,
  ...props
}: NumberInputProps<T>) {
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

  return (
    <$NumberInput
      value={value}
      onChange={(e) => {
        fieldOnChange(e);
        onChange?.(e);
      }}
      error={fieldState.error?.message}
      {...field}
      {...props}
    />
  );
}
