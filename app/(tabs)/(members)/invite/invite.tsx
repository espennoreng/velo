import InputField from "@/components/ui/input/InputField";
import { Colors } from "@/constants/Colors";
import { ColorSchemeName, StyleSheet, Text, TouchableOpacity, useColorScheme, View } from "react-native";

export default function InviteScreen() {
	const theme = useColorScheme() ?? "light";
	const styles = getStyles(theme);
	return (
		<View style={styles.container}>
			<InputField
			 keyboardType="email-address"
			 label="Email" placeholder="Enter the email you want to invite" />
			<TouchableOpacity style={styles.button}>
				<Text style={styles.buttonText}>Send Invite</Text>
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
			backgroundColor: colors.neutral.light.lightest,
		},
		button: {
			marginTop: 16,
			paddingHorizontal: 16,
			paddingVertical: 12,
			backgroundColor: colors.highlight.darkest,
			borderRadius: 16,
			justifyContent: "center",
			alignItems: "center",
			width: "100%",
		},
		buttonText: {
			color: colors.neutral.light.lightest,
			fontWeight: "600",
			fontSize: 14,
		},
	}
	);
}