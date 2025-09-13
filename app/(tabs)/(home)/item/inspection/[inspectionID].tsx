import { Colors } from "@/constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { FlashList } from "@shopify/flash-list";
import { Link } from "expo-router";
import {
	ColorSchemeName,
	Image,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	useColorScheme,
	View,
} from "react-native";

const TEST_IMAGES = [
  "https://picsum.photos/200/300",
  "https://picsum.photos/200/301",
  "https://picsum.photos/200/302",
  "https://picsum.photos/200/303",
  "https://picsum.photos/200/304",
  "https://picsum.photos/200/305",
  "https://picsum.photos/200/306",
  "https://picsum.photos/200/307",
  "https://picsum.photos/200/308",
  "https://picsum.photos/200/309",
];

export default function InspectionScreen() {
  const theme = useColorScheme() ?? "light";
  const styles = getStyles(theme);
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ rowGap: 32, padding: 16 }}
    >
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Adhoc Inspection</Text>
        <Text style={styles.headerInfoText}>21. Feb 2023, 10:00 AM</Text>
        <Text style={styles.headerInfoText}>Item ID: 123456</Text>
      </View>
      <View style={{ flex: 1, width: "100%", rowGap: 16 }}>
        <Text style={styles.title}>Images</Text>
        <FlashList
          data={TEST_IMAGES}
          renderItem={({ item }) => (
            <Link
              asChild
              href={{
                pathname: "/(tabs)/(home)/item/inspection/image/[imageID]",
                params: { imageID: item },
              }}
            >
              <TouchableOpacity>
                <Image
                  source={{ uri: item }}
                  style={styles.image}
                  resizeMode="cover"
                />
              </TouchableOpacity>
            </Link>
          )}
          keyExtractor={(item) => item}
          horizontal
          estimatedItemSize={200}
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
        />
      </View>
      <View style={{ flex: 1, width: "100%", rowGap: 16 }}>
        <Text style={styles.title}>Order number</Text>
        <View style={styles.tagContainer}>
          <Text style={styles.tagText}>123456</Text>
        </View>
      </View>
      <View style={{ flex: 1, width: "100%", rowGap: 16 }}>
        <Text style={styles.title}>Additional information</Text>
        <View style={styles.infoContainer}>
          <Text style={styles.additionalInfoText}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
          </Text>
        </View>
      </View>
      <View style={{ flex: 1, width: "100%", rowGap: 16 }}>
        <Text style={styles.title}>Location</Text>
        <TouchableOpacity
          style={styles.infoContainer}
          onPress={() => {
            // Open in maps
          }}
        >
          <View style={styles.iconContainer}>
            <Ionicons
              name="location-outline"
              size={16}
              color={Colors[theme].highlight.darkest}
            />
          </View>

          <Text style={styles.additionalInfoText}>
            59.92857527210882,10.762676003610913
          </Text>
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
    headerContainer: {
      flexDirection: "column",
      rowGap: 8,
    },
    headerText: {
      fontSize: 18,
      fontWeight: "bold",
      color: colors.neutral.dark.darkest,
    },
    headerInfoText: {
      fontSize: 14,
      color: colors.neutral.dark.light,
    },
    image: {
      width: 200,
      height: 300,
      borderRadius: 16,
    },
    title: {
      fontSize: 14,
      fontWeight: "bold",
      color: colors.neutral.dark.darkest,
    },
    infoContainer: {
      padding: 16,
      borderRadius: 16,
      backgroundColor: colors.neutral.light.light,
      flexDirection: "row",
      alignItems: "center",
      columnGap: 12,
    },
    additionalInfoText: {
      fontSize: 12,
      color: colors.neutral.dark.darkest,
      lineHeight: 18,
    },
    iconContainer: {
      borderRadius: 20,
      height: 32,
      width: 32,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.neutral.light.medium,
    },
    tagContainer: {
      paddingVertical: 8,
      paddingHorizontal: 12,
      borderRadius: 16,
      backgroundColor: colors.highlight.darkest,
      alignSelf: "flex-start",
    },
    tagText: {
      fontSize: 12,
      color: colors.neutral.light.lightest,
      fontWeight: "bold",
    },
  });
};
