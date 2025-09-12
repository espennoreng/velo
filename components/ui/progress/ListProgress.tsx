import { Colors } from "@/constants/Colors";
import {
	ActivityIndicator,
	ColorSchemeName,
	StyleSheet,
	Text,
	TouchableOpacity,
	useColorScheme,
	View,
} from "react-native";

type ListProgressProps = {
  title: string;
  date: string;
  status: "in_progress" | "failed";
};

export default function ListProgress({
  title,
  date,
  status,
}: ListProgressProps) {
  const theme = useColorScheme() ?? "light";
  const styles = getStyles(theme);
  return (
    <View style={styles.progressContainer}>
      <View style={{ flexDirection: "column", rowGap: 4 }}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>
      {status === "failed" ? (
        <TouchableOpacity style={styles.retryButton}>
          <Text style={{ color: Colors[theme].highlight.darkest, fontWeight: "bold" }}>
            Retry
          </Text>
        </TouchableOpacity>
      ) : (
        <ActivityIndicator
          size="small"
          color={Colors[theme].highlight.darkest}
        />
      )}
    </View>
  );
}

const getStyles = (theme: ColorSchemeName) => {
  const colors = Colors[theme ?? "light"];
  return StyleSheet.create({
    progressContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 16,
      backgroundColor: colors.neutral.light.light,
      borderRadius: 16,
    },
    title: {
      fontSize: 14,
      fontWeight: "bold",
      color: colors.neutral.dark.darkest,
    },
    date: {
      fontSize: 12,
      fontWeight: "400",
      color: colors.neutral.dark.lightest,
    },
	retryButton: {
		padding: 8,
		borderRadius: 12,
		borderWidth: 1,
		borderColor: colors.highlight.darkest,
	},
  });
};
