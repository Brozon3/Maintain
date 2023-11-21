import React, { createContext, useContext } from "react";

const GoogleOAuthContext = createContext();

export const GoogleOAuthProvider = ({ children }) => {
  return (
    <GoogleOAuthContext.Provider value={{}}>
      {children}
    </GoogleOAuthContext.Provider>
  );
};

export const useGoogleOAuth = () => {
  const context = useContext(GoogleOAuthContext);
  if (!context) {
    throw new Error("useGoogleOAuth must be used within GoogleOAuthProvider");
  }
  return context;
};
