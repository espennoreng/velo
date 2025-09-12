import { Colors } from "@/constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { TouchableOpacity, useColorScheme } from "react-native";

export default function BackButtonInHeader() {
  const theme = useColorScheme() ?? "light";
  return (
	<TouchableOpacity
	  onPress={() => {
		router.back();
	  }}
	>
	  <Ionicons
		name="chevron-back"
		size={24}
		color={Colors[theme].highlight.darkest}
	  />
	</TouchableOpacity>
  );
};