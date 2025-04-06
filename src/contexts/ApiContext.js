import { createContext, useState, useContext, useEffect } from "react";
import { myAxios } from "./MyAxios.js";
import useAuthContext from "./AuthContext.js";
import { toast } from "react-toastify";

const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
  const [macskaLISTA, setMacskaLista] = useState(null);
  const [menhelyLISTA, setMenhelyLista] = useState(null);
  const [szuresLISTA, setSzuresLista] = useState([]);
  const [aktualisMacska, setAktualisMacska] = useState(null);
  const [comments, setComments] = useState([]); // ApiContext.js-ben

    const { user, setUser } = useAuthContext();

  
    useEffect(() => {
        const fetchData = async () => {
          await getMacsCardMenhely(); // mindig lekérhető
          try {
            const { data: user } = await myAxios.get("/api/whoami", { withCredentials: true });
            setUser(user);
            await getMacsCard();
          } catch (error) {
            console.log("Vendégként nézed az oldalt – csak a menhely adatok lesznek betöltve.");
          }
          
        };
      
        fetchData();
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

  const getMapReports = async () => {
    try {
      const { data } = await myAxios.get("/api/get-map-reports");
      setMacskaLista(data);
    } catch (error) {
      console.error("Hiba a térképes bejelentések lekérésekor:", error);
    }
  };

    //menhelyLista
    const getMacsCardMenhely = async () => {
        try {
          const { data } = await myAxios.get("/api/get-sheltered-reports");
          setMenhelyLista(data);
        } catch (error) {
          console.error("Hiba a menhelyi lista lekérésénél:", error);
        }
      };
      

  //szűrési jelentések
  const getReportsFilter = async (filters) => {
    const { userStatus, color, pattern } = filters;
    const endpoint = `/api/get-report-filter/${userStatus || ""},${
      color || ""
    },${pattern || ""}`;
    try {
      const { data } = await myAxios.get(endpoint);
      setSzuresLista(Array.isArray(data) ? data : []);
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
    } catch (error) {
      console.error("Hiba történt a lekérdezés során:", error);
    }
  };

    //komment letrehozasa
    const createComment = async (formData, vegpont) => {
        try {
            const response = await myAxios.post(vegpont, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                withCredentials: true,
            });
            console.log("Komment elküldve:", response.data);
            return response.data; // <<< visszatér az új kommenttel
        } catch (error) {
            console.error("Hiba a komment létrehozásánál:", error.response?.data || error.message);
            throw error; // <<< hogy a komponensben is lehessen kezelni
        }
    };
    
    //komment törlése
    const deleteComment = async (reportId, userId) => {
      try {
        await myAxios.delete(`/api/delete-comment/${reportId}/${userId}`);
      } catch (error) {
        console.error("Hiba a komment törlésekor:", error);
        throw error;
      }
    };
    
    //komment lekérése
    const getComments = async (reportId) => {
        try {
            const response = await myAxios.get(`/api/comments/by-report/${reportId}`, {
                withCredentials: true,
            });
            setComments(response.data);
        } catch (error) {
            console.error("Hiba a kommentek lekérésekor:", error.response?.data || error.message);
        }
    };
    
    
    
    
    //MENHELY
    const shelterCat = async (adat, vegpont) => {
        try {
            await myAxios.post(vegpont, adat, { withCredentials: true });
            alert("A macska menhelyre került!");
        } catch (error) {
            console.error("Hiba történt:", error.response?.data?.error || error.message);
        }
    };
    const updateShelteredCat = async (catId, data) => {
      try {
        await myAxios.put(`/api/update-sheltered-cat/${catId}`, data);
        toast.success("Sikeres módosítás!");
        getMacsCardMenhely(); // lista újratöltése
      } catch (error) {
        console.error("Hiba a macska módosításánál:", error);
        toast.error("Nem sikerült a módosítás.");
        throw error;
      }
    };

    const archiveReport = async (id) => {
        try {
          const res = await myAxios.patch(`/api/reports/${id}/archive`, {}, { withCredentials: true });
      
          toast.success("Sikeres archiválás!", { position: "top-right" });
          getMacsCard();
        } catch (error) {
          console.error("Hiba az archiválásnál:", error);
          toast.error("Nem sikerült archiválni.", { position: "top-right" });
        }
      };
      
    
    
    const updateReport = async (reportData) => {
        try {
            await myAxios.put(`/api/reports/${reportData.report_id}`, reportData, {
                withCredentials: true,
            });
            getMacsCard();
        } catch (error) {
            console.error("Hiba a módosításnál:", error);
        }
    };    

    //örökbefogadás
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
        shelterCat,
        menhelyLISTA,
        getMacsCardMenhely,
        getReportsFilter,
        getShelteredReportsFilter,
        szuresLISTA,
        createComment,
        setSzuresLista,
        archiveReport,
        updateReport,
        deleteComment,
        setComments,
        comments,
        getComments,
        getMapReports,
        submitAdoptionRequest,
        updateShelteredCat
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};

export default function useApiContext() {
  return useContext(ApiContext);
}
