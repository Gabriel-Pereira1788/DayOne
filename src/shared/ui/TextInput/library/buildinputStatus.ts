import { TextInputProps } from "../TextInput";

export function buildInputStatus(props: TextInputProps) {
  if (props.errorMessage) {
    return "error";
  }

  if (props.disabled) {
    return "disabled";
  }
  return "default";
}
