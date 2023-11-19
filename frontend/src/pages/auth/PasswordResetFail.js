import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";

export const PasswordResetFail = () => {
  const navigate = useNavigate();

  return (
    <Container className="container main">
      <h1>Uh Oh!</h1>
      <p>Something went wrong. Please reset your password</p>
      <button onClick={() => navigate("/loginPage")}>
        Reset your password.
      </button>
    </Container>
  );
};
