import { Colors } from "@/constants/Colors";
import { ColorSchemeName, StyleSheet, Text, useColorScheme, View } from "react-native";

export default function CameraScreen() {
	const theme = useColorScheme() ?? "light";
	const styles = getStyles(theme);
  return (
	// Placeholder screen for starting an inspection
	<View style={styles.container}>
	  <Text style={styles.title}>Start Inspection</Text>
	  <Text style={styles.text}>This is where the inspection process begins.</Text>
	</View>
  );
}

const getStyles = (theme: ColorSchemeName) => {
	const colors = Colors[theme ?? "light"];
	return StyleSheet.create({
	  container: {
		flex: 1,
		backgroundColor: colors.neutral.light.lightest,
		alignItems: "center",
		justifyContent: "center",
		padding: 16,
	  },
	  title: {
		fontSize: 24,
		fontWeight: "bold",
		color: colors.neutral.dark.darkest,
		marginBottom: 16,
	  },
	  text: {
		fontSize: 16,
		color: colors.neutral.dark.dark,
		textAlign: "center",
	  },
	});
  }