import React, { useCallback, useRef } from "react";
import type { TimeWheelProps } from "./types";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import { Box, TouchableOpacityBox } from "../Box";

import { TimeItem } from "./TimeItem";
import { scheduleOnRN } from "react-native-worklets";
import { LegendList, LegendListRef } from "@legendapp/list";
const ITEM_HEIGHT = 60;
const VISIBLE_ITEMS = 3;
const CONTAINER_HEIGHT = ITEM_HEIGHT * VISIBLE_ITEMS;

const AnimatedLegentList = Animated.createAnimatedComponent(LegendList<number>);

export function TimeWheel({ items, selectedIndex, onSelect }: TimeWheelProps) {
  const flatListRef = useRef<LegendListRef>(null);
  const scrollY = useSharedValue(selectedIndex.current * ITEM_HEIGHT);
  const lastSelectedIndex = useRef(selectedIndex.current);

  const scrollToIndex = useCallback(
    (index: number, animated: boolean = true) => {
      flatListRef.current?.scrollToOffset({
        offset: index * ITEM_HEIGHT,
        animated,
      });
    },
    [],
  );

  const handleScrollUpdate = useCallback((offsetY: number) => {
    "worklet";
    const index = Math.round(offsetY / ITEM_HEIGHT);
    if (
      index >= 0 &&
      index < items.length &&
      index !== lastSelectedIndex.current
    ) {
      lastSelectedIndex.current = index;

      scheduleOnRN(onSelect, index);
    }
  }, []);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;

      handleScrollUpdate(event.contentOffset.y);
    },
    onMomentumEnd: (event) => {},
  });

  const renderItem = useCallback(
    ({ item, index }: { item: number; index: number }) => {
      return (
        <TouchableOpacityBox
          boxProps={{
            height: ITEM_HEIGHT,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => {
            onSelect(item);
            scrollToIndex(index);
          }}
          activeOpacity={0.7}
        >
          <TimeItem index={index} scrollY={scrollY} value={item} />
        </TouchableOpacityBox>
      );
    },
    [],
  );

  const keyExtractor = useCallback((item: number, index: number) => {
    return index.toString();
  }, []);


  React.useEffect(() => {
    scrollToIndex(selectedIndex.current - 1);
  },[selectedIndex.current])

  return (
    <Box height={CONTAINER_HEIGHT} width={80} overflow="hidden">
      <AnimatedLegentList
        ref={flatListRef}
        data={items}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        recycleItems
        showsVerticalScrollIndicator={false}
        snapToInterval={ITEM_HEIGHT}
        decelerationRate="fast"
        onScroll={scrollHandler}
        estimatedItemSize={60}
        scrollEventThrottle={16}
        contentContainerStyle={{
          paddingVertical: ITEM_HEIGHT,
        }}
      />

      <Box
        position="absolute"
        top={ITEM_HEIGHT}
        height={ITEM_HEIGHT}
        width="100%"
        borderTopWidth={0.5}
        borderBottomWidth={0.5}
        borderColor="surfaceBorder"
        pointerEvents="none"
      />
    </Box>
  );
}
