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
import { LoginPage } from "./pages/auth/LoginPage";
import { PleaseVerifyEmailPage } from "./pages/auth/PleaseVerifyEmailPage";
import { SignUpPage } from "./pages/auth/SignUpPage";
import { HomePage } from "./pages/HomePage";
import { ForgotPasswordPage } from "./pages/auth/ForgotPasswordPage";
import { PasswordResetLandingPage } from "./pages/auth/PasswordResetLandingPage";
import { EmailVerificationCodePage } from "./pages/auth/EmailVerificationCodePage";
import axios from "axios";

export function App() {
  const [user, setUser] = useState(null);

  const getProperties = async (email) => {
    try {
      const response = await axios.get(`/api/getProperties/${email}`, {});
    } catch (error) {
      console.error(error.response.data);
    }
  };

  const [properties, setProperties] = useState(data);
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {}, [user, properties]);

  return (
    <BrowserRouter>
      <NavBar user={user} loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>

      <Footer />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/loginPage" element={<LoginPage loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} />
        <Route path="/signUpPage" element={<SignUpPage />} />
        <Route path="/forgotPassword" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<PasswordResetLandingPage />} />
        <Route element={<PrivateRoute user={user} />}>
          <Route path="/verifyEmail" element={<EmailVerificationCodePage />} />
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
