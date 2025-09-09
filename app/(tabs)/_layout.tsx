import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";
import { Text } from "react-native";

// Text color: 1E1E1E
// color not active: 71727A
// active icon color: 006FFD

export default function TabLayout() {
  return (
    <Tabs screenOptions={{}}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarLabel: ({ focused, color }) => (
            <Text
              style={{
                color: focused ? "#1E1E1E" : color,
                fontSize: 12,
                fontWeight: focused ? "500" : "normal",
                marginTop: 4,
              }}
            >
              Home
            </Text>
          ),
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name="home"
              color={focused ? "#006FFD" : color}
              size={24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="members"
        options={{
          title: "Members",
          tabBarLabel: ({ focused, color }) => (
            <Text
              style={{
                color: focused ? "#1E1E1E" : color,
                fontSize: 12,
                fontWeight: focused ? "500" : "normal",
                marginTop: 4,
              }}
            >
              Members
            </Text>
          ),
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name="people"
              color={focused ? "#006FFD" : color}
              size={24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarLabel: ({ focused, color }) => (
            <Text
              style={{
                color: focused ? "#1E1E1E" : color,
                fontSize: 12,
                fontWeight: focused ? "500" : "normal",
                marginTop: 4,
              }}
            >
              Profile
            </Text>
          ),
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name="person"
              color={focused ? "#006FFD" : color}
              size={24}
            />
          ),
        }}
      />
    </Tabs>
  );
}
