import { useNavigate } from "react-router-dom";

export const PasswordResetSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="content-container">
      <h1>Success!</h1>
      <p>Your password has been reset. Please login with your new password.</p>
      <button onClick={() => navigate("/login")}>Login</button>
    </div>
  );
};
