import { NavBar } from './components/NavBar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

export function App() {
  return (
    <BrowserRouter>
      <NavBar />
        <Routes>
          <Route path="/"/>
          <Route path="/add"/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
