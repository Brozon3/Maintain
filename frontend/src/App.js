import { NavBar } from './components/NavBar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DisplayProperties } from './components/ViewProperties';
import { Footer } from './components/Footer';
import { AddProperty } from './components/AddProperty';
import { PropertyApplianceList } from "./components/PropertyApplianceList";
import { PropertyTaskList } from "./components/PropertyTaskList";
import './index.css';
import { AddTask } from './components/AddTask';
import { useEffect, useState } from 'react';
import data from './data/dummyProperties.json'

export function App() {

  const [properties, setProperties] = useState(data);

  useEffect(() => {
    
  },[properties]);

  return (
    <BrowserRouter>
      <NavBar userState={"loggedIn"}/>
      <Footer />
        <Routes>
          <Route path="/" element={<DisplayProperties properties={properties} />} />
          <Route path="/addProperty" element={<AddProperty properties={properties} />} />
          <Route path="/applianceList/:id" element={<PropertyApplianceList properties={properties} />} />
          <Route path="/taskList/:id" element={<PropertyTaskList properties={properties} />} />
          <Route path="/addTask/:id" element={<AddTask properties={properties} />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
