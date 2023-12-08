import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import { Button } from "react-bootstrap";

export const PasswordResetSuccess = () => {
  const navigate = useNavigate();

  return (
    <Container className="container main" >
      <h1 className="blue-header mb-3 p-3">Success!</h1>
      <p className="blue-secondary-header">Your password has been reset. Please login with your new password.</p>
      <Button className="green-button mx-3" onClick={() => navigate("/loginPage")}>Login</Button>
    </Container>
  );
};
