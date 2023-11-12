import React from "react";
import { useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import { Button, Container } from "react-bootstrap";
// import { client } from "../client";
import { jwtDecode } from "jwt-decode";

// FROM A SEPERATE TUTORIAL> PROBABLY FOR DELETION

export const GoogleLoginPage = () => {
  const navigate = useNavigate();

  const responseGoogle = (response) => {
    const userObject = jwtDecode(response.credential);
    localStorage.setItem("user", JSON.stringify(userObject));
    const { name, sub, picture } = userObject;
    const doc = {
      _id: sub,
      _type: "user",
      userName: name,
      image: picture,
    };
    // client.createIfNotExists(doc).then(() => {
    //     navigate('/', { replace: true });
    //   });
  };

  return (
    <>
      <Container>
        <div className>
          <GoogleOAuthProvider clientId={process.env.GOOGLE_CLIENT_ID}>
            <GoogleLogin
              render={(renderProps) => {
                <Button
                  type="button"
                  className=""
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  <FcGoogle className="" /> Sign in with google
                </Button>;
              }}
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy="single_host_origin"
            />
          </GoogleOAuthProvider>
        </div>
      </Container>
    </>
  );
};
