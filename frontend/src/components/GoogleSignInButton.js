import React, { useEffect, useState } from "react";
import { GoogleLogin } from "react-google-login";
import axios from "axios";

export const GoogleSignInButton = () => {
  const [googleOauthUrl, setGoogleOauthUrl] = useState("");

  useEffect(() => {
    const loadOauthUrl = async () => {
      try {
        const response = await axios.get("/auth/google/url");
        const { url } = response.data;
        setGoogleOauthUrl(url);
      } catch (e) {
        console.log(e);
      }
    };
    loadOauthUrl();
  }, []);

  const onGoogleLoginSuccess = async (response) => {
    // Handle successful login, e.g., redirect to a new page or perform further actions
    console.log("Google login success:", response);
  };

  const onGoogleLoginFailure = (error) => {
    // Handle login failure
    console.error("Google login failure:", error);
  };

  return (
    <GoogleLogin
      clientId={process.env.GOOGLE_CLIENT_ID}
      buttonText="Sign in with Google"
      onSuccess={onGoogleLoginSuccess}
      onFailure={onGoogleLoginFailure}
      cookiePolicy="single_host_origin"
      render={(renderProps) => (
        <button
          className="gsi-material-button mx-3"
          onClick={renderProps.onClick}
          disabled={renderProps.disabled}
        >
          <div className="gsi-material-button-state"></div>
          <div className="gsi-material-button-content-wrapper">
            <div className="gsi-material-button-icon">Your Icon Here</div>
            <span className="gsi-material-button-contents">
              Sign in with Google
            </span>
            <span style={{ display: "none" }}>Sign in with Google</span>
          </div>
        </button>
      )}
    />
  );
};
