import { useMutation, useQueryClient } from "@tanstack/react-query";
import { executeAICommandService } from "./execute-ai-command.service";
import { AICommand } from "../../ai.model";
import { CommandExecutorResult } from "./types";
import { MutationProps } from "@/infra/types";
import { useRepository } from "@/infra/repository/hooks/useRepository";
import { HabitQueryKeys } from "@/modules/habit/types";

export function useExecuteAICommand(
  props: MutationProps<CommandExecutorResult>,
) {
  const queryClient = useQueryClient();
  const repositoryService = useRepository();
  const { mutateAsync, isPending } = useMutation<
    CommandExecutorResult,
    Error,
    AICommand
  >({
    mutationFn: (command) => {
      return executeAICommandService(command, repositoryService);
    },

    onSuccess: (result) => {
      queryClient.invalidateQueries({
        queryKey: [HabitQueryKeys.GET_HABITS],
      });
      props.onSuccess?.(result);
    },
    onError: props.onError,
  });

  return {
    execute: mutateAsync,
    isPending,
  };
}
