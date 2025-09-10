import { ListItem } from "@/components/ui/item/ListItem";
import { SearchBox } from "@/components/ui/search/SearchBox";
import { Colors } from "@/constants/Colors";
import { Item } from "@/types/item";
import { useMemo } from "react";
import {
	ColorSchemeName,
	FlatList,
	StyleSheet,
	useColorScheme,
	View,
} from "react-native";

const TEST_DATA: Item[] = [];
for (let i = 4; i <= 20; i++) {
  TEST_DATA.push({
    id: i.toString(),
    title: `Item ${i}`,
    description: `This is item ${i}`,
  });
}

export default function HomeScreen() {
  const theme = useColorScheme();

  const styles = useMemo(() => getStyles(theme), [theme]);

  return (
    <View style={styles.container}>
      <SearchBox
        placeholder="Search items..."
        onSearch={(query) => console.log("Searching for:", query)}
      />
      <FlatList
        style={styles.flatList}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        data={TEST_DATA}
        renderItem={({ item }) => (
          <ListItem
            item={item}
            onPress={() => console.log("Pressed", item.id)}
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const getStyles = (theme: ColorSchemeName) => {
  const colors = Colors[theme ?? "light"];

  return StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.neutral.light.lightest,
      rowGap: 16,
    },
    flatList: {
      width: "100%",
    },
  });
};
