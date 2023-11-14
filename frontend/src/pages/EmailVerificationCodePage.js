import { useState } from "react";
import axios from "axios";
import { EmailVerificationSuccess } from "./EmailVerificationSuccess";
import { EmailVerificationFail } from "./EmailVerificationFail";
import { useToken } from "../auth/useToken";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

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
        <h1 className="mb-3 blue-header">Please Verify Your Email</h1>
        <p>
          You should have received a verification code at the email your
          provided. Please enter it here:
        </p>
        <input
          value={verificationString}
          onChange={(e) => setVerificationString(e.target.value)}
          placeholder="e.g. 123456"
        />
        <Button onClick={onSubmitVerificationString}>Submit</Button>
      </Container>
    </>
  );
};
