/* eslint-disable react/prop-types */
import { createContext, useContext, useState, useMemo } from "react";

const defaultValue = {
  message: "",
  notify: () => {},
};

const NotiContext = createContext(defaultValue);

export const NotiProvider = ({ children }) => {
  const [message, notify] = useState("");
  const value = useMemo(() => ({ message, notify }), [message]);
  return <NotiContext.Provider value={value}>{children}</NotiContext.Provider>;
};

export const useToast = () => {
  return useContext(NotiContext);
};
