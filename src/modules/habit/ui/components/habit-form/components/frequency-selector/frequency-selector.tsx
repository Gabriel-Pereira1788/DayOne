import React from "react";
import {
  Box,
  Card,
  Text,
  TouchableOpacityBox,
  Icon,
  Button,
} from "@/shared/ui";
import { Control, Controller } from "react-hook-form";

import { ScrollView } from "react-native";
import { FrequencySelectorProps } from "./types";

const FREQUENCY_OPTIONS = [
  {
    value: "daily",
    label: "Daily",
    icon: "calendar" as const,
    description: "Every day",
  },
  {
    value: "weekly",
    label: "Weekly",
    icon: "calendarDots" as const,
    description: "Specific days of the week",
  },
  {
    value: "monthly",
    label: "Monthly",
    icon: "calendarDots" as const,
    description: "Specific day of the month",
  },
];

const WEEK_DAYS = [
  { value: 0, label: "Sun", fullLabel: "Sunday" },
  { value: 1, label: "Mon", fullLabel: "Monday" },
  { value: 2, label: "Tue", fullLabel: "Tuesday" },
  { value: 3, label: "Wed", fullLabel: "Wednesday" },
  { value: 4, label: "Thu", fullLabel: "Thursday" },
  { value: 5, label: "Fri", fullLabel: "Friday" },
  { value: 6, label: "Sat", fullLabel: "Saturday" },
];

export function FrequencySelector({
  control,
  handleClearDays,
}: FrequencySelectorProps) {
  return (
    <Box gap="sp25">
      <Box gap="sp10">
        <Text preset="semiBold/16" text="Frequency" color="textPrimary" />

        <Controller
          control={control}
          name="frequency"
          defaultValue="daily"
          render={({ field: { onChange, value } }) => (
            <Box gap="sp10">
              {FREQUENCY_OPTIONS.map((option) => (
                <TouchableOpacityBox
                  key={option.value}
                  testID={`frequency-option-${option.value}`}
                  onPress={() => {
                    if (option.value === "daily") {
                      handleClearDays();
                    }
                    onChange(option.value);
                  }}
                  activeOpacity={0.7}
                >
                  <Card
                    flexDirection="row"
                    alignItems="center"
                    gap="sp15"
                    padding="sp15"
                    backgroundColor={
                      value === option.value
                        ? "surfacePrimary"
                        : "surfacePrimary"
                    }
                    borderWidth={value === option.value ? 2 : 1}
                    borderColor={
                      value === option.value
                        ? "surfaceTertiary"
                        : "surfaceBorder"
                    }
                  >
                    <Box
                      width={40}
                      height={40}
                      borderRadius="rd12"
                      alignItems="center"
                      justifyContent="center"
                      backgroundColor={
                        value === option.value
                          ? "backgroundPrimary"
                          : "surfaceBorder"
                      }
                    >
                      <Icon
                        iconName={option.icon}
                        size={20}
                        color={
                          value === option.value
                            ? "textPrimary"
                            : "textSecondary"
                        }
                      />
                    </Box>
                    <Box flex={1}>
                      <Text
                        preset="semiBold/14"
                        text={option.label}
                        color="textPrimary"
                      />
                      <Text
                        preset="light/14"
                        text={option.description}
                        color="textSecondary"
                      />
                    </Box>
                    {value === option.value && (
                      <Icon
                        iconName="check"
                        size={25}
                        color="surfaceTertiary"
                      />
                    )}
                  </Card>
                </TouchableOpacityBox>
              ))}
            </Box>
          )}
        />
      </Box>

      {/* Day of Week Selector for Weekly Frequency */}
      <Controller
        control={control}
        name="frequency"
        render={({ field: { value: frequency } }) =>
          frequency === "weekly" ? (
            <Controller
              control={control}
              name="dayOfWeek"
              defaultValue={1}
              render={({ field: { onChange, value } }) => (
                <Box gap="sp10">
                  <Text
                    preset="semiBold/14"
                    text="Select Day of Week"
                    color="textPrimary"
                  />
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ gap: 8 }}
                  >
                    {WEEK_DAYS.map((day) => (
                      <TouchableOpacityBox
                        key={day.value}
                        testID={`weekday-${day.value}`}
                        onPress={() => onChange(day.value)}
                        activeOpacity={0.7}
                      >
                        <Box
                          width={50}
                          height={50}
                          borderRadius="rd12"
                          alignItems="center"
                          justifyContent="center"
                          backgroundColor={
                            value === day.value
                              ? "backgroundPrimary"
                              : "surfacePrimary"
                          }
                          borderWidth={1}
                          borderColor={
                            value === day.value
                              ? "surfaceTertiary"
                              : "surfaceBorder"
                          }
                        >
                          <Text
                            preset="semiBold/14"
                            text={day.label}
                            color={
                              value === day.value
                                ? "textSecondary"
                                : "textPrimary"
                            }
                          />
                        </Box>
                      </TouchableOpacityBox>
                    ))}
                  </ScrollView>
                </Box>
              )}
            />
          ) : (
            <></>
          )
        }
      />

      {/* Day of Month Selector for Monthly Frequency */}
      <Controller
        control={control}
        name="frequency"
        render={({ field: { value: frequency } }) =>
          frequency === "monthly" ? (
            <Controller
              control={control}
              name="dayOfMonth"
              defaultValue={1}
              render={({ field: { onChange, value } }) => (
                <Box gap="sp10">
                  <Text
                    preset="semiBold/14"
                    text="Select Day of Month"
                    color="textPrimary"
                  />
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ gap: 8 }}
                  >
                    {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                      <TouchableOpacityBox
                        key={day}
                        testID={`dayofmonth-${day}`}
                        onPress={() => onChange(day)}
                        activeOpacity={0.7}
                      >
                        <Box
                          width={45}
                          height={45}
                          borderRadius="rd12"
                          alignItems="center"
                          justifyContent="center"
                          backgroundColor={
                            value === day
                              ? "backgroundPrimary"
                              : "surfacePrimary"
                          }
                          borderWidth={1}
                          borderColor={
                            value === day ? "surfaceTertiary" : "surfaceBorder"
                          }
                        >
                          <Text
                            preset="semiBold/14"
                            text={day.toString()}
                            color={
                              value === day ? "textSecondary" : "textPrimary"
                            }
                          />
                        </Box>
                      </TouchableOpacityBox>
                    ))}
                  </ScrollView>
                </Box>
              )}
            />
          ) : (
            <></>
          )
        }
      />
    </Box>
  );
}
