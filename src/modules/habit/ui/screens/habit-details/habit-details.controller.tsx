import { useGetHabitDetails } from "@/modules/habit/domain/useCases/get-habit-details/useGetHabitDetails";
import { modalService } from "@/shared/services/modal";
import { router, useLocalSearchParams } from "expo-router";
import { DeleteHabitContent } from "../../components/delete-habit-content";

export function useHabitDetailsController() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { habit, isLoading } = useGetHabitDetails(id);

  function openDeleteModal() {
    modalService.open({
      content: (
        <DeleteHabitContent
          habitId={id}
          habitTitle={habit?.title || ""}
          onDelete={() => {
            router.back();
          }}
        />
      ),
    });
  }

  function redirectToEditHabit() {
    const time = `${String(habit?.hours).padStart(2, "0")}:${String(habit?.minutes).padStart(2, "0")}`;
    router.push({
      pathname: "/edit-habit",
      params: {
        id: id,
        time,
        frequency: habit?.frequency || "",
        dayOfMonth: habit?.dayOfMonth,
        dayOfWeek: habit?.dayOfWeek,
        title: habit?.title || "",
        description: habit?.description || "",
        icon: habit?.icon || "",
        targetDurationInDays: habit?.targetDurationInDays || "30",
      },
    });
  }

  return {
    redirectToEditHabit,
    openDeleteModal,
    habit,
    isLoading,
  };
}
