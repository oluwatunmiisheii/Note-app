import { StyleSheet, Pressable, StyleProp, ViewStyle } from "react-native";
import colors from "../../../utils/constants/colors";

export enum Variant {
  primary = "primary",
  secondary = "secondary",
  plain = "plain",
}

interface ButtonProps extends React.ComponentProps<typeof Pressable> {
  variant?: keyof typeof Variant;
  circle?: boolean;
  customStyles?: StyleProp<ViewStyle>;
}

export const Button = (props: ButtonProps) => {
  const {
    variant = Variant.primary,
    circle,
    children,
    customStyles,
    disabled,
    ...rest
  } = props;
  const { button, buttonCircle } = styles;

  const buttonStyles = [button, styles[variant]];

  return (
    // add style when disabled
    <Pressable
      accessibilityRole="button"
      style={[buttonStyles, circle && buttonCircle, customStyles]}
      {...rest}
    >
      {children}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
    width: "auto",
    height: 60,
    borderRadius: 30,
  },
  buttonCircle: {
    width: 60,
    height: 60,
  },
  primary: {
    backgroundColor: colors.primary,
  },
  secondary: {
    backgroundColor: colors.secondary,
  },
  plain: {
    backgroundColor: "transparent",
  },
  disabled: {
    backgroundColor: colors.disabled,
    opacity: 0.5,
  },
});
