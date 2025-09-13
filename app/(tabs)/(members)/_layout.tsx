import { Stack } from "expo-router";

export default function MembersLayout() {

	return (
		<Stack>
			<Stack.Screen
				name="members"
				options ={{ title: "Members" }}
				/>
		</Stack>
	);
}		