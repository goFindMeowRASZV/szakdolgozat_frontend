import "./App.css";
import './Fonts.module.css';
import Regisztracio from "./pages/Regisztracio";
import {Route, Routes} from "react-router-dom";
import Layout from "./pages/Layout";
import NoPage from "./pages/NoPage";
import Bejelentkezes from "./pages/Bejelentkezes";
import Bejelentes from "./pages/Bejelentes";

import Kezdolap from "./pages/Kezdolap";
import Kezdolap2 from "./pages/Kezdolap2";

import Bejelentesek from "./pages/Bejelentesek";
import MacskaProfil from "./pages/MacskaProfil";
import Profil from "./pages/Profil";
import Menhely from "./pages/Menhely";
import Terkep from "./components/Terkep";
import Szures from "./components/Szures";

function App() {
  return (
    
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Kezdolap2 />} />
          <Route path="kezdolap2" element={<Kezdolap2 />}/>
          <Route path="regisztracio" element={<Regisztracio />} />
          <Route path="bejelentkezes" element={<Bejelentkezes />} />
          <Route path="bejelentes" element={<Bejelentes />} />
          <Route path="bejelentesek" element={<Bejelentesek />} />
          <Route path="menhely" element={<Menhely />} />
          <Route path="szures" element={<Szures />} />
          <Route path="terkep" element={<Terkep />} />
          <Route path="MacskaProfil" element={<MacskaProfil />} />
          <Route path="profil" element={<Profil />} />
          
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
  )
}

export default App;
