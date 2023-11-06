import { useState, useEffect } from "react";
import { useToken } from "./useToken";

export const UseUser = () => {
  const [token] = useToken();

  const getPayloadFromToken = (token) => {
    const encodedPayload = token.split(".")[1];
    const returnValue = JSON.parse(atob(encodedPayload));
    console.log(returnValue);
    return returnValue;
  };

  const [user, setUser] = useState(() => {
    if (!token) return null;
    return getPayloadFromToken(token);
  });

  useEffect(() => {
    if (!token) {
      setUser(null);
    } else {
      setUser(getPayloadFromToken(token));
    }
  }, [token]);

  return user;
};
