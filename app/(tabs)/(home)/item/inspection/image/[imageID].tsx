import { useLocalSearchParams } from "expo-router";
import { Image } from "react-native";

export default function InspectionImageScreen() {
  const { imageID } = useLocalSearchParams<{ imageID: string }>();

  if (!imageID) {
	return <Image source={{ uri: "https://picsum.photos/500/800" }} style={{ width: "100%", height: "100%" }} resizeMode="contain" />;
  }
  
  return (
    <Image
      source={{ uri: `https://picsum.photos/500/800?imageID=${imageID}` }}
      style={{ width: "100%", height: "100%" }}
      resizeMode="contain"
    />
  );
}
