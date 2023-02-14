import React, { PropsWithChildren, useMemo } from "react";
import { OverlayLoader } from "../components/Loader/OverlayLoader";

interface GlobalContextProps {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const initialState = {
  loading: false,
  setLoading: () => {},
};

const GlobalContext = React.createContext<GlobalContextProps>(initialState);

const GlobalContextProvider: React.FC<PropsWithChildren<{}>> = ({
  children,
}) => {
  const [loading, setLoading] = React.useState(false);

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
