import { useDeleteHabit } from "@/modules/habit/domain/useCases/delete-habit";
import { DeleteHabitContentProps } from "./types";
import { modalService } from "@/shared/services/modal";
import { Alert } from "react-native";
import { HabitId } from "@/modules/habit/domain/habit.model";

type Props = {
  onDelete: DeleteHabitContentProps["onDelete"];
  habitId: HabitId;
};
export function useDeleteHabitController({ onDelete, habitId }: Props) {
  const { deleteHabit, isPending } = useDeleteHabit({
    onSuccess: () => {
      modalService.hide();
      onDelete();
    },
    onError: () => {
      Alert.alert("Error deleting habit");
    },
  });

  function handleDelete() {
    deleteHabit({ id: habitId });
  }
  return {
    handleDelete,
    isPending,
  };
}
