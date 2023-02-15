module.exports = {
  preset: "react-native",
  setupFilesAfterEnv: [
    "./node_modules/react-native-gesture-handler/jestSetup.js",
    "./jest-setup.ts",
    "@testing-library/jest-native/extend-expect",
  ],
  setupFiles: ["./node_modules/react-native-gesture-handler/jestSetup.js"],
  transformIgnorePatterns: [
    "node_modules/(?!(jest-)?react-native|@react-native|@react-native-community|@react-navigation)",
    "node_modules/(?!@react-native|react-native)",
  ],
};
