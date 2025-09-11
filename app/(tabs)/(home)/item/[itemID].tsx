import { ListInspectionType } from "@/components/ui/inspectionType/ListInspectionType";
import { Colors } from "@/constants/Colors";
import { InspectionType } from "@/types/inspectionType";
import {
	ColorSchemeName,
	FlatList,
	StyleSheet,
	Text,
	useColorScheme,
	View,
} from "react-native";

const INSPECTION_TYPES: InspectionType[] = [
  {
    id: "1",
    title: "Adhoc inspection",
    description:
      "This is for inspections that are not part of a planned inspection",
  },
  {
    id: "2",
    title: "Pre-delivery inspection",
    description: "This is for inspections before delivery",
  },
  {
    id: "3",
    title: "Post-delivery inspection",
    description: "This is for inspections after delivery",
  },
];

export default function ItemScreen() {
  const theme = useColorScheme() ?? "light";
  const styles = getStyles(theme);

  return (
    <View style={styles.container}>
      <View
        style={{ width: "100%", flexDirection: "column", rowGap: 16 }}
      >
        <Text style={styles.title}>Item Title</Text>
        <View>
          <FlatList
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
            data={INSPECTION_TYPES}
            renderItem={({ item }) => (
              <ListInspectionType inspectionType={item} />
            )}
          />
        </View>
        <Text style={styles.title}>Item Title</Text>
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
      alignItems: "center",
      backgroundColor: colors.neutral.light.lightest,
      rowGap: 16,
    },
    title: {
      fontSize: 14,
      fontWeight: "bold",
      color: colors.neutral.dark.darkest,
    },
  });
};
