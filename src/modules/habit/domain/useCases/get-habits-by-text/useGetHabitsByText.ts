import { HabitQueryKeys } from "@/modules/habit/types";
import { useQuery } from "@tanstack/react-query";
import { getHabitsByText } from "./get-habits-by-text.service";

export function useGetHabitsByText(text: string) {
  const { data, isLoading } = useQuery({
    queryKey: [HabitQueryKeys.GET_HABITS, text],
    queryFn: () => getHabitsByText(text),
  });

  return {
    habits: data,
    isLoading,
  };
}
