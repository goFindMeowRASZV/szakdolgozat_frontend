import { createContext, useState, useContext, useEffect } from "react";
import { myAxios } from "./MyAxios.js";
import useAuthContext from "./AuthContext.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
  const navigate = useNavigate();
  const [aktualisFelhasznalo, setAktualisFelhasznalo] = useState(null);
  const [macskaLISTA, setMacskaLista] = useState([]);
  const [menhelyLISTA, setMenhelyLista] = useState([]);
  const [orokbeadottMenhelyLISTA, setOrokbeadottMenhelyLista] = useState([]);
  const [szuresLISTA, setSzuresLista] = useState([]);
  const [aktualisMacska, setAktualisMacska] = useState(null);
  const [comments, setComments] = useState([]);
  const { setUser } = useAuthContext();

  useEffect(() => {
    getMacsCard();
    getMacsCardMenhely();
    myAxios
      .get("/api/whoami", { withCredentials: true })
      .then(({ data }) => setUser(data))
      .catch(() => {
        console.log(
          "Vendégként nézed az oldalt – csak a menhely adatok lesznek betöltve."
        );
      });
  }, []);

  const getMacsCard = async () => {
    try {
      const { data } = await myAxios.get("/api/get-reports");
      setMacskaLista(data);
    } catch (error) {
      if (error.response?.status === 401) {
        console.log("Nincs bejelentkezve – nem töltjük be a bejelentéseket.");
      } else {
        console.error("Hiba a bejelentések lekérésénél:", error);
      }
    }
  };

  const getMacsCardMenhely = async () => {
    try {
      const { data } = await myAxios.get("/api/get-sheltered-reports");
      setMenhelyLista(data);
    } catch (error) {
      console.error("Hiba a menhelyi lista lekérésénél:", error);
    }
  };
  const getOrokbeadottMacsCardMenhely = async () => {
    try {
      const { data } = await myAxios.get("/api/get-adopted-sheltered-reports");
      setOrokbeadottMenhelyLista(data);
    } catch (error) {
      console.error("Hiba a menhelyi lista lekérésénél:", error);
    }
  };

  const getMapReports = async () => {
    try {
      const { data } = await myAxios.get("/api/get-map-reports");
      setMacskaLista(data);
    } catch (error) {
      console.error("Hiba a térképes bejelentések lekérésekor:", error);
    }
  };

  const getReportsFilter = async (filters) => {
    const { status, color, pattern } = filters;
    const endpoint = `/api/get-report-filter/${status || ""},${color || ""},${
      pattern || ""
    }`;
    try {
      const { data } = await myAxios.get(endpoint);
      setSzuresLista(Array.isArray(data) ? data : []);
      return data;
    } catch (error) {
      console.error("Hiba történt a lekérdezés során:", error);
    }
  };
  const getShelteredReportsFilter = async (filters) => {
    const { color, pattern } = filters;
    const endpoint = `/api/get-sheltered-report-filter/${color || ""},${
      pattern || ""
    }`;
    try {
      const { data } = await myAxios.get(endpoint);
      setSzuresLista(Array.isArray(data) ? data : []);
      return data;
    } catch (error) {
      console.error("Hiba történt a lekérdezés során:", error);
    }
  };

  const createComment = async (formData, vegpont) => {
    try {
      const response = await myAxios.post(vegpont, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      console.log("Komment elküldve:", response.data);
      return response.data;
    } catch (error) {
      console.error(
        "Hiba a komment létrehozásánál:",
        error.response?.data || error.message
      );
      throw error;
    }
  };

  const deleteComment = async (reportId, userId) => {
    try {
      await myAxios.delete(`/api/delete-comment/${reportId}/${userId}`);
    } catch (error) {
      console.error("Hiba a komment törlésekor:", error);
      throw error;
    }
  };

  const getComments = async (reportId) => {
    try {
      const response = await myAxios.get(
        `/api/comments/by-report/${reportId}`,
        {
          withCredentials: true,
        }
      );
      setComments(response.data);
    } catch (error) {
      console.error(
        "Hiba a kommentek lekérésekor:",
        error.response?.data || error.message
      );
    }
  };

  const shelterCat = async (adat, vegpont) => {
    try {
      await myAxios.post(vegpont, adat, { withCredentials: true });
      alert("A macska menhelyre került!");
    } catch (error) {
      console.error(
        "Hiba történt:",
        error.response?.data?.error || error.message
      );
    }
  };
  const updateShelteredCat = async (catId, data) => {
    try {
      await myAxios.put(`/api/update-sheltered-cat/${catId}`, data);
      getMacsCardMenhely();
    } catch (error) {
      console.error("Hiba a macska módosításánál:", error);
      throw error;
    }
  };

  const orokbeadasMenhely = async (id, payload) => {
    try {
      const response = await myAxios.patch(
        `/api/sheltered-cats/${id}/orokbeadas`,
        payload
      );
      toast.success("Sikeres örökbeadás!");
      navigate("/orokbefogadottak");
      return response.data;
    } catch (error) {
      console.error("Hiba az örökbeadás során:", error);
      toast.error("Nem sikerült az örökbeadás.");
      throw error;
    }
  };

  const updateReportPhoto = async (id, file) => {
    const formData = new FormData();
    formData.append("photo", file);

    console.log("📤 Küldendő FormData tartalma:");
    for (let pair of formData.entries()) {
      console.log("🔹", pair[0], "=>", pair[1]);
    }

    try {
      const response = await myAxios.post(
        `/api/reports/${id}/update-photo`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Kép sikeresen feltöltve:", response.data);
      return response.data;
    } catch (error) {
      console.error(
        "Képfeltöltési hiba:",
        error.response?.data || error.message
      );
      throw error;
    }
  };

  const updateReport = async (id, data) => {
    try {
      await myAxios.put(`/api/update-reports/${id}`, data);
      getMacsCard();
    } catch (error) {
      console.error("Hiba a bejelentés módosításánál:", error);
      throw error;
    }
  };

  const submitAdoptionRequest = async (data) => {
    try {
      const response = await myAxios.post("/api/orokbefogadas", data, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      toast.success("A jelentkezésed sikeresen elküldve!");
      return response.data;
    } catch (error) {
      console.error("Hiba az örökbefogadási jelentkezés során:", error);
      toast.error("Hiba történt a jelentkezés során.");
      throw error;
    }
  };

  return (
    <ApiContext.Provider
      value={{
        macskaLISTA,
        getMacsCard,
        aktualisMacska,
        setAktualisMacska,
        aktualisFelhasznalo,
        setAktualisFelhasznalo,
        shelterCat,
        menhelyLISTA,
        getMacsCardMenhely,
        getReportsFilter,
        getShelteredReportsFilter,
        szuresLISTA,
        createComment,
        setSzuresLista,
        updateReport,
        deleteComment,
        setComments,
        comments,
        getComments,
        getMapReports,
        submitAdoptionRequest,
        updateShelteredCat,
        updateReport,
        orokbeadasMenhely,
        getOrokbeadottMacsCardMenhely,
        orokbeadottMenhelyLISTA,
        setOrokbeadottMenhelyLista,
        updateReportPhoto,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};

export default function useApiContext() {
  return useContext(ApiContext);
}
