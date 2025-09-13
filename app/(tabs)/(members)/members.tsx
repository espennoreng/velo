import { Colors } from "@/constants/Colors";
import {
	ColorSchemeName,
	StyleSheet,
	useColorScheme,
	View,
} from "react-native";

export default function MembersScreen() {
  const theme = useColorScheme() ?? "light";
  const styles = getStyles(theme);

  return <View style={styles.container}></View>;
}

const getStyles = (theme: ColorSchemeName) => {
  const colors = Colors[theme ?? "light"];
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.neutral.light.lightest,
    },
  });
};
