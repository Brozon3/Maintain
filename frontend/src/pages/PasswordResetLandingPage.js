import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { PasswordResetSuccess } from "./PasswordResetSuccess";
import { PasswordResetFail } from "./PasswordResetFail";
import Container from "react-bootstrap/Container";

export const PasswordResetLandingPage = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFailure, setIsFailure] = useState(false);
  const [passwordValue, setPasswordValue] = useState("");
  const [confirmPasswordValue, setConfirmPasswordValue] = useState("");
  // const { passwordResetCode } = useParams();

  const onResetClicked = async () => {
    try {
      await axios.put(``);
    } catch {}
  };

  if (isFailure) return <PasswordResetFail />;
  if (isSuccess) return <PasswordResetSuccess />;
  return (
    <>
      <Container className="text-center main">
        {/* Left empty as it will probably not be implemented. See 03_04 */}
      </Container>
    </>
  );
};
