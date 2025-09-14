import BackButtonInHeader from "@/components/BackButtonInHeader";
import { Stack } from "expo-router";

export default function InspectionLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="[inspectionTypeID]"
		options={({ route }) => {
		  const inspectionTypeID =
			route.params && "inspectionTypeID" in route.params
			  ? route.params.inspectionTypeID
			  : "Details";
		  return {
			title: `Inspection ${inspectionTypeID}`,
			headerLeft: () => <BackButtonInHeader />,
		  };
		}}
      />
    </Stack>
  );
}
