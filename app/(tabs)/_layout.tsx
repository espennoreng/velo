import { Colors } from "@/constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";
import { Text, useColorScheme } from "react-native";

export default function TabLayout() {
  const theme = useColorScheme() ?? "light";

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          borderTopWidth: 0, // Removes the top border
          shadowOffset: { width: 0, height: 0 }, // Removes shadow for iOS
          elevation: 0, // Removes elevation for Android
        },
      }}
    >
      <Tabs.Screen
        name="(home)"
        options={{
          tabBarLabel: ({ focused, color }) => (
            <Text
              style={{
                color: focused ? Colors[theme].neutral.dark.darkest : color,
                fontSize: 10,
                fontWeight: focused ? "600" : "normal",
                marginTop: 6,
              }}
            >
              Home
            </Text>
          ),
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name="home"
              color={focused ? Colors[theme].highlight.darkest : color}
              size={24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="(members)"
        options={{
          tabBarLabel: ({ focused, color }) => (
            <Text
              style={{
                color: focused ? Colors[theme].neutral.dark.darkest : color,
                fontSize: 10,
                fontWeight: focused ? "600" : "normal",
                marginTop: 6,
              }}
            >
              Members
            </Text>
          ),
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name="people"
              color={focused ? Colors[theme].highlight.darkest : color}
              size={24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="(profile)/profile"
        options={{
          tabBarLabel: ({ focused, color }) => (
            <Text
              style={{
                color: focused ? Colors[theme].neutral.dark.darkest : color,
                fontSize: 10,
                fontWeight: focused ? "600" : "normal",
                marginTop: 6,
              }}
            >
              Profile
            </Text>
          ),
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name="person"
              color={focused ? Colors[theme].highlight.darkest : color}
              size={24}
            />
          ),
        }}
      />
    </Tabs>
  );
}
