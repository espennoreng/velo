import { ListInspectionType } from "@/components/ui/inspectionType/ListInspectionType";
import LastInspectionCard from "@/components/ui/lastInspection/LastInspectionCard";
import { Colors } from "@/constants/Colors";
import { InspectionType } from "@/types/inspectionType";
import { LastInspection } from "@/types/lastInspection";
import { Link } from "expo-router";
import {
	ColorSchemeName,
	FlatList,
	StyleSheet,
	Text,
	TouchableOpacity,
	useColorScheme,
	View,
} from "react-native";
import uuid from 'react-native-uuid';
const INSPECTION_TYPES: InspectionType[] = [
  {
    id: uuid.v4(),
    title: "Adhoc inspection",
    description:
      "This is for inspections that are not part of a planned inspection",
  },
  {
    id: uuid.v4(),
    title: "Pre-delivery inspection",
    description: "This is for inspections before delivery",
  },
  {
    id: uuid.v4(),
    title: "Post-delivery inspection",
    description: "This is for inspections after delivery",
  },
];



const LAST_INSPECTIONS: LastInspection[] = [
  {
	id: uuid.v4(),
    title: "Adhoc inspection",
    date: "21. Feb 2024, 14:32",
    inspector: "John Doe",
	imageUrl: "https://picsum.photos/200/300",
  },
  {
	id: uuid.v4(),
    title: "Pre-delivery inspection",
    date: "23. Jan 2024, 09:15",
    inspector: "Jane Smith",
	imageUrl: "https://picsum.photos/200/300",
  },
  {
	id: uuid.v4(),
    title: "Post-delivery inspection",
    date: "25. Sep 2023, 10:00",
    inspector: "Alice Johnson",
	imageUrl: "https://picsum.photos/200/300",
  },
];

export default function ItemScreen() {
  const theme = useColorScheme() ?? "light";
  const styles = getStyles(theme);

  return (
    <View style={styles.container}>
      <View style={{ width: "100%", flexDirection: "column", rowGap: 16 }}>
        <Text style={styles.title}>Start a new inspection</Text>
        <FlatList
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
          data={INSPECTION_TYPES}
          renderItem={({ item }) => (
            <ListInspectionType inspectionType={item} />
          )}
        />
      </View>
      <View style={{ width: "100%", flexDirection: "column", rowGap: 16 }}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Last inspections</Text>
          <Link asChild href="/(tabs)/(home)">
            <TouchableOpacity>
              <Text style={styles.link}>See all</Text>
            </TouchableOpacity>
          </Link>
        </View>
        <FlatList
          horizontal={true}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
          data={LAST_INSPECTIONS}
          renderItem={({ item }) => (
            <LastInspectionCard lastInspection={item} />
          )}
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
      alignItems: "center",
      backgroundColor: colors.neutral.light.lightest,
      rowGap: 40,
    },
    title: {
      fontSize: 14,
      fontWeight: "bold",
      color: colors.neutral.dark.darkest,
    },
    link: {
      fontSize: 12,
      fontWeight: "600",
      color: colors.highlight.darkest,
    },
    titleContainer: {
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
  });
};
