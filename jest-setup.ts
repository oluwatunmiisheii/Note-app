/* eslint-disable no-undef, import/no-extraneous-dependencies */
import { configure } from "@testing-library/react-native";

// Import Jest Native matchers
import "@testing-library/jest-native/extend-expect";

// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
jest.mock("react-native/Libraries/Animated/NativeAnimatedHelper");

jest.mock("@expo/vector-icons", () => ({
  Ionicons: "IonIcon",
  AntDesign: "AntIcon",
  Feather: "FeatherIcon",
  FontAwesome: "FontAwesomeIcon",
}));

// Enable excluding hidden elements from the queries by default
configure({
  defaultIncludeHiddenElements: false,
});

// mock navigation from useNavigation
jest.mock("@react-navigation/native", () => ({
  ...jest.requireActual("@react-navigation/native"),
  useNavigation: () => ({
    navigate: jest.fn(),
    goBack: jest.fn(),
  }),
}));
