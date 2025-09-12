import LastInspectionCard from "@/components/ui/lastInspection/LastInspectionCard";
import { Colors } from "@/constants/Colors";
import { LastInspection } from "@/types/lastInspection";
import { FlashList } from "@shopify/flash-list";
import { Link } from "expo-router";
import {
	ColorSchemeName,
	StyleSheet,
	useColorScheme,
	View,
} from "react-native";

const LAST_INSPECTIONS: LastInspection[] = []
for (let i = 0; i < 10; i++) {
  LAST_INSPECTIONS.push({
	id: String(i),
	title: "Adhoc inspection",
	date: "21. Feb 2024, 14:32",
	inspector: "John Doe",
	imageUrl: "https://picsum.photos/200/300",
  });
}

export default function LastInspectionsScreen() {
  const theme = useColorScheme() ?? "light";
  const styles = getStyles(theme);
  return (
    <View style={styles.container}>
      <FlashList
	  	estimatedItemSize={100}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        data={LAST_INSPECTIONS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Link asChild href={{
            pathname: "/(tabs)/(home)/item/inspection/[inspectionID]",
            params: { inspectionID: item.id },
          }}>
            <LastInspectionCard lastInspection={item} fullWidth />
          </Link>
        )}
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
      backgroundColor: colors.neutral.light.lightest,
    },
  });
};
