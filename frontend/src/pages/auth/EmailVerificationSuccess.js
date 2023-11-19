import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";

export const EmailVerificationSuccess = () => {
  const navigate = useNavigate();

  return (
    <Container className="container main">
      <h1 className="p-3 blue-header">Success!</h1>
      <p>
        Thanks for verifying your email, now you can use all the app's features.
      </p>
      <button onClick={() => navigate("/")}>Go to home page</button>
    </Container>
  );
};
