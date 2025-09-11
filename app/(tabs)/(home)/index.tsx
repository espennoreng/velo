import { ListItem } from "@/components/ui/item/ListItem";
import { SearchBox } from "@/components/ui/search/SearchBox";
import { Colors } from "@/constants/Colors";
import { Item } from "@/types/item";
import { FlashList } from "@shopify/flash-list";
import { Link } from "expo-router";
import { useMemo } from "react";
import {
	ColorSchemeName,
	StyleSheet,
	useColorScheme,
	View
} from "react-native";
import uuid from 'react-native-uuid';


const TEST_DATA: Item[] = [];
for (let i = 4; i <= 20; i++) {
  TEST_DATA.push({
    id: uuid.v4(),
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
	  <View style={{width: "100%", flex: 1}}>
		<FlashList
			estimatedItemSize={100}
			ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
			data={TEST_DATA}
			renderItem={({ item }) => (
				<Link href={{
					pathname: "/(tabs)/(home)/item/[itemID]",
					params: { itemID: item.id }
				}} asChild>
					<ListItem
						item={item}
					/>
				</Link>
			)}
			keyExtractor={(item) => item.id}
		/>
	  </View>
    </View>
  );
}

const getStyles = (theme: ColorSchemeName) => {
  const colors = Colors[theme ?? "light"];

  return StyleSheet.create({
    container: {
	  width: "100%",
      flex: 1,
      padding: 16,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.neutral.light.lightest,
      rowGap: 16,
    },
  });
};
