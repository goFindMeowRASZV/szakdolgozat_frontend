import "./App.css";
import Regisztracio from "./pages/Regisztracio";
import {Route, Routes} from "react-router-dom";
import Layout from "./pages/Layout";
import NoPage from "./pages/NoPage";
import Bejelentkezes from "./pages/Bejelentkezes";
import Bejelentes from "./pages/Bejelentes";
import Terkep from "./components/public/Terkep";
import Kezdolap from "./pages/Kezdolap";
import Bejelentesek from "./pages/Bejelentesek";
import MacskaProfil from "./pages/MacskaProfil";
import Profil from "./pages/Profil";

function App() {
  return (
    
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Kezdolap />} />
          <Route path="regisztracio" element={<Regisztracio />} />
          <Route path="bejelentkezes" element={<Bejelentkezes />} />
          <Route path="bejelentes" element={<Bejelentes />} />
          <Route path="bejelentesek" element={<Bejelentesek />} />
          <Route path="terkep" element={<Terkep />} />
          <Route path="MacskaProfil" element={<MacskaProfil />} />
          <Route path="profil" element={<Profil />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
  )
}

export default App;
