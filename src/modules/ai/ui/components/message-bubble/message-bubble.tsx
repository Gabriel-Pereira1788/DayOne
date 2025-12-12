import { Box, Text } from "@/shared/ui";
import { MessageBubbleProps } from "./types";
import { HabitCard } from "@/modules/habit/ui/components/habit-card";
import { TouchableBounce } from "@/shared/ui/Touchable";
import { router } from "expo-router";
import { AnimatedMessageText } from "./components";

export function MessageBubble({ message, animated = false }: MessageBubbleProps) {
  const isUser = message.role === "user";
  const isSystem = message.role === "system";

  const habitData = message.data
    ? Array.isArray(message.data)
      ? message.data
      : [message.data]
    : undefined;


  if (isSystem) return null;

  return (
    <Box
      marginBottom="sp12"
      paddingHorizontal="sp3"
      flexDirection="row"
      justifyContent={isUser ? "flex-end" : "flex-start"}
    >
      {/*{!isUser && (
        <Box
          width={30}
          height={30}
          alignSelf="flex-end"
          position="relative"
          bottom={-15}
          alignItems="center"
          justifyContent="center"
          borderRadius="rd100"
          backgroundColor="surfaceBorder"
        >
          <Logo width={20} height={20} />
        </Box>
      )}*/}
      <Box
        maxWidth="75%"
        minWidth="10%"
        backgroundColor={isUser ? "backgroundTertiary" : "backgroundSecondary"}
        borderRadius={"rd15"}
        borderBottomRightRadius={isUser ? "rd4" : "rd15"}
        borderBottomLeftRadius={isUser ? "rd15" : "rd4"}
        borderWidth={1}
        borderColor={isUser ? "surfaceBorder" : undefined}
        padding="sp12"
        paddingHorizontal="sp15"
      >
        {animated ? (
          <AnimatedMessageText
            text={message.content}
            preset="regular/14"
            color="textPrimary"
            showCursor
            enabled
          />
        ) : (
          <Text preset="regular/14" text={message.content} color="textPrimary" />
        )}

        {habitData && (
          <Box my="sp10" gap="sp10">
            {habitData.map((habit) => (
              <TouchableBounce
                key={habit.id}
                testID="habit-card"
                onPress={() => router.push(`/habit-details/${habit.id}`)}
              >
                <HabitCard habit={habit} />
              </TouchableBounce>
            ))}
          </Box>
        )}

        {/* Timestamp */}
        <Box marginTop="sp5">
          <Text
            preset="regular/10"
            text={new Date().toLocaleTimeString("pt-BR", {
              hour: "2-digit",
              minute: "2-digit",
            })}
            color="textTertiary"
            align={isUser ? "right" : "left"}
          />
        </Box>
      </Box>
    </Box>
  );
}
