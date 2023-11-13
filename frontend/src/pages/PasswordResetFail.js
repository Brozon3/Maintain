import { useNavigate } from "react-router-dom";

export const PasswordResetFail = () => {
  const navigate = useNavigate();

  return (
    <div className="content-container">
      <h1>Uh Oh!</h1>
      <p>Something went wrong. Please reset your password</p>
      <button onClick={() => navigate("/loginPage")}>
        Reset your password.
      </button>
    </div>
  );
};
