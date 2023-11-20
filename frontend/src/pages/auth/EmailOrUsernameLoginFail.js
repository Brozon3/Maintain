import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";

export const PleaseVerifyEmailPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate(`/loginPage`);
    }, 3000);
  }, [navigate]);

  return (
    <Container className="container main">
      <p>The username or password provided is incorrect. Please try again.</p>
    </Container>
  );
};
