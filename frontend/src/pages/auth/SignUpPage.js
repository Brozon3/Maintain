import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Container } from "react-bootstrap";
import axios from "axios";
import { useToken } from "../../auth/useToken.js";
import { PasswordRequirements } from "../../auth/PasswordRequirements.js";
import {
  RealTimeValidation,
  initialConditionsMet,
} from "../../auth/RealTimeValidation.js";

export const SignUpPage = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [, setToken] = useToken();
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [confirmPasswordValue, setConfirmPasswordValue] = useState("");
  const [conditionsMet, setConditionsMet] = useState(initialConditionsMet);

  const navigate = useNavigate();

  const onSignUpClicked = async () => {
    try {
      const response = await axios.post("/api/signup", {
        email: emailValue,
        password: passwordValue,
      });

      const { token } = response.data;
      setToken(token);
      navigate(`/pleaseVerify?email=${encodeURIComponent(emailValue)}`);
    } catch (error) {
      // Change to modal.
      if (error.response.data.error === "UsernameExistsException") {
        // set warning modal message instead.
        navigate("/usernameExistsSignUpFail");
      } else {
        console.error("Login error:", error);
      }
    }
  };

  const handlePasswordChange = (value, conditions) => {
    setPasswordValue(value);
    setConditionsMet(conditions);
  };

  return (
    <Container className="container main">
      <h1 className="mb-3 blue-header p-3"> Sign Up </h1>
      <Form className="container w-50 justify-content-center">
        {errorMessage && <div className="fail">{errorMessage}</div>}
        <Form.Group className="mb-3">
          <Form.Label className="blue-text" htmlFor="email">
            Your Email Address:{" "}
          </Form.Label>
          <Form.Control
            id="email"
            placeholder="email@example.com"
            value={emailValue}
            onChange={(e) => setEmailValue(e.target.value)}
          />
        </Form.Group>

        <RealTimeValidation
          passwordValue={passwordValue}
          onPasswordChange={handlePasswordChange}
        />

        <Form.Group className="mb-3">
          <Form.Label className="blue-text" htmlFor="confirm">
            Confirm Password:{" "}
          </Form.Label>
          <Form.Control
            id="confirm"
            type="password"
            placeholder="password"
            value={confirmPasswordValue}
            onChange={(e) => setConfirmPasswordValue(e.target.value)}
          />
        </Form.Group>
        <hr></hr>
        <PasswordRequirements conditionsMet={conditionsMet} />
        <hr></hr>

        <Button
          disabled={
            !emailValue ||
            !passwordValue ||
            passwordValue !== confirmPasswordValue
          }
          className="green-button mx-3"
          onClick={onSignUpClicked}
        >
          Sign Up
        </Button>

        <Button
          className="green-button mx-3"
          onClick={() => navigate("/loginPage")}
        >
          Have an account? Log in!
        </Button>
      </Form>
    </Container>
  );
};
