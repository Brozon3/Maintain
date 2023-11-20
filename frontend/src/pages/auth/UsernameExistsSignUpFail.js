import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";

export const UsernameExistsSignUpFail = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate(`/loginPage`);
    }, 3000);
  }, [navigate]);

  return (
    <Container className="container main">
      <p>
        That username already exists. Please try again. If you've forgotten your
        password, select 'Forgot Password' on the log in page.
      </p>
    </Container>
  );
};
