import { Colors } from "@/constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ColorSchemeName, StyleSheet, TextInput, useColorScheme, View } from "react-native";

type SearchBoxProps = {
  placeholder?: string;
  onSearch: (query: string) => void;
};

export function SearchBox({ placeholder = "Search...", onSearch }: SearchBoxProps) {
	const theme = useColorScheme() ?? "light";
	const styles = getStyles(theme);

  return (
	<View style={styles.container}>
		<Ionicons name="search" size={20} color={Colors[theme].neutral.dark.light} />
		<TextInput
		  placeholderTextColor={Colors[theme].neutral.dark.light}
		  placeholder={placeholder}
		  onSubmitEditing={(event) => onSearch(event.nativeEvent.text)}
		  style={styles.input}
		/>
	</View>
  );
}

const getStyles = (theme: ColorSchemeName) => {
  const colors = Colors[theme ?? "light"];

  return StyleSheet.create({
	container: {
		width: '100%',
		backgroundColor: colors.neutral.light.light,
		paddingHorizontal: 16,
		overflow: 'hidden',
		borderRadius: 24,
		flexDirection: 'row',
		columnGap: 12,
		alignItems: 'center',
	},
	input: {
		flex: 1,
		fontSize: 14,
		paddingVertical: 16,
		color: colors.neutral.dark.darkest,
	},
  });
}