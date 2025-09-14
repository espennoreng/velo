import { Colors } from "@/constants/Colors";
import {
	ColorSchemeName,
	StyleSheet,
	Text,
	TouchableOpacity,
	useColorScheme,
	View,
} from "react-native";

export default function InvitedMemberScreen() {
  const theme = useColorScheme() ?? "light";
  const styles = getStyles(theme);
  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Email: john@example.com</Text>
        <Text style={styles.label}>Invited by: espennoreng@gmail.com</Text>
		<Text style={styles.label}>Role: Member</Text>
		<Text style={styles.label}>Sent: 01.01.2024, 12:00</Text>
		<Text style={styles.label}>Expires: 01.02.2024, 12:00</Text>
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Delete Invite</Text>
      </TouchableOpacity>
    </View>
  );
}

const getStyles = (theme: ColorSchemeName) => {
  const colors = Colors[theme ?? "light"];
  return StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
	  rowGap: 32,
      backgroundColor: colors.neutral.light.lightest,
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
	infoContainer: {
		rowGap: 8,
		backgroundColor: colors.neutral.light.light,
		padding: 16,
		borderRadius: 16,
	},
	label: {
		fontSize: 14,
		color: colors.neutral.dark.darkest,
	}
	});
};
