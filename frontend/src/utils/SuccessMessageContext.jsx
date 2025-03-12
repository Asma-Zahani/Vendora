/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useState } from "react";
import Alert from "@/components/Alert/Alert";

export const SuccessMessageContext = createContext();

export function SuccessMessageProvider({ children }) {
  const [successMessage, setSuccessMessage] = useState("");

  return (
    <SuccessMessageContext.Provider value={{ successMessage, setSuccessMessage }}>
      {children}
      {successMessage && <Alert successMessage={successMessage} setSuccessMessage={setSuccessMessage} />}
    </SuccessMessageContext.Provider>
  );
}
