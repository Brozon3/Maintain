import { useState } from "react";
import axios from "axios";
import { EmailVerificationSuccess } from "./EmailVerificationSuccess";
import { EmailVerificationFail } from "./EmailVerificationFail";
import { useToken } from "../../auth/useToken";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { Form } from "react-bootstrap";

export const EmailVerificationCodePage = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFailure, setIsFailure] = useState(false);
  const [verificationString, setVerificationString] = useState("");

  const urlParams = new URLSearchParams(window.location.search);
  const email = urlParams.get("email");

  const [, setToken] = useToken();

  if (isSuccess) return <EmailVerificationSuccess />;
  if (isFailure) return <EmailVerificationFail />;

  const onSubmitVerificationString = async () => {
    try {
      const response = await axios.put("/api/verifyEmail", {
        email,
        verificationString,
      });
      const { token } = response.data;
      setToken(token);
      setIsSuccess(true);
    } catch (e) {
      setIsFailure(true);
    }
  };

  return (
    <>
      <Container className="container main">
        <h1 className="mb-3 p-3 blue-header">Please Verify Your Email</h1>
        <Form className="container w-50 justify-content-center">
          <p className="blue-secondary-header">
            You should have received a verification code at the email you
            provided.
          </p>
          <Form.Group>
            <Form.Label className="blue-text" htmlFor="verification">
              Verification Code:{" "}
            </Form.Label>
            <Form.Control
              value={verificationString}
              id="verification"
              onChange={(e) => setVerificationString(e.target.value)}
              placeholder="123456"
            />
          </Form.Group>
          <hr></hr>
          <Button
            onClick={onSubmitVerificationString}
            className="green-button mx-3"
          >
            Submit
          </Button>
        </Form>
      </Container>
    </>
  );
};
