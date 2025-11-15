import { FlatList, Modal, TouchableOpacity } from "react-native";
import { Box } from "../Box";
import { Icon, IconProps } from "./Icon";
import { mappedIcons } from "./library/buildIcon";
import { useMemo } from "react";

type Props = {
  onSelect: (icon: IconProps["iconName"]) => void;
};

export function IconsSelection({ onSelect }: Props) {
  const iconsList = useMemo(() => Object.keys(mappedIcons), []);
  return (
    <FlatList
      data={iconsList}
      numColumns={2}
      showsVerticalScrollIndicator={false}
      style={{
        width: "100%",
      }}
      columnWrapperStyle={{
        gap: 15,
      }}
      contentContainerStyle={{
        width: "100%",
        rowGap: 15,
      }}
      renderItem={({ item }) => (
        <TouchableOpacity
          testID="icon-selection-modal"
          style={{ flexGrow: 1 }}
          onPress={() => {
            onSelect(item as IconProps["iconName"]);
          }}
        >
          <IconSelectionItem iconName={item as IconProps["iconName"]} />
        </TouchableOpacity>
      )}
    />
  );
}

function IconSelectionItem({ iconName }: { iconName: IconProps["iconName"] }) {
  return (
    <Box
      flexGrow={1}
      padding="sp10"
      height={100}
      borderRadius="rd15"
      alignItems="center"
      justifyContent="center"
      backgroundColor="surfaceBorder"
    >
      <Icon iconName={iconName} size={40} />
    </Box>
  );
}
