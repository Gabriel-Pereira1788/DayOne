export interface DeleteHabitContentProps {
  habitId: string;
  habitTitle: string;
  habitDescription?: string;
  onDelete: () => void;
}
