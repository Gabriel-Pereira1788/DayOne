import { useMutation } from "@tanstack/react-query";
import { executeAICommandService } from "./execute-ai-command.service";
import { AICommand } from "../../ai.model";
import { CommandExecutorResult } from "./types";
import { MutationProps } from "@/infra/types";

export function useExecuteAICommand(
  props: MutationProps<CommandExecutorResult>,
) {
  const { mutateAsync, isPending } = useMutation<
    CommandExecutorResult,
    Error,
    AICommand
  >({
    mutationFn: (command) => executeAICommandService(command),
    onSuccess: (result) => {
      props.onSuccess?.(result);
    },
    onError: props.onError,
  });

  return {
    execute: mutateAsync,
    isPending,
  };
}
