import { NavBar } from "./components/NavBar";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { DisplayProperties } from "./components/ViewProperties";
import { Footer } from "./components/Footer";
import { AddProperty } from "./components/AddProperty";
import { PropertyApplianceList } from "./components/PropertyApplianceList";
import { PropertyTaskList } from "./components/PropertyTaskList";
import "./index.css";
import { AddTask } from "./components/AddTask";
import { useEffect, useState } from "react";
import data from "./data/dummyProperties.json";
import { PrivateRoute } from "./auth/PrivateRoute";
import { EmailVerificationFail } from "./pages/EmailVerificationFail";
import { EmailVerificationSuccess } from "./pages/EmailVerificationSuccess";
import { EmailVerificationLandingPage } from "./pages/EmailVerificationLandingPage";
import LoginPage from "./pages/LoginPage";
import { PleaseVerifyEmailPage } from "./pages/PleaseVerifyEmailPage";
import SignUpPage from "./pages/SignUpPage";

export function App() {
  const [user, setUser] = useState(null);

  const [properties, setProperties] = useState(data);

  useEffect(() => {}, [properties]);

  useEffect(() => {}, [properties]);

  return (
    <BrowserRouter>
      <NavBar userState={"loggedIn"} />

      <Footer />
      <Routes>
        <Route path="/" element={<DisplayProperties />} />
        <Route path="/loginPage" element={<LoginPage />} />
        <Route path="/signUpPage" element={<SignUpPage />} />
        <Route element={<PrivateRoute user={user} />}>
          <Route
            path="/verifyEmail/:verificationString"
            element={<PleaseVerifyEmailPage />}
          />
          <Route path="/displayProperties" element={<DisplayProperties />} />
          <Route path="/addProperty" element={<AddProperty />} />
          <Route path="/applianceList" element={<PropertyApplianceList />} />
          <Route path="/taskList" element={<PropertyTaskList />} />
          <Route path="/pleaseVerify" element={<PleaseVerifyEmailPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
