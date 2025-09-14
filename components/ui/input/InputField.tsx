import { Colors } from "@/constants/Colors";
import {
    ColorSchemeName,
    StyleSheet,
    Text,
    TextInput,
    TextInputProps,
    useColorScheme,
    View,
} from "react-native";

type InputFieldProps = TextInputProps & {
  label?: string;
};

export default function InputField({ label, ...props }: InputFieldProps) {
  const theme = useColorScheme() ?? "light";
  const styles = getStyles(theme);
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        placeholderTextColor={Colors[theme].neutral.dark.light}
        {...props}
        style={styles.input}
      />
    </View>
  );
}

const getStyles = (theme: ColorSchemeName) => {
  const colors = Colors[theme ?? "light"];

  return StyleSheet.create({
    container: {
      width: "100%",
      flexDirection: "column",
      rowGap: 8,
    },
	label: {
		fontSize: 14,
		color: colors.neutral.dark.darkest,
		fontWeight: "500",
	},
    input: {
      color: colors.neutral.dark.darkest,
      backgroundColor: colors.neutral.light.light,
      borderRadius: 16,
      paddingHorizontal: 16,
      paddingVertical: 12,
    },
  });
};
