import BackButtonInHeader from "@/components/BackButtonInHeader";
import { Colors } from "@/constants/Colors";
import { router, Stack } from "expo-router";
import { Text, TouchableOpacity, useColorScheme } from "react-native";

export default function InspectionLayout() {
  const theme = useColorScheme() ?? "light";
  const colors = Colors[theme];
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="summary"
        options={{
          title: "Summary",
          headerRight: () => {
            return (
              <TouchableOpacity
                style={{
                  backgroundColor: colors.highlight.darkest,
				  paddingHorizontal: 16,
				  paddingVertical: 8,
				  justifyContent: "center",
				  alignItems: "center",
				  borderRadius: 16,
				}}
                onPress={() => {
                  router.back();
                }}
              >
                <Text
                  style={{
                    color: colors.neutral.light.lightest,
                    fontWeight: "600",
                    fontSize: 16,
                  }}
                >
                  Finish
                </Text>
              </TouchableOpacity>
            );
          },
          headerLeft: () => <BackButtonInHeader />,
        }}
      />
    </Stack>
  );
}
