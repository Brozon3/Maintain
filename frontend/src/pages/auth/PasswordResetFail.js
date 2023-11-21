import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import { Button } from "react-bootstrap";

export const PasswordResetFail = () => {
  const navigate = useNavigate();

  return (
    <Container className="container main">
      <h1 className="blue-header mb-3 p-3">Uh Oh!</h1>
      <p className="blue-secondary-header">Something went wrong. Please reset your password</p>
      <Container className="w-50 d-flex justify-content-center">
        <Button className="green-button my-2" onClick={() => navigate(-1)}>
          Try Again
        </Button>
      </Container>
    </Container>
  );
};
