import {
  View,
  TextInput,
  StyleSheet,
  TextInputProps,
  ViewStyle,
  StyleProp,
  Text,
} from "react-native";
import colors from "@/utils/constants/colors";
import { InputError } from "../InputError/InputError";

interface InputProps extends TextInputProps {
  extraStyles?: StyleProp<ViewStyle>;
  label: string;
  error?: string;
}

export const Input = (props: InputProps) => {
  const inputStyles = [styles.input, props.multiline && styles.multiline];

  return (
    <View style={{ marginBottom: 20 }}>
      <Text style={styles.label}>{props.label}</Text>
      <View style={styles.container}>
        <TextInput
          style={[inputStyles, props.extraStyles]}
          accessibilityLabel="input"
          placeholderTextColor="#BDBDBD"
          {...props}
        />
      </View>
      {props.error && <InputError error={props.error} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F5F5F5",
    width: "100%",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    justifyContent: "space-between",
  },
  label: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 5,
    color: colors.gray,
  },
  input: {
    height: 50,
    fontSize: 18,
    fontWeight: "500",
    paddingHorizontal: 2,
    textAlignVertical: "top",
  },
  multiline: {
    height: 250,
  },
});
