import { Colors } from "@/constants/Colors";
import { Checkbox } from "expo-checkbox";
import { useState } from "react";
import {
    ColorSchemeName,
    StyleSheet,
    Text,
    TouchableOpacity,
    useColorScheme,
    View,
} from "react-native";

export default function MemberScreen() {
  const theme = useColorScheme() ?? "light";
  const styles = getStyles(theme);

  const [isAdminChecked, setAdminChecked] = useState(false);
  const [isMemberChecked, setMemberChecked] = useState(true);
  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>Permissions</Text>
        <TouchableOpacity
          style={styles.permissionItemContainer}
          onPress={() => setAdminChecked(!isAdminChecked)}
        >
          <View style={styles.permissionItem}>
            <Text style={styles.permissionTitle}>Admin</Text>
            <Text style={styles.permissionDescription}>
              Gives the user permission to add members, remove members, delete
              inspections and delete the organization
            </Text>
          </View>
          <Checkbox
            style={styles.checkbox}
            value={isAdminChecked}
            onValueChange={setAdminChecked}
            color={isAdminChecked ? Colors[theme].highlight.darkest : undefined}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>Other</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Remove user from organization</Text>
        </TouchableOpacity>
      </View>
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
    title: {
      fontSize: 14,
      fontWeight: "bold",
      color: colors.neutral.dark.darkest,
    },
    infoContainer: {
      rowGap: 16,
    },
    permissionItemContainer: {
      columnGap: 16,
      backgroundColor: colors.neutral.light.light,
      padding: 16,
      borderRadius: 16,
      flexDirection: "row",
      alignItems: "center",
    },
    permissionItem: {
      flex: 1,
      rowGap: 4,
    },
    permissionTitle: {
      fontSize: 14,
      color: colors.neutral.dark.darkest,
      fontWeight: "600",
    },
    permissionDescription: {
      fontSize: 12,
      color: colors.neutral.dark.light,
    },
    checkbox: {
      height: 24,
      width: 24,
      borderRadius: 6,
    },
  });
};
