import { Stack } from "expo-router";

export default function InspectionLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="[inspectionTypeID]"
        options={{ headerShown: false }}
      />
    </Stack>
  );
}
