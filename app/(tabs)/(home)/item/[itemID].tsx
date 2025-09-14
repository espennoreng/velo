import { ListInspectionType } from "@/components/ui/inspectionType/ListInspectionType";
import LastInspectionCard from "@/components/ui/lastInspection/LastInspectionCard";
import ListProgress from "@/components/ui/progress/ListProgress";
import { Colors } from "@/constants/Colors";
import { InspectionType } from "@/types/inspectionType";
import { LastInspection } from "@/types/lastInspection";
import { Link } from "expo-router";
import { useState } from "react";
import {
	ColorSchemeName,
	FlatList,
	SectionList,
	StyleSheet,
	Text,
	TouchableOpacity,
	useColorScheme,
	View,
} from "react-native";
import uuid from "react-native-uuid";

const INSPECTION_TYPES: InspectionType[] = [
  {
    id: String(uuid.v4()),
    title: "Adhoc inspection",
    description:
      "This is for inspections that are not part of a planned inspection",
  },
  {
    id: String(uuid.v4()),
    title: "Pre-delivery inspection",
    description: "This is for inspections before delivery",
  },
  {
    id: String(uuid.v4()),
    title: "Post-delivery inspection",
    description: "This is for inspections after delivery",
  },
];

const LAST_INSPECTIONS: LastInspection[] = [
  {
    id: String(uuid.v4()),
    title: "Adhoc inspection",
    date: "21. Feb 2024, 14:32",
    inspector: "John Doe",
    imageUrl: "https://picsum.photos/200/300",
  },
  {
    id: String(uuid.v4()),
    title: "Pre-delivery inspection",
    date: "23. Jan 2024, 09:15",
    inspector: "Jane Smith",
    imageUrl: "https://picsum.photos/200/300",
  },
  {
    id: String(uuid.v4()),
    title: "Post-delivery inspection",
    date: "25. Sep 2023, 10:00",
    inspector: "Alice Johnson",
    imageUrl: "https://picsum.photos/200/300",
  },
];

const PROGRESS_ITEMS = [
  {
    id: String(uuid.v4()),
    title: "Add hoc inspection",
    date: "21. Feb 2024, 14:32",
    status: "in_progress",
  },
  {
    id: String(uuid.v4()),
    title: "Syncing data",
    date: "21. Feb 2024, 14:32",
    status: "in_progress",
  },
  {
    id: String(uuid.v4()),
    title: "Upload images",
    date: "20. Feb 2024, 10:15",
    status: "failed",
  },
];

export default function ItemScreen() {
  const theme = useColorScheme() ?? "light";
  const styles = getStyles(theme);
  const [activeSyncTab, setActiveSyncTab] = useState<"in_progress" | "failed">(
    "in_progress"
  );

  const sections = [
    {
      title: "Start a new inspection",
      data: INSPECTION_TYPES,
    },
    {
      title: "Last inspections",
      data: [LAST_INSPECTIONS],
    },
    {
      title: "Synchronization",
      data: PROGRESS_ITEMS.filter((item) => item.status === activeSyncTab),
    },
  ];

  const renderItem = ({
    item,
    section,
  }: {
    item: any;
    section: { title: string };
  }) => {
    switch (section.title) {
      case "Start a new inspection":
        return <ListInspectionType inspectionType={item} />;
      case "Last inspections":
        return (
          <FlatList
            horizontal={true}
            data={item}
            keyExtractor={(lastInspection) => lastInspection.id}
            renderItem={({ item: lastInspection }) => (
              <Link asChild href={{
				pathname: "/(tabs)/(home)/item/inspection/[inspectionID]",
				params: { inspectionID: lastInspection.id },
			  }}>
                <LastInspectionCard lastInspection={lastInspection} />
              </Link>
            )}
            ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
            showsHorizontalScrollIndicator={false}
          />
        );
      case "Synchronization":
        return (
          <ListProgress
            title={item.title}
            date={item.date}
            status={item.status}
          />
        );
      default:
        return null;
    }
  };

  // A function to render the header for each section
  const renderSectionHeader = ({
    section: { title },
  }: {
    section: { title: string };
  }) => {
    if (title === "Synchronization") {
      return (
        <View style={styles.headerWrapper}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.tabsContainer}>
            <TouchableOpacity
              onPress={() => setActiveSyncTab("in_progress")}
              style={[
                styles.tab,
                activeSyncTab === "in_progress" && styles.activeTab,
              ]}
            >
              <Text style={styles.tabText}>In progress</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setActiveSyncTab("failed")}
              style={[
                styles.tab,
                activeSyncTab === "failed" && styles.activeTab,
              ]}
            >
              <Text style={styles.tabText}>Failed</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }

    return (
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
        {title === "Last inspections" && (
          <Link asChild href="/item/lastInspections">
            <TouchableOpacity>
              <Text style={styles.link}>See all</Text>
            </TouchableOpacity>
          </Link>
        )}
      </View>
    );
  };

  return (
    <SectionList
      invertStickyHeaders={true}
      style={styles.container}
      sections={sections}
      keyExtractor={(item, index) => item.id + index}
      renderItem={renderItem}
      renderSectionHeader={renderSectionHeader}
      ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
      SectionSeparatorComponent={() => <View style={{ height: 16 }} />}
      ListHeaderComponent={() => <View style={{ height: 16 }} />}
    />
  );
}

const getStyles = (theme: ColorSchemeName) => {
  const colors = Colors[theme ?? "light"];

  return StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 16,
      backgroundColor: colors.neutral.light.lightest,
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
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: 16,
      backgroundColor: colors.neutral.light.lightest,
    },
    headerWrapper: {
      marginTop: 16,
      rowGap: 16,
      backgroundColor: colors.neutral.light.lightest,
    },
    tabsContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 4,
      backgroundColor: colors.neutral.light.light,
      borderRadius: 16,
    },
    tab: {
      padding: 8,
      borderRadius: 16,
      flex: 1,
      alignItems: "center",
    },
    activeTab: {
      backgroundColor: colors.neutral.light.lightest,
    },
    tabText: {
      fontSize: 12,
      color: colors.neutral.dark.darkest,
      fontWeight: "bold",
    },
  });
};
