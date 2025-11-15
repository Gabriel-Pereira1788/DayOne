import { IconProps } from "@/shared/ui";

export interface HabitIconSelectionProps {
  defaultIcon?:IconProps['iconName']
  onChangeIcon: (iconName: IconProps["iconName"]) => void;
}
