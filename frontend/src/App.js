import { NavBar } from "./components/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DisplayProperties } from "./pages/ViewProperties";
import { Footer } from "./components/Footer";
import { AddProperty } from "./pages/AddProperty";
import "./index.css";
import { AddTask } from "./pages/AddTask";
import { useState } from "react";
import { PrivateRoute } from "./auth/PrivateRoute";
import { LoginPage } from "./pages/auth/LoginPage";
import { PleaseVerifyEmailPage } from "./pages/auth/PleaseVerifyEmailPage";
import { SignUpPage } from "./pages/auth/SignUpPage";
import { HomePage } from "./pages/HomePage";
import { ForgotPasswordPage } from "./pages/auth/ForgotPasswordPage";
import { PasswordResetLandingPage } from "./pages/auth/PasswordResetLandingPage";
import { EmailVerificationCodePage } from "./pages/auth/EmailVerificationCodePage";
import { UsernameExistsSignUpFail } from "./pages/auth/UsernameExistsSignUpFail";
import { PasswordRequirements } from "./auth/PasswordRequirements";
import { ViewProperty } from "./pages/ViewProperty";
import { ApplianceForm } from "./pages/AddAppliance";

// Succeed this time.

export function App() {
  const [user] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <BrowserRouter>
      <NavBar user={user} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />

      <Footer />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/loginPage"
          element={<LoginPage loggedIn={loggedIn} setLoggedIn={setLoggedIn} />}
        />
        <Route path="/signUpPage" element={<SignUpPage />} />
        <Route path="/forgotPassword" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<PasswordResetLandingPage />} />
        <Route
          path="/passwordRequirements"
          element={<PasswordRequirements />}
        />
        <Route
          path="/usernameExistsSignUpFail"
          element={<UsernameExistsSignUpFail />}
        />
        <Route element={<PrivateRoute user={user} />}>
          <Route path="/verifyEmail" element={<EmailVerificationCodePage />} />
          <Route path="/displayProperties" element={<DisplayProperties />} />
          <Route path="/addProperty" element={<AddProperty />} />
          <Route path="/addAppliance/:propertyID" element={<ApplianceForm />} />

          <Route path="/viewproperty/:propertyID" element={<ViewProperty />} />
          <Route path="/addTask/:propertyID" element={<AddTask />} />
          <Route path="/pleaseVerify" element={<PleaseVerifyEmailPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
