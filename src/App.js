import "./App.css";
import Public from "./pages/Public";
import Regisztracio from "./pages/Regisztracio";
import {Route, Routes} from "react-router-dom";
import Layout from "./pages/Layout";
import NoPage from "./pages/NoPage";
import Bejelentkezes from "./pages/Bejelentkezes";

function App() {
  return (
    
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Public />} />
          <Route path="regisztracio" element={<Regisztracio />} />
          <Route path="bejelentkezes" element={<Bejelentkezes />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
  )
}

export default App;
