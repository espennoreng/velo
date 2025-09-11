import { Colors } from "@/constants/Colors";
import { InspectionType } from "@/types/inspectionType";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ColorSchemeName, StyleSheet, Text, TouchableOpacity, TouchableOpacityProps, useColorScheme, View } from "react-native";

type ListInspectionTypeProps = TouchableOpacityProps & {
  inspectionType: InspectionType;
};

export function ListInspectionType({ inspectionType, ...props }: ListInspectionTypeProps) {
  const theme = useColorScheme() ?? "light";
  const styles = getStyles(theme);

  return (
    <TouchableOpacity {...props}>
      <View style={styles.container}>
		<View style={styles.iconContainer}>
          <Ionicons
            name="list"
            size={20}
            color={Colors[theme].highlight.darkest}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.nameText}>{inspectionType.title}</Text>
          <Text style={styles.idText}>{inspectionType.description}</Text>
        </View>
        <Ionicons
          name="chevron-forward"
          size={16}
          color={Colors[theme].neutral.dark.lightest}
        />
      </View>
    </TouchableOpacity>
  );
}

const getStyles = (theme: ColorSchemeName) => {
  const colors = Colors[theme ?? "light"];

  return StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.neutral.light.light,
      borderRadius: 16,
	  paddingHorizontal: 16,
      overflow: "hidden",
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
    },
    nameText: {
      fontSize: 14,
      fontWeight: "bold",
      color: colors.neutral.dark.darkest,
      marginBottom: 4,
    },
    idText: {
      fontSize: 12,
      color: colors.neutral.dark.light,
    },
  });
};
