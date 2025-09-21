import { Colors } from "@/constants/Colors";
import { useRef, useState } from "react";
import {
	ColorSchemeName,
	FlatList,
	Image,
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	useColorScheme,
	View,
} from "react-native";

const fakeUrls = [
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1532009324734-20a7a5813719?auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1524429656589-6633a470097c?auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1530224264768-7ff8c1789d79?auto=format&fit=crop&w=800&q=60",
];

export default function SummaryScreen() {
  const theme = useColorScheme() ?? "light";
  const colors = Colors[theme];
  const styles = getStyles(theme);

  const scrollRef = useRef<ScrollView>(null);

  const [notes, setNotes] = useState("");
  return (
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={100} // adjust if you have a visible header
      >
        <ScrollView
          ref={scrollRef}
          style={styles.container}
          contentContainerStyle={{ rowGap: 32, paddingBottom: 32 }}
        >
          <View style={styles.headerContainer}>
            <Text style={styles.header}>Adhoc inspection</Text>
            <Text style={styles.text}>21. January 2025, 10:00 AM</Text>
            <Text style={styles.text}>123 Main St, Springfield, USA</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.subHeader}>Photos (4)</Text>
            <FlatList
              data={fakeUrls}
              keyExtractor={(item, index) => index.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{ rowGap: 16 }}
              contentContainerStyle={{ columnGap: 16 }}
              renderItem={({ item }) => (
                <Image
                  source={{ uri: item }}
                  style={{ width: 200, height: 300, borderRadius: 16 }}
                />
              )}
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.subHeader}>Order Number</Text>
            <TextInput
              placeholder="Enter order number..."
              placeholderTextColor={colors.neutral.dark.darkest}
              style={{
                borderWidth: 1,
                borderColor: colors.neutral.light.dark,
                borderRadius: 16,
                padding: 16,
                minHeight: 48,
                textAlignVertical: "top",
              }}
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.subHeader}>Notes</Text>
            <TextInput
              multiline
              placeholder="Add notes..."
              placeholderTextColor={colors.neutral.dark.darkest}
              style={{
                borderWidth: 1,
                borderColor: colors.neutral.light.dark,
                borderRadius: 16,
                padding: 16,
                minHeight: 120,
                textAlignVertical: "top",
                color: colors.neutral.dark.darkest,
              }}
              value={notes}
              onChangeText={setNotes}
              onFocus={() => {
                // Notes is last; scroll to end to keep it above the keyboard
                setTimeout(
                  () => scrollRef.current?.scrollToEnd({ animated: true }),
                  50
                );
              }}
              submitBehavior="blurAndSubmit"
              returnKeyType="default"
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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
    headerContainer: {
      rowGap: 8,
    },
    section: {
      rowGap: 8,
    },
    header: {
      fontSize: 24,
      fontWeight: "600",
      color: colors.neutral.dark.darkest,
    },
    subHeader: {
      fontSize: 16,
      fontWeight: "600",
      color: colors.neutral.dark.dark,
    },
    text: {
      fontSize: 14,
      color: colors.neutral.dark.darkest,
    },
  });
};
