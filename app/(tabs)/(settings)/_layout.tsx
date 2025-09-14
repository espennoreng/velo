import BackButtonInHeader from "@/components/BackButtonInHeader";
import { Stack } from "expo-router";

export default function SettingsLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="settings"
        options={{
          title: "Settings",
        }}
      />
	  <Stack.Screen
	  	name="organization/join"
		options={{
		  title: "Join Organization",
		  headerLeft: () => <BackButtonInHeader />,
		}}
	  />
	  <Stack.Screen
	  	name="organization/manage"
		options={{
		  title: "Manage Organization",
		  headerLeft: () => <BackButtonInHeader />,
		}}
	  />
    </Stack>
  );
}
