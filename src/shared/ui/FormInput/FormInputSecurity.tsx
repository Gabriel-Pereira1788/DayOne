import React from "react";

import { Controller, FieldValues, UseControllerProps } from "react-hook-form";

import { TextInputProps, SecurityInput } from "../TextInput";
import { FormInputProps } from "./FormInput";

export type FormInputSecurityProps<FormSchema extends FieldValues> =
  {} & FormInputProps<FormSchema>;

export function FormInputSecurity<TFieldValue extends FieldValues>({
  control,
  name,
  rules,
  errorMessage,
  ...props
}: FormInputSecurityProps<TFieldValue>) {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ fieldState, field }) => (
        <SecurityInput
          errorMessage={fieldState.error?.message || errorMessage}
          onChangeText={field.onChange}
          value={field.value}
          {...props}
        />
      )}
    />
  );
}
