import BackButtonInHeader from "@/components/BackButtonInHeader";
import { Stack } from "expo-router";

export default function HomeLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Home",
        }}
      />
      <Stack.Screen
        name="item/lastInspections"
        options={{
          title: "Last Inspections",
          headerLeft: () => <BackButtonInHeader />,
        }}
      />
      <Stack.Screen
        name="item/inspection/[inspectionID]"
        options={({ route }) => {
          const inspectionID =
            route.params && "inspectionID" in route.params
              ? route.params.inspectionID
              : "Details";

          return {
            title: `Inspection ${inspectionID}`,
            headerLeft: () => <BackButtonInHeader />,
          };
        }}
      />
      <Stack.Screen
        name="item/inspection/image/[imageID]"
        options={({ route }) => {
          const imageID =
            route.params && "imageID" in route.params
              ? route.params.imageID
              : "Details";

          return {
            title: `Image ${imageID}`,
            headerLeft: () => <BackButtonInHeader />,
          };
        }}
      />
      <Stack.Screen
        name="item/[itemID]"
        options={({ route }) => {
          // TODO: Swap with the Item name when we have a proper data source
          const itemID =
            route.params && "itemID" in route.params
              ? route.params.itemID
              : "Details";

          return {
            title: `Item ${itemID}`,
            headerLeft: () => <BackButtonInHeader />,
          };
        }}
      />
    </Stack>
  );
}
