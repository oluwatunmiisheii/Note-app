import React, {
  PropsWithChildren,
  useMemo,
  FC,
  createContext,
  useState,
} from "react";
import { OverlayLoader } from "@/components/Common/Loader/OverLayLoader/OverlayLoader";

interface GlobalContextProps {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const initialState = {
  loading: false,
  setLoading: () => {},
};

const GlobalContext = createContext<GlobalContextProps>(initialState);

const GlobalContextProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const values = useMemo(
    () => ({ loading, setLoading }),
    [loading, setLoading]
  );

  return (
    <GlobalContext.Provider value={values}>
      {children}
      {loading && <OverlayLoader />}
    </GlobalContext.Provider>
  );
};

function useGlobalContext() {
  const context = React.useContext(GlobalContext);
  if (context === undefined) {
    throw new Error(
      "useGlobalContext must be used within a GlobalContextProvider"
    );
  }
  return context;
}

export { GlobalContextProvider, useGlobalContext };
