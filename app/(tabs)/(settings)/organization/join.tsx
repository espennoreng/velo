import { Colors } from "@/constants/Colors";
import { ColorSchemeName, ScrollView, StyleSheet, Text, TouchableOpacity, useColorScheme, View } from "react-native";

const TEST_INVITES = [
  {
	id: "1",
	name: "Lillehammer Cykler",
  },
  {
	id: "2",
	name: "Lillehammer Liftutleie",
  },
  {
	id: "3",
	name: "Lillehammer Skisenter",
  },
];

export default function JoinOrganizationScreen() {
  const theme = useColorScheme() ?? "light";
  const styles = getStyles(theme);

  return (
	<ScrollView
	  style={styles.container}
	  contentContainerStyle={{ rowGap: 32, padding: 16 }}
	>
	  <View style={{ flex: 1, width: "100%", rowGap: 16 }}>
		<Text style={styles.title}>Invites</Text>
		{TEST_INVITES.map((org) => (
		  <View
			style={styles.inviteContainer}
			key={org.id}
		  >
			<Text style={styles.text}>{org.name}</Text>
			<TouchableOpacity style={styles.button}>
			  <Text style={styles.buttonText}>Join</Text>
			</TouchableOpacity>
		  </View>
		))}
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
	title: {
	  fontSize: 14,
	  fontWeight: "bold",
	  color: colors.neutral.dark.darkest,
	},
	inviteContainer: {
	  backgroundColor: colors.neutral.light.light,
	  padding: 16,
	  borderRadius: 16,
	  flexDirection: "row",
	  justifyContent: "space-between",
	  alignItems: "center",
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
	},
	text: {
	  color: colors.neutral.dark.darkest,
	  fontSize: 14,
	  fontWeight: "600",
	},
	buttonText: {
	  color: colors.highlight.darkest,
	  fontWeight: "600",
	  fontSize: 14,
	},
  });
};
