import { useMutation } from "@tanstack/react-query";
import { executeAICommandService } from "./execute-ai-command.service";
import { AICommand } from "../../ai.model";
import { CommandExecutorResult } from "./types";
import { MutationProps } from "@/infra/types";
import { useRepository } from "@/infra/repository/hooks/useRepository";

export function useExecuteAICommand(
  props: MutationProps<CommandExecutorResult>,
) {
  const repositoryService = useRepository();
  const { mutateAsync, isPending } = useMutation<
    CommandExecutorResult,
    Error,
    AICommand
  >({
    mutationFn: (command) =>
      executeAICommandService(command, repositoryService),
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
