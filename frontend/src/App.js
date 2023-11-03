import { NavBar } from './components/NavBar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DisplayProperties } from './components/ViewProperties';
import { Footer } from './components/Footer';
import { AddProperty } from './components/AddProperty';
import { PropertyApplianceList } from "./components/PropertyApplianceList";
import { PropertyTaskList } from "./components/PropertyTaskList";
import './index.css';

export function App() {
  return (
    <BrowserRouter>
      <NavBar userState={"loggedIn"}/>
      <Footer />
        <Routes>
          <Route path="/" element={<DisplayProperties />} />
          <Route path="/addProperty" element={<AddProperty />} />
          <Route path="/applianceList" element={<PropertyApplianceList />} />
          <Route path="/taskList" element={<PropertyTaskList />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
