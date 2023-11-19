import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";

export const EmailVerificationFail = () => {
  const navigate = useNavigate();

  return (
    <Container className="container main">
      <h1 className="p-3 blue-header">Uh Oh!</h1>
      <p>Something went wrong when verifying your email.</p>
      <button onClick={() => navigate("/loginPage")}>Go to home page</button>
    </Container>
  );
};
