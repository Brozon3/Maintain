import { useState } from "react";
import axios from "axios";
import { PasswordResetSuccess } from "./PasswordResetSuccess";
import { PasswordResetFail } from "./PasswordResetFail";
import Container from "react-bootstrap/Container";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";

export const PasswordResetLandingPage = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFailure, setIsFailure] = useState(false);
  const [passwordValue, setPasswordValue] = useState("");
  const [confirmPasswordValue, setConfirmPasswordValue] = useState("");
  const [passwordResetCode, setPasswordResetCode] = useState("");

  const urlParams = new URLSearchParams(window.location.search);
  const email = urlParams.get("email");

  const onResetClicked = async () => {
    try {
      await axios.put(`/api/users/${passwordResetCode}/reset-password`, {
        email,
        newPassword: passwordValue,
      });
      setIsSuccess(true);
    } catch (e) {
      setIsFailure(true);
    }
  };

  if (isFailure) return <PasswordResetFail />;
  if (isSuccess) return <PasswordResetSuccess />;
  return (
    <>
      <Container className="container main">
        <h1 className="blue-header mb-3 p-3">Reset Password</h1>
        <p className="blue-secondary-header">Please enter a new password</p>
        <Form className="container w-50 justify-content-center">
          <Form.Group>
            <Form.Label className="blue-text" htmlFor="code">
              Reset Code:{" "}
            </Form.Label>
            <Form.Control
              value={passwordResetCode}
              id="code"
              onChange={(e) => setPasswordResetCode(e.target.value)}
              placeholder="123456"
            />
          </Form.Group>

          <Form.Group>
            <Form.Label className="blue-text" htmlFor="password">
              New Password:{" "}
            </Form.Label>
            <Form.Control
              type="password"
              id="password"
              value={passwordValue}
              onChange={(e) => setPasswordValue(e.target.value)}
              placeholder="Password"
            />
          </Form.Group>

          <Form.Group>
            <Form.Label className="blue-text" htmlFor="confirm">
              Confirm Password:{" "}
            </Form.Label>
            <Form.Control
              type="password"
              id="confirm"
              value={confirmPasswordValue}
              onChange={(e) => setConfirmPasswordValue(e.target.value)}
              placeholder="Password"
            />
          </Form.Group>
          <hr></hr>
       
          <Button
            className="green-button mx-3"
            disabled={
              !passwordValue ||
              !confirmPasswordValue ||
              passwordValue !== confirmPasswordValue
            }
            onClick={onResetClicked}
          >
            Reset Password
          </Button>
        </Form>
      </Container>
    </>
  );
};
