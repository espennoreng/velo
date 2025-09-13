import BackButtonInHeader from "@/components/BackButtonInHeader";
import { Stack } from "expo-router";

export default function MembersLayout() {
  return (
    <Stack>
      <Stack.Screen name="members" options={{ title: "Members" }} />
      <Stack.Screen
        name="member/[memberID]"
        options={({ route }) => {
          const memberID =
            route.params && "memberID" in route.params
              ? route.params.memberID
              : "Details";

          return {
            title: `Member ${memberID}`,
            headerLeft: () => <BackButtonInHeader />,
          };
        }}
      />
	  <Stack.Screen
        name="invite/[inviteID]"
        options={({ route }) => {
          const inviteID =
            route.params && "inviteID" in route.params
              ? route.params.inviteID
              : "Details";

          return {
            title: `Invited Member ${inviteID}`,
            headerLeft: () => <BackButtonInHeader />,
          };
        }}
      />
    </Stack>
  );
}
