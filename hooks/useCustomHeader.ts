import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect } from "react";

type Args = {
  headerRight?: React.ReactNode;
  headerLeft?: React.ReactNode;
};

export default function useCustomHeader(args: Args) {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => args.headerRight,
      headerLeft: () => args.headerLeft,
    });
  }, [navigation]);
}
