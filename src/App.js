import "./App.css";
import "./Fonts.module.css";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./pages/Layout";
import NoPage from "./pages/NoPage";
import Regisztracio from "./pages/Regisztracio";
import Bejelentkezes from "./pages/Bejelentkezes";
import Bejelentes from "./pages/BejelentesForm";
import Kezdolap from "./pages/Kezdolap";
import Kezdolap2 from "./pages/Kezdolap2";
import Bejelentesek from "./pages/Bejelentesek";
import MacskaProfil from "./pages/MacskaProfil";
import Profil from "./pages/Profil";
import Menhely from "./pages/Menhely";
import Terkep from "./components/Terkep";
import Szures from "./components/Szures";
import UsersPage from "./pages/Users";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { myAxios } from "./contexts/MyAxios";
import useAuthContext from "./contexts/AuthContext";
import Orokbeadottak from "./pages/Orokbeadottak";

function App() {
  const { getUser } = useAuthContext();

  useEffect(() => {
    const initApp = async () => {
      await myAxios.get("/sanctum/csrf-cookie");  
      await getUser(); 
    };

    initApp();
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Kezdolap2 />} />
          <Route path="kezdolap2" element={<Kezdolap2 />} />
          <Route path="regisztracio" element={<Regisztracio />} />
          <Route path="bejelentkezes" element={<Bejelentkezes />} />
          <Route path="bejelentes" element={<Bejelentes />} />
          <Route path="bejelentesek" element={<Bejelentesek />} />
          <Route path="menhely" element={<Menhely />} />
          <Route path="orokbeadott" element={<Orokbeadottak />} />
          <Route path="szures" element={<Szures />} />
          <Route path="terkep" element={<Terkep />} />
          <Route path="MacskaProfil" element={<MacskaProfil />} />
          <Route path="profil" element={<Profil />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;
