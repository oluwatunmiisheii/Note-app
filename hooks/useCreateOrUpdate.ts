import { Alert } from "react-native";
import { useGlobalContext } from "../context/Global.context";

interface CreateOrUpdateProps<T> {
  fn: (...args: any) => Promise<T>;
  args: any;
  successCb?: (payload: Awaited<T>) => void;
  errorCb?: (error: unknown) => void;
  successMessage?: string;
  errorMessage?: string;
}

export const useCreateOrUpdate = () => {
  const { setLoading } = useGlobalContext();

  const createOrUpdate = async <T>({
    fn,
    args,
    successCb,
    errorCb,
    successMessage,
    errorMessage,
  }: CreateOrUpdateProps<T>) => {
    setLoading(true);
    try {
      const res = await fn(...args);
      successMessage && Alert.alert("Success", successMessage);
      successCb?.(res);
    } catch (error) {
      errorMessage && Alert.alert("Error", errorMessage);
      errorCb?.(error);
      return error;
    } finally {
      setLoading(false);
    }
  };

  return createOrUpdate;
};
