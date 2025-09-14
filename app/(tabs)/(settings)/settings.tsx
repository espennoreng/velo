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
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Manage organization</Text>
            <Ionicons
              name="chevron-forward"
              size={20}
              color={Colors[theme ?? "light"].neutral.dark.lightest}
            />
          </TouchableOpacity>
        </Link>

        <Link href="/(tabs)/(settings)/organization/join" asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Join organization</Text>
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
            <Ionicons
              name="mail-outline"
              size={20}
              color={Colors[theme ?? "light"].neutral.dark.lightest}
            />
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
    button: {
      backgroundColor: colors.neutral.light.light,
      padding: 16,
      borderRadius: 12,
      flexDirection: "row",
      alignItems: "center",
      columnGap: 8,
      justifyContent: "space-between",
    },
    buttonText: {
      fontSize: 14,
      color: colors.neutral.dark.darkest,
      fontWeight: "bold",
    },
  });
};
