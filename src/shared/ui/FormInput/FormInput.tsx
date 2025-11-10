import React from "react";

import { Controller, FieldValues, UseControllerProps } from "react-hook-form";

import { IconTextInput, IconTextInputProps } from "../TextInput";

export type FormInputProps<TFieldValue extends FieldValues> = {} & Omit<
  IconTextInputProps,
  "value" | "error" | "onChange" | "onChangeText"
> &
  UseControllerProps<TFieldValue>;

export function FormInput<TFieldValue extends FieldValues>({
  control,
  name,
  rules,
  errorMessage,
  ...textInputProps
}: FormInputProps<TFieldValue>) {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ fieldState, field }) => {
        return (
          <IconTextInput
            errorMessage={fieldState.error?.message || errorMessage}
            onChangeText={(text) => {
              field.onChange(text);
            }}
            value={field.value}
            {...textInputProps}
          />
        );
      }}
    />
  );
}
