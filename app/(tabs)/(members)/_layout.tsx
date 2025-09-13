import BackButtonInHeader from "@/components/BackButtonInHeader";
import { Colors } from "@/constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Link, Stack } from "expo-router";
import { TouchableOpacity, useColorScheme } from "react-native";

const AddMemberButton = () => {
  const theme = useColorScheme() ?? "light";
  const colors = Colors[theme ?? "light"];
  return (
    <Link
      href={{
        pathname: "/(tabs)/(members)/invite/invite",
        params: { inviteID: "new" },
      }}
      asChild
    >
      <TouchableOpacity style={{ marginRight: 16 }}>
        <Ionicons
          name="person-add"
          size={24}
          color={colors.highlight.darkest}
        />
      </TouchableOpacity>
    </Link>
  );
};

export default function MembersLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="members"
        options={{ title: "Members", headerRight: () => <AddMemberButton /> }}
      />
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
	  <Stack.Screen
		name="invite/invite"
		options={{
		  title: "Invite Member",
		  headerLeft: () => <BackButtonInHeader />,
		  presentation: "modal",
		}}
	  />
    </Stack>
  );
}
