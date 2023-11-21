import React from "react";

export const PasswordRequirements = ({ conditionsMet }) => {
  return (
    <>
      <p>Password Requirements</p>
      <ul className="noBulletsList">
        {conditionsMet.map((condition, index) => (
          <li key={index}>
            {condition.met} {condition.condition}
          </li>
        ))}
      </ul>
    </>
  );
};
