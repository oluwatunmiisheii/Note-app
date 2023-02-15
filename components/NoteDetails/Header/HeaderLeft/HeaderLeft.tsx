import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";

export const HeaderLeft = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      accessibilityLabel="go to previous page"
    >
      <AntDesign
        name="arrowleft"
        color="white"
        size={22}
        style={{ marginRight: 20 }}
      />
    </TouchableOpacity>
  );
};
