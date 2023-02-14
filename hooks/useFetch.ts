import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";

type Dependencies = Parameters<typeof useCallback>[1];

export default function useFetch<T>(
  callback: (...args: any) => Promise<T>,
  dependencies: Dependencies
) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setLoading] = useState(false);

  useFocusEffect(
    useCallback(() => {
      let isMounted = true;
      const fetchData = async () => {
        setLoading(true);
        try {
          const data = await callback();
          setData(data);
        } catch (error) {
          setError(error as Error);
        } finally {
          setLoading(false);
        }
      };

      fetchData();

      return () => {
        isMounted = false;
      };
    }, dependencies)
  );

  return { data, error, isLoading, setData };
}
