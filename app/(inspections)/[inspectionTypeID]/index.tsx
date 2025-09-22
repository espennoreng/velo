import { Colors } from "@/constants/Colors";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useEffect, useRef, useState } from "react";
import {
	Button,
	ColorSchemeName,
	FlatList,
	Image,
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
  const [images, setImages] = useState<string[]>([]);
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

  const handleRetake = () => {
    setActions((prev) => {
      const next = [...prev];
      if (next[step]) next[step].url = null;
      return next;
    });
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
        <Text>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <CameraView
        ref={cameraRef}
        style={styles.camera}
        facing="back"
        selectedLens={selectedLensIOS}
        autofocus="on"
        flash={flashMode}
        onCameraReady={handleCameraReady}
      />

      <View>
        <FlatList
          style={{ padding: 8 }}
          data={images}
          ItemSeparatorComponent={() => <View style={{ width: 8 }} />}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => console.log("Pressed image")}>
              <Image
                source={{ uri: item }}
                style={{ width: 100, height: 100 }}
              />
            </TouchableOpacity>
          )}
          horizontal
        />
      </View>

      <View
        style={{
          padding: 16,
          backgroundColor: colors.neutral.dark.darkest,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <TouchableOpacity onPress={takePhoto}>
          <Text style={{ color: colors.neutral.light.lightest }}
		  >Go back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: colors.neutral.dark.darkest,
            padding: 4,
            borderRadius: 50,
            borderWidth: 4,
            borderColor: colors.neutral.light.lightest,
          }}
          onPress={takePhoto}
        >
          <View
            style={{
              backgroundColor: colors.neutral.light.lightest,
              padding: 32,
              borderRadius: 50,
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={takePhoto}>
          <Text
            style={{ color: colors.neutral.light.lightest }}
          >Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const getStyles = (theme: ColorSchemeName) => {
  const colors = Colors[theme ?? "light"];
  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      backgroundColor: colors.neutral.dark.darkest,
    },
    camera: {
      flex: 1,
    },
  });
};
