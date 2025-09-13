import { Colors } from "@/constants/Colors";
import { Dimensions, Image, useColorScheme, View } from "react-native";
import { SnapbackZoom } from "react-native-zoom-toolkit";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export default function InspectionImageScreen() {
	const theme = useColorScheme() ?? "light";
  const resizeConfig = {
    size: { width: screenWidth, height: screenHeight },
    aspectRatio: screenWidth / screenHeight,
    scale: 1,
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: Colors[theme].neutral.light.lightest }}>
      <SnapbackZoom resizeConfig={resizeConfig}>
        <Image
          source={{
            uri: "https://superioraccesshire.com.au/cdn/shop/products/DuctLifter_2.jpg?v=1671024439&width=1445",
          }}
          style={{ width: "100%", height: "100%" }}
          resizeMode="contain"
        />
      </SnapbackZoom>
    </View>
  );
}
