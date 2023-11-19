import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import { Button } from "react-bootstrap";

export const PasswordResetFail = () => {
  const navigate = useNavigate();

  return (
    <Container className="container main">
      <h1 className="blue-header mb-3 p-3">Uh Oh!</h1>
      <p className="blue-secondary-header">Something went wrong. Please reset your password</p>
      <Button className="green-button mx-3" onClick={() => navigate("/loginPage")}>
        Reset your password.
      </Button>
    </Container>
  );
};
