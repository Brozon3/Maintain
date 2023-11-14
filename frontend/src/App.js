import { NavBar } from "./components/NavBar";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { DisplayProperties } from "./pages/ViewProperties";
import { Footer } from "./components/Footer";
import { AddProperty } from "./pages/AddProperty";
import { PropertyApplianceList } from "./pages/PropertyApplianceList";
import { PropertyTaskList } from "./pages/PropertyTaskList";
import "./index.css";
import { AddTask } from "./pages/AddTask";
import { useEffect, useState } from "react";
import data from "./data/dummyProperties.json";
import { PrivateRoute } from "./auth/PrivateRoute";
import { EmailVerificationFail } from "./pages/EmailVerificationFail";
import { EmailVerificationSuccess } from "./pages/EmailVerificationSuccess";
import { EmailVerificationLandingPage } from "./pages/EmailVerificationLandingPage";
import { LoginPage } from "./pages/LoginPage";
import { PleaseVerifyEmailPage } from "./pages/PleaseVerifyEmailPage";
import { SignUpPage } from "./pages/SignUpPage";
import { HomePage } from "./pages/HomePage";
import { ForgotPasswordPage } from "./pages/ForgotPasswordPage";
import { PasswordResetLandingPage } from "./pages/PasswordResetLandingPage";

export function App() {
  const [user, setUser] = useState(null);

  const [properties, setProperties] = useState(data);

  useEffect(() => {}, [user, properties]);

  return (
    <BrowserRouter>
      <NavBar user={user} />

      <Footer />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/loginPage" element={<LoginPage />} />
        <Route path="/signUpPage" element={<SignUpPage />} />
        <Route path="/forgotPassword" element={<ForgotPasswordPage />} />
        <Route
          path="/reset-password/:passwordResetCode"
          element={<PasswordResetLandingPage />}
        />
        <Route element={<PrivateRoute user={user} />}>
          <Route
            path="/verifyEmail/:verificationString"
            element={<PleaseVerifyEmailPage />}
          />
          <Route
            path="/displayProperties"
            element={<DisplayProperties properties={properties} />}
          />
          <Route
            path="/addProperty"
            element={<AddProperty properties={properties} />}
          />
          <Route
            path="/applianceList/:id"
            element={<PropertyApplianceList properties={properties} />}
          />
          <Route
            path="/taskList/:id"
            element={<PropertyTaskList properties={properties} />}
          />
          <Route
            path="/addTask/:id"
            element={<AddTask properties={properties} />}
          />
          <Route path="/pleaseVerify" element={<PleaseVerifyEmailPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
