import { Colors } from "@/constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router, Stack } from "expo-router";
import { TouchableOpacity, useColorScheme } from "react-native";

export default function HomeLayout() {
  const theme = useColorScheme() ?? "light";
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Home",
        }}
      />
      <Stack.Screen
        name="item/[itemID]"
        options={{
          headerLeft: () => {
            return (
                <TouchableOpacity onPress={() => {router.back()}}>
                  <Ionicons
                    name="chevron-back"
                    size={24}
                    color={Colors[theme].highlight.darkest}
                  />
                </TouchableOpacity>
            );
          },
        }}
      />
    </Stack>
  );
}
