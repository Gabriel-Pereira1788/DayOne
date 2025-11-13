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
    router.push({
      pathname: "/edit-habit",
      params: {
        id: id,
        title: habit?.title || "",
        description: habit?.description || "",
        icon: habit?.icon || "",
        targetDurationInDays: habit?.targetDurationInDays,
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
