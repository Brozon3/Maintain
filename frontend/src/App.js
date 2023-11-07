import { NavBar } from "./components/NavBar";
import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { DisplayProperties } from "./components/ViewProperties";
import { Footer } from "./components/Footer";
import { AddProperty } from "./components/AddProperty";
import { PropertyApplianceList } from "./components/PropertyApplianceList";
import { PropertyTaskList } from "./components/PropertyTaskList";
import { PrivateRoute } from "./auth/PrivateRoute";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import "./index.css";
import { AddTask } from "./components/AddTask";
import data from "./data/dummyProperties.json";
import { PleaseVerifyEmailPage } from "./pages/PleaseVerifyEmailPage";

// To add different private route permissions, see https://www.robinwieruch.de/react-router-private-routes/
export function App() {
  const [user, setUser] = useState(null);

  const [properties, setProperties] = useState(data);

  return (
    <BrowserRouter>
      <NavBar userState={"loggedIn"} />

      <Footer />
      <Routes>
        <Route path="/" element={<DisplayProperties />} />
        <Route path="/loginPage" element={<LoginPage />} />
        <Route path="/signUpPage" element={<SignUpPage />} />
        <Route element={<PrivateRoute user={user} />}>
          <Route path="/displayProperties" element={<DisplayProperties />} />
          <Route path="/addProperty" element={<AddProperty />} />
          <Route path="/applianceList" element={<PropertyApplianceList />} />
          <Route path="/taskList" element={<PropertyTaskList />} />
          <Route path="/please-verify" element={<PleaseVerifyEmailPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
