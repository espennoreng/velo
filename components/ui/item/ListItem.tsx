import { Colors } from "@/constants/Colors";
import { Item } from "@/types/item";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
	ColorSchemeName,
	StyleSheet,
	Text,
	TouchableOpacity,
	useColorScheme,
	View
} from "react-native";

type ListItemProps = {
  item: Item;
  onPress: () => void;
};

export function ListItem({ item, onPress }: ListItemProps) {
  const theme = useColorScheme() ?? "light";
  const styles = getStyles(theme);

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.iconContainer}>
          <Ionicons name="image" size={32} color={Colors[theme].highlight.light} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.nameText}>{item.title}</Text>
        <Text style={styles.idText}>{item.description}</Text>
      </View>
	  <Ionicons name="chevron-forward" size={24} color={Colors[theme].neutral.dark.lightest} style={{ padding: 16 }} />
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
	  overflow: 'hidden',
    },
    iconContainer: {
      height: 70,
	  width: 80,
      backgroundColor: colors.highlight.lightest,
      justifyContent: "center",
      alignItems: "center",
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
