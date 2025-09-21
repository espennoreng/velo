import { Colors } from "@/constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { CameraType, CameraView, useCameraPermissions } from "expo-camera";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
	Button,
	ColorSchemeName,
	FlatList,
	StyleSheet,
	Text,
	TouchableOpacity,
	useColorScheme,
	View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Action = {
  step: number;
  action: string;
  url: string | null;
};

const TEST_INSPECTION_ACTIONS: Action[] = [
  {
    step: 1,
    action: "Take photo of front of house",
    url: null,
  },
  { step: 2, action: "Take photo of back of house", url: null },
  { step: 3, action: "Take photo of roof", url: null },
  { step: 4, action: "Take photo of garage", url: null },
  { step: 5, action: "Take photo of driveway", url: null },
];

export default function CameraScreen() {
  const theme = useColorScheme() ?? "light";
  const colors = Colors[theme ?? "light"];
  const styles = getStyles(theme);
  const [facing, setFacing] = useState<CameraType>("back");
  const [pictureSizes, setPictureSizes] = useState<string[]>([]);
  const [images, setImages] = useState<string[]>([]);
  const [lensesIOS, setLensesIOS] = useState<string[]>([]);
  const [actions, setActions] = useState(TEST_INSPECTION_ACTIONS);
  const [flashMode, setFlashMode] = useState<"on" | "off" | "auto" | undefined>(
    undefined
  );
  const [selectedLensIOS, setSelectedLensIOS] = useState<string | undefined>(
    undefined
  );
  const [displayLenses, setDisplayLenses] = useState<
    { lens: string; zoom: string }[]
  >([]);
  const [step, setStep] = useState(0);
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);
  const listRef =
    useRef<FlatList<Action>>(null); /* Ref for FlatList to enable scrolling */

  const mapLensToZoomFactor: Record<string, string> = {
    "Back Camera": "1",
    "Back Dual Wide Camera": ".5",
    "Back Ultra Wide Camera": ".5",
  };

  useEffect(() => {
    listRef.current?.scrollToIndex({
      index: step,
      animated: true,
      viewPosition: 0.5, // center the item
    });
  }, [step, actions.length]);

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
      const updatedActions = [...actions];
      updatedActions[step].url = photo.uri;
      setActions(updatedActions);
      console.log("Photo taken:", photo.uri);
      // Move to the next step if there is one
      if (step < actions.length - 1) {
        setStep((prev) => prev + 1);
      }
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
        flash={flashMode}
        onCameraReady={handleCameraReady}
      />
      <SafeAreaView style={styles.topContainer}>
        <View style={styles.topContainerUpper}>
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
        </View>
        <View style={styles.topContainerLower}>
          <View style={styles.stepContainer}>
            <FlatList
              ref={listRef}
              style={{ height: 150 }} // fixed viewport helps centering
              showsVerticalScrollIndicator={false}
              ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
              data={actions}
              keyExtractor={(item) => item.step.toString()}
              renderItem={({ item }) => {
                const isActive = item.step === actions[step].step;
                return (
                  <TouchableOpacity
                    style={[
                      styles.stepButton,
                      {
                        opacity: isActive ? 1 : 0.5,
                      },
                    ]}
                    onPress={() => setStep(item.step - 1)}
                  >
                    <Text
                      style={[
                        styles.stepText,
                        { fontSize: isActive ? 18 : 14 },
                      ]}
                      numberOfLines={1}
                    >
                      {item.action}
                    </Text>
                    <Ionicons
                      name={item.url ? "checkmark-circle" : "ellipse-outline"}
                      size={16}
                      color={
                        item.url ? "limegreen" : colors.neutral.light.lightest
                      }
                      style={{ marginLeft: 8, marginTop: 2 }}
                    />
                  </TouchableOpacity>
                );
              }}
              onScrollToIndexFailed={(info) => {
                // Wait for measurement, then retry
                setTimeout(() => {
                  listRef.current?.scrollToIndex({
                    index: Math.min(info.index, actions.length - 1),
                    animated: true,
                    viewPosition: 0.5,
                  });
                }, 50);
              }}
            />
          </View>
          <View style={styles.centerTextContainer} />
        </View>
      </SafeAreaView>
      <SafeAreaView style={styles.bottomContainer}>
        {
          // If all actions have a url, show the finish button
		  actions.every((action) => action.url) && (
            <TouchableOpacity
			  style={{
				padding: 12,
				flexDirection: "row", alignItems: "center", gap: 8, backgroundColor: colors.highlight.darkest, borderRadius: 16 }}
              onPress={() => {
                // For now, just log the images and go back
                console.log("Inspection completed with images:", images);
                router.back();
              }}
            >
              <Text
                style={{
                  color: colors.neutral.light.lightest,
                  fontWeight: "600",
                  fontSize: 16,
                  borderRadius: 16,
                }}
              >
                Continue to summary
              </Text>
			  <Ionicons name="chevron-forward" size={16} color={colors.neutral.light.lightest}/>
            </TouchableOpacity>
          )
        }

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
    stepContainer: {
      padding: 16,
      borderRadius: 16,
      flexDirection: "column",
      justifyContent: "space-between",
      rowGap: 8,
    },
    stepButton: {
      padding: 12,
      borderRadius: 8,
      backgroundColor: "rgba(0,0,0,0.5)",
      justifyContent: "center",
      alignSelf: "flex-start",
      alignItems: "center",
      flexDirection: "row",
    },
    stepText: {
      fontWeight: "600",
      color: colors.neutral.light.lightest,
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

      paddingHorizontal: 16,
      paddingTop: 16,
      gap: 16,
    },
    topContainerUpper: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    topContainerLower: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
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
