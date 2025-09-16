import { Colors } from "@/constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { CameraType, CameraView, useCameraPermissions } from "expo-camera";
import { router } from "expo-router";
import { useRef, useState } from "react";
import {
	Button,
	ColorSchemeName,
	StyleSheet,
	Text,
	TouchableOpacity,
	useColorScheme,
	View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const TEST_INSPECTION_ACTIONS = [
  { step: 1, action: "Take photo of front of house" },
  { step: 2, action: "Take photo of back of house" },
  { step: 3, action: "Take photo of roof" },
  { step: 4, action: "Take photo of garage" },
  { step: 5, action: "Take photo of driveway" },
];

export default function CameraScreen() {
  const theme = useColorScheme() ?? "light";
  const colors = Colors[theme ?? "light"];
  const styles = getStyles(theme);
  const [facing, setFacing] = useState<CameraType>("back");
  const [pictureSizes, setPictureSizes] = useState<string[]>([]);
  const [images, setImages] = useState<string[]>([]);
  const [lensesIOS, setLensesIOS] = useState<string[]>([]);
  const [flashMode, setFlashMode] = useState<string | undefined>(undefined);
  const [selectedLensIOS, setSelectedLensIOS] = useState<string | undefined>(
    undefined
  );
  const [displayLenses, setDisplayLenses] = useState<
    { lens: string; zoom: string }[]
  >([]);
  const [step, setStep] = useState(0);
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);

  const mapLensToZoomFactor: Record<string, string> = {
    "Back Camera": "1",
    "Back Dual Wide Camera": ".5",
    "Back Ultra Wide Camera": ".5",
  };

  const handleCameraReady = async () => {
    if (cameraRef.current) {
      const availableLenses = await cameraRef.current.getAvailableLensesAsync();

      const seenZooms = new Set<string>();
      const uniqueDisplayLenses: { lens: string; zoom: string }[] = [];

      // Filter for unique zoom factors
      for (const lens of availableLenses) {
        const zoom = mapLensToZoomFactor[lens];
        if (zoom && !seenZooms.has(zoom)) {
          seenZooms.add(zoom);
          uniqueDisplayLenses.push({ lens: lens, zoom: zoom });
        }
      }

      setDisplayLenses(uniqueDisplayLenses);

      // Set an initial selected lens if not already set
      if (availableLenses.length > 0) {
        setSelectedLensIOS(availableLenses[0]);
      }
    }
  };

  const takePhoto = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      setImages((prev) => [...prev, photo.uri]);
    }
  };

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView
        ref={cameraRef}
        style={styles.camera}
        facing={facing}
        selectedLens={selectedLensIOS}
        autofocus="on"
        onCameraReady={handleCameraReady}
      />
      <SafeAreaView style={styles.topContainer}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons
            name="arrow-back"
            size={24}
            color={colors.neutral.light.lightest}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setFlashMode((prev) =>
              prev === "on" ? "off" : prev === "off" ? "auto" : "on"
            );
          }}
        >
          {flashMode === "on" ? (
            <Ionicons
              name="flash"
              size={24}
              color={colors.neutral.light.lightest}
            />
          ) : flashMode === "off" ? (
            <Ionicons
              name="flash-off"
              size={24}
              color={colors.neutral.light.lightest}
            />
          ) : (
            <View>
              <Ionicons
                name="flash"
                size={24}
                color={colors.neutral.light.lightest}
              />
              <Text
                style={{
                  position: "absolute",
                  bottom: -2,
                  right: -2,
                  fontSize: 10,
                  color: colors.neutral.light.lightest,
                  fontWeight: "600",
                }}
              >
                A
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </SafeAreaView>
      <SafeAreaView style={styles.bottomContainer}>
        <View style={styles.lensSelectorContainer}>
          {displayLenses.map(({ lens, zoom }) => {
            // Check if the current selected lens's zoom matches this button's zoom
            const isSelected = mapLensToZoomFactor[selectedLensIOS!] === zoom;

            return (
              <TouchableOpacity
                key={lens} // Use the unique lens name for the key
                style={[
                  isSelected ? styles.lensButtonSelected : {},
                  styles.lensButton,
                ]}
                onPress={() => setSelectedLensIOS(lens)}
              >
                <Text
                  style={
                    isSelected ? styles.selectedButton : styles.lensButtonText
                  }
                >
                  {isSelected ? zoom + "x" : zoom}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
        <TouchableOpacity style={styles.button} onPress={takePhoto} />
      </SafeAreaView>
    </View>
  );
}

const getStyles = (theme: ColorSchemeName) => {
  const colors = Colors[theme ?? "light"];
  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
    },
    message: {
      textAlign: "center",
      paddingBottom: 10,
    },
    camera: {
      flex: 1,
    },
    centerTextContainer: {
      position: "absolute",
      top: 16,
      left: 0,
      right: 0,
      alignItems: "center",
      paddingHorizontal: 40,
    },
    centerText: {
      color: colors.neutral.light.lightest,
      fontWeight: "600",
      textAlign: "center",
    },
    buttonContainer: {
      position: "absolute",
      bottom: 64,
      flexDirection: "row",
      backgroundColor: "transparent",
      width: "100%",
      paddingHorizontal: 64,
    },
    button: {
      flex: 1,
      width: 80,
      height: 80,
      borderRadius: 40,
      borderWidth: 6,
      borderColor: colors.neutral.light.lightest,
    },
    text: {
      fontSize: 24,
      fontWeight: "bold",
      color: "white",
    },
    topContainer: {
      position: "absolute",
      top: 0,
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 16,
      paddingTop: 16,
      gap: 16,
    },
    bottomContainer: {
      position: "absolute",
      bottom: 0,
      width: "100%",
      alignItems: "center",
      gap: 16,
    },
    lensSelectorContainer: {
      position: "relative",
      alignSelf: "center",
      flexDirection: "row",
      backgroundColor: "rgba(0,0,0,0.5)",
      borderRadius: 20,
      padding: 1.5,
      borderWidth: 0.2,
      borderColor: "rgba(255,255,255,0.2)",
      columnGap: 8,
    },
    lensButton: {
      width: 32,
      height: 32,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 20,
    },
    lensButtonSelected: {
      backgroundColor: colors.highlight.darkest,
    },
    lensButtonText: {
      fontSize: 10,
      fontWeight: "600",
      color: colors.neutral.light.lightest,
    },
    selectedButton: {
      fontWeight: "600",
      fontSize: 12,
      color: colors.neutral.light.lightest,
    },
  });
};
