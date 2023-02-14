import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";

const bottomSheetHeight = Dimensions.get("window").height * 0.7;
const deviceWidth = Dimensions.get("window").width;

interface BottomSheetProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  children: React.ReactNode;
}

export const BottomSheet = ({
  isOpen,
  setIsOpen,
  children,
}: BottomSheetProps) => {
  return isOpen ? (
    <>
      <TouchableWithoutFeedback onPress={() => setIsOpen(false)}>
        <View
          style={{
            ...StyleSheet.absoluteFillObject,
            backgroundColor: "rgba(0,0,0,0.8)",
          }}
        />
      </TouchableWithoutFeedback>
      <View style={styles.bottomSheet}>
        <View style={styles.expandableLine} />
        <View style={styles.bottomSheetContent}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View>{children}</View>
          </ScrollView>
        </View>
      </View>
    </>
  ) : null;
};

const styles = StyleSheet.create({
  bottomSheet: {
    backgroundColor: "white",
    position: "absolute",
    right: 0,
    left: 0,
    bottom: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    zIndex: 2,
    height: "auto",
    width: deviceWidth,
    maxHeight: bottomSheetHeight,
  },
  bottomSheetContent: {
    paddingVertical: 30,
    width: "100%",
    flex: 1,
    position: "relative",
  },
  bottomSheetTitle: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 30,
  },
  expandableLine: {
    width: 50,
    height: 5,
    backgroundColor: "grey",
    borderRadius: 10,
    alignSelf: "center",
    marginTop: 10,
  },
});
