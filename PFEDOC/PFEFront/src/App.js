import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Login from './Pages/Auth/Login';
import Register from './Pages/Auth/Register';
import PersonnelApp from './Routes/PersonnelApp';
import PatientApp from './Routes/PatientApp';
import Dashboard from './Componentes/Accueil';
import Terms from './Pages/Legal/Terms';
import Privacy from './Pages/Legal/Privacy';
import Contact from './Pages/Contact/Contact';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* autres routes */}
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/personnel/*" element={<PersonnelApp />} />
        <Route path="/patient/*" element={<PatientApp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;