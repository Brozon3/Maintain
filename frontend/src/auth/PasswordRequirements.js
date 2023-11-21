import React from "react";
import { useState } from "react";

export const PasswordRequirements = () => {
  const [characters, setCharacters] = useState(false);
  const [special, setSpecial] = useState(false);
  return (
    <>
      <h4>Password Requirements</h4>
      <ul>
        <li>At least 8 characters long</li>
        <li>Contain at least one special character</li>
        <li>Contain at least one uppercase letter</li>
        <li>Contain at least one number</li>
        <li>Contain at least one special character</li>
      </ul>
    </>
  );
};
