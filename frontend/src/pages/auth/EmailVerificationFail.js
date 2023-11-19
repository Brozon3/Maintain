import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import { Button } from "react-bootstrap";

export const EmailVerificationFail = () => {
  const navigate = useNavigate();

  return (
    <Container className="container main">
      <h1 className="p-3 blue-header">Uh Oh!</h1>
      <p className="blue-secondary-header">Something went wrong when verifying your email.</p>
      <Button className="green-button" onClick={() => navigate("/loginPage")}>Try Again</Button>
    </Container>
  );
};
