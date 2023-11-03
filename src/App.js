import { NavBar } from "./components/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DisplayProperties } from "./components/ViewProperties";
import { Footer } from "./components/Footer";
import { AddProperty } from "./components/AddProperty";
import { PropertyApplianceList } from "./components/PropertyApplianceList";
import { PropertyTaskList } from "./components/PropertyTaskList";
import LoginPage from "./pages/LoginPage";

export function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Footer />
      <Routes>
        <Route path="/" element={<DisplayProperties />} />
        <Route path="/loginPage" element={<LoginPage />} />
        <Route path="/signUpPage" element={<LoginPage />} />
        <Route path="/addProperty" element={<AddProperty />} />
        <Route path="/applianceList" element={<PropertyApplianceList />} />
        <Route path="/taskList" element={<PropertyTaskList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
