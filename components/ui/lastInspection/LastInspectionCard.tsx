import { Colors } from "@/constants/Colors";
import { LastInspection } from "@/types/lastInspection";
import {
    ColorSchemeName,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableOpacityProps,
    useColorScheme,
    View,
} from "react-native";

type LastInspectionCardProps = TouchableOpacityProps & {
  lastInspection: LastInspection;
  fullWidth?: boolean;
};

export default function LastInspectionCard({
  lastInspection,
  fullWidth = false,
  ...props
}: LastInspectionCardProps) {
  const theme = useColorScheme() ?? "light";
  const styles = getStyles(theme, fullWidth);

  return (
    <TouchableOpacity {...props}>
      <View style={styles.cardContainer}>
		<View style={styles.imageContainer}>
			<Image
				source={{ uri: lastInspection.imageUrl }}
				style={styles.image}
				resizeMode="cover"
			/>
			<View style={styles.tagContainer}>
				<Text style={styles.tagText}>{lastInspection.date}</Text>
			</View>
		</View>
        <View
          style={styles.textContainer}
        >
          <Text style={styles.inspectionTypeName}>{lastInspection.title}</Text>
          <Text style={styles.inspectionTypeDescription}>{lastInspection.inspector}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const getStyles = (theme: ColorSchemeName, fullWidth: boolean) => {
  const colors = Colors[theme ?? "light"];
  return StyleSheet.create({
    cardContainer: {
      width: fullWidth ? "100%" : 250,
      backgroundColor: colors.neutral.light.light,
      borderRadius: 16,
    },
	imageContainer: {
		height: fullWidth ? 180 : 120,
		borderTopLeftRadius: 16,
		borderTopRightRadius: 16,
		width: "100%",
		overflow: "hidden",
	},
	image: {
		width: "100%",
		height: "100%"
	},
	textContainer: {
		flexDirection: "column",
		rowGap: 4,
		padding: 16,
	},
	inspectionTypeName: {
		fontSize: 14,
		fontWeight: "bold",
		color: colors.neutral.dark.darkest,
	},
	inspectionTypeDescription: {
		fontSize: 12,
		color: colors.neutral.dark.light,
	},
	tagContainer: {
		position: "absolute",
		backgroundColor: colors.highlight.darkest,
		borderRadius: 16,
		paddingHorizontal: 10,
		paddingVertical: 4,
		top: 16,
		right: 16,
	},
	tagText: {
		fontSize: 10,
		fontWeight: "bold",
		color: colors.neutral.light.lightest
	},
  })
};
