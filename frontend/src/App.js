import { NavBar } from "./components/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DisplayProperties } from "./pages/ViewProperties";
import { Footer } from "./components/Footer";
import { AddProperty } from "./pages/AddProperty";
import "./index.css";
import { AddTask } from "./pages/AddTask";
import { useState } from "react";
import { PrivateRoute } from "./auth/PrivateRoute";
import { HomePage } from "./pages/HomePage";
import { PasswordRequirements } from "./auth/PasswordRequirements";
import { ViewProperty } from "./pages/ViewProperty";
import { ApplianceForm } from "./pages/AddAppliance";

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
          path="/passwordRequirements"
          element={<PasswordRequirements />}
        />
        <Route element={<PrivateRoute user={user} />}>
          <Route path="/displayProperties" element={<DisplayProperties />} />
          <Route path="/addProperty" element={<AddProperty />} />
          <Route path="/addAppliance/:propertyID" element={<ApplianceForm />} />
          <Route path="/viewproperty/:propertyID" element={<ViewProperty />} />
          <Route path="/addTask/:propertyID" element={<AddTask />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
