import { HabitId } from "@/modules/habit/domain/habit.model";
import { useGetHabitsByText } from "@/modules/habit/domain/useCases/get-habits-by-text";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { router } from "expo-router";
import { useState } from "react";

export function useDashboardController() {
  const [searchText, setSearchText] = useState("");

  const { habits, isLoading } = useGetHabitsByText(searchText);

  function redirectToHabitDetails(habitId: HabitId) {
    router.push(`/habit-details/${habitId}`);
  }

  const debouncedSearch = useDebounce((text: string) => {
    setSearchText(text);
  }, 300);

  return {
    habits,
    isLoading,
    handleSearch: debouncedSearch,
    redirectToHabitDetails,
  };
}
