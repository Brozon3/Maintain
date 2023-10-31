import { NavBar } from './components/NavBar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DisplayProperties } from './components/ViewProperties';
import { Footer } from './components/Footer';
import { AddProperty } from './components/AddProperty';
import { ViewProperty } from "./components/ViewProperty";

export function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Footer />
        <Routes>
          <Route path="/" element={<DisplayProperties />} />
          <Route path="/addProperty" element={<AddProperty />} />
          <Route path="/viewProperty" element={<ViewProperty />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
