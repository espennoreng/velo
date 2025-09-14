import { Colors } from "@/constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Link } from "expo-router";
import {
	ColorSchemeName,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	useColorScheme,
	View,
} from "react-native";

export default function SettingsScreen() {
  const theme = useColorScheme() ?? "light";
  const styles = getStyles(theme);
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ rowGap: 32, padding: 16 }}
    >
      <View style={{ flex: 1, width: "100%", rowGap: 16 }}>
        <Text style={styles.title}>Organization</Text>

        <Link href="/(tabs)/(settings)/organization/manage" asChild>
          <TouchableOpacity style={styles.linkButton}>
            <Text style={styles.linkButtonText}>Manage organization</Text>
            <Ionicons
              name="chevron-forward"
              size={20}
              color={Colors[theme ?? "light"].neutral.dark.lightest}
            />
          </TouchableOpacity>
        </Link>

        <Link href="/(tabs)/(settings)/organization/join" asChild>
          <TouchableOpacity style={styles.linkButton}>
            <Text style={styles.linkButtonText}>Join organization</Text>
            <Ionicons
              name="chevron-forward"
              size={20}
              color={Colors[theme ?? "light"].neutral.dark.lightest}
            />
          </TouchableOpacity>
        </Link>
      </View>

      <View style={{ flex: 1, width: "100%", rowGap: 16 }}>
        <Text style={styles.title}>Other</Text>

        <Link href="/" asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Contact the creator</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/" asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Delete account</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/" asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Sign out</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </ScrollView>
  );
}

const getStyles = (theme: ColorSchemeName) => {
  const colors = Colors[theme ?? "light"];
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.neutral.light.lightest,
    },
    text: {
      color: colors.neutral.dark.darkest,
      fontSize: 18,
    },
    title: {
      fontSize: 14,
      fontWeight: "bold",
      color: colors.neutral.dark.darkest,
    },
    linkButton: {
      backgroundColor: colors.neutral.light.light,
      padding: 16,
      borderRadius: 16,
      flexDirection: "row",
      alignItems: "center",
      columnGap: 8,
      justifyContent: "space-between",
    },
    linkButtonText: {
      fontSize: 14,
      color: colors.neutral.dark.darkest,
      fontWeight: "bold",
    },

	button: {
      paddingHorizontal: 16,
      paddingVertical: 12,
      backgroundColor: colors.neutral.light.lightest,
      borderRadius: 16,
      borderWidth: 1.5,
      borderColor: colors.highlight.darkest,
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
    },
    buttonText: {
      color: colors.highlight.darkest,
      fontWeight: "600",
      fontSize: 14,
    },
  });
};
