import { palette } from "@/styles";
import { View, StyleSheet } from "react-native";

interface ProgressBarProps {
  progress: number;
}

export function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <View style={styles.container}>
      <View
        testID="progress-bar"
        style={{
          height: "100%",
          backgroundColor: palette.surface.tertiary,
          width: `${progress * 100}%`,
          borderRadius: 2,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 4,
    backgroundColor: "#333",
    borderRadius: 2,
    overflow: "hidden",
  },
});
