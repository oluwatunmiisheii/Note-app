import { PropsWithChildren } from "react";
import { GlobalContextProvider } from "../Global.context";

export const Providers: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  return <GlobalContextProvider>{children}</GlobalContextProvider>;
};
