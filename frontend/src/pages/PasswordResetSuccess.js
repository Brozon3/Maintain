import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";

export const PasswordResetSuccess = () => {
  const navigate = useNavigate();

  return (
    <Container className="container main">
      <h1>Success!</h1>
      <p>Your password has been reset. Please login with your new password.</p>
      <button onClick={() => navigate("/login")}>Login</button>
    </Container>
  );
};
