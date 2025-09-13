import { Colors } from "@/constants/Colors";
import { Invite } from "@/types/invite";
import { Member } from "@/types/member";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Link, RelativePathString } from "expo-router";
import {
	ColorSchemeName,
	SectionList,
	StyleSheet,
	Text,
	TouchableOpacity,
	useColorScheme,
	View,
} from "react-native";

const TEST_MEMBERS: Member[] = [
  { id: "1", name: "Espen Noreng", email: "espen@example.com", role: "Admin" },
  { id: "2", name: "John Doe", email: "john@example.com", role: "Member" },
  { id: "3", name: "Jane Smith", email: "jane@example.com", role: "Member" },
];

const TEST_INVITES: Invite[] = [
  { id: "4", email: "guest@example.com", role: "Member" },
];

const SECTIONS = [
  { title: "Invites", data: TEST_INVITES },
  { title: "Members", data: TEST_MEMBERS },
];

export default function MembersScreen() {
  const theme = useColorScheme() ?? "light";
  const styles = getStyles(theme);

  const renderItem = ({
    item,
    section,
  }: {
    item: Member | Invite;
    section: { title: string };
  }) => {
    const href =
      section.title === "Members"
        ? {
            pathname:
              "/(tabs)/(members)/member/[memberID]" as RelativePathString,
            params: { memberID: item.id },
          }
        : {
            pathname:
              "/(tabs)/(members)/invite/[inviteID]" as RelativePathString,
            params: { inviteID: item.id },
          };

    return (
      <Link asChild href={href}>
        <TouchableOpacity style={styles.memberContainer}>
          <View style={styles.iconContainer}>
            <Ionicons
              name="person"
              size={20}
              color={Colors[theme].highlight.darkest}
            />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.nameText}>{item.email}</Text>
            <Text style={styles.roleText}>{item.role}</Text>
          </View>
          <Ionicons
            name="chevron-forward"
            size={16}
            color={Colors[theme].neutral.dark.lightest}
          />
        </TouchableOpacity>
      </Link>
    );
  };

  return (
    <SectionList
      invertStickyHeaders={true}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      sections={SECTIONS}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      renderSectionHeader={({ section: { title } }) => (
        <Text style={styles.title}>{title}</Text>
      )}
      ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
      SectionSeparatorComponent={() => <View style={{ height: 16 }} />}
    />
  );
}

const getStyles = (theme: ColorSchemeName) => {
  const colors = Colors[theme ?? "light"];
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.neutral.light.lightest,
    },
    contentContainer: {
      padding: 16,
    },
    memberContainer: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.neutral.light.light,
      borderRadius: 16,
      paddingHorizontal: 16,
      overflow: "hidden",
    },
    title: {
      fontSize: 14,
      fontWeight: "bold",
      color: colors.neutral.dark.darkest,
    },
    iconContainer: {
      borderRadius: 20,
      height: 40,
      width: 40,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.neutral.light.medium,
    },
    textContainer: {
      padding: 16,
      flex: 1,
      justifyContent: "center",
      rowGap: 4,
    },
    nameText: {
      fontSize: 14,
      fontWeight: "bold",
      color: colors.neutral.dark.darkest,
    },
    roleText: {
      fontSize: 12,
      color: colors.neutral.dark.light,
    },
  });
};
