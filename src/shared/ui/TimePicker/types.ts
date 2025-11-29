import { SharedValue } from "react-native-reanimated";

export interface TimeWheelProps {
  items: number[];
  selectedIndex: React.RefObject<number>;
  onSelect: (value: number) => void;
}

export interface TimePickerProps {
  initialHour?: number;
  initialMinute?: number;
  onConfirm?: (hour: number, minute: number) => void;
}

export interface TimeRef {
  onSelect: (isSelected: boolean) => void;
}

export interface TimeItemProps {
  value: number;
  index: number;
  scrollY: SharedValue<number>;
}
