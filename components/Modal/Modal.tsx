import { Ionicons } from "@expo/vector-icons";
import {
  ModalProps,
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Button } from "../Button/Button";

export const CustomModal = ({
  children,
  visible,
  onClose,
  title,
}: ModalProps & { onClose: () => void; title: string }) => {
  return visible ? (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ ...StyleSheet.absoluteFillObject }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1, justifyContent: "center", flexDirection: "column" }}
        >
          <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.content}>
                <View style={styles.header}>
                  <Text style={styles.title}>{title}</Text>
                  <Button onPress={onClose} variant="plain">
                    <Ionicons name="close" size={28} color="black" />
                  </Button>
                </View>
                {children}
              </View>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  ) : null;
};

const styles = StyleSheet.create({
  container: {
    margin: 0,
    paddingVertical: 0,
    width: "100%",
    backgroundColor: "white",
    shadowColor: "#fff",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    flex: 1,
  },
  content: {
    padding: 30,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
  },
});
