import { NavBar } from './components/NavBar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DisplayProperties } from './components/DisplayProperties';
import { Footer } from './components/Footer';

export function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Footer />
        <Routes>
          <Route path="/" element={<DisplayProperties/>}/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
