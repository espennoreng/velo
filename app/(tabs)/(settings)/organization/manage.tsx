import { Colors } from "@/constants/Colors";
import { useState } from "react";
import {
	ColorSchemeName,
	ScrollView,
	StyleSheet,
	Switch,
	Text,
	TouchableOpacity,
	useColorScheme,
	View,
} from "react-native";

const TEST_ORGANIZATIONS = [
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

export default function ManageOrganizationScreen() {
  const theme = useColorScheme() ?? "light";
  const styles = getStyles(theme);
  const colors = Colors[theme ?? "light"];
  const [isEnabled, setIsEnabled] = useState<number>(1);
  const [isAdmin, setIsAdmin] = useState<boolean>(true);
  const toggleSwitch = (id: number) => {
    setIsEnabled(id);
  };
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ rowGap: 32, padding: 16 }}
    >
      <View style={{ flex: 1, width: "100%", rowGap: 16 }}>
        <Text style={styles.title}>Active organization</Text>

        {TEST_ORGANIZATIONS.map((org) => (
          <TouchableOpacity
            style={styles.checkbox}
            onPress={() => toggleSwitch(parseInt(org.id))}
            key={org.id}
          >
            <Text style={styles.checkboxText}>{org.name}</Text>
            <Switch
              trackColor={{
                false: colors.neutral.light.dark,
                true: colors.highlight.darkest,
              }}
              thumbColor={
                isEnabled
                  ? colors.highlight.lightest
                  : colors.neutral.light.lightest
              }
              ios_backgroundColor={colors.neutral.light.dark}
              onValueChange={() => toggleSwitch(parseInt(org.id))}
              value={isEnabled === parseInt(org.id)}
            />
          </TouchableOpacity>
        ))}
      </View>

      {isAdmin && (
        <View style={{ flex: 1, width: "100%", rowGap: 16 }}>
          <Text style={styles.title}>Change organization</Text>

          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Leave organization</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Delete organization</Text>
          </TouchableOpacity>
        </View>
      )}
      <View style={{ flex: 1, width: "100%", rowGap: 16 }}>
        <Text style={styles.title}>Other</Text>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Create new organization</Text>
        </TouchableOpacity>
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
    checkbox: {
      backgroundColor: colors.neutral.light.light,
      padding: 16,
      borderRadius: 16,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    checkboxText: {
      color: colors.neutral.dark.darkest,
      fontSize: 14,
      fontWeight: "600",
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
