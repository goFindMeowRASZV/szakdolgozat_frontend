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

    
    //lekérjük a csrf tokent a backendről
    const csrf = () => myAxios.get("/sanctum/csrf-cookie");

    useEffect(() => {
        const fetchData = async () => {
          await getMacsCardMenhely(); // mindig lekérhető
          try {
            await csrf();
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
            await csrf();
          const { data } = await myAxios.get("/api/get-sheltered-reports");
          setMenhelyLista(data);
        } catch (error) {
          console.error("Hiba a menhelyi lista lekérésénél:", error);
        }
      };
      

    //szűrési jelentések
    const getReportsFilter = async (filters) => {
        const { userStatus,color, pattern} = filters;
        const endpoint = `/api/get-report-filter/${userStatus || ""},${color || ""},${pattern || ""}`;
        try {
            const { data } = await myAxios.get(endpoint);
            setSzuresLista(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Hiba történt a lekérdezés során:", error);
        }
    };
    const getShelteredReportsFilter = async (filters) => {
        const {  color, pattern} = filters;
        const endpoint = `/api/get-sheltered-report-filter/${color || ""},${pattern || ""}`;
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
            await csrf();
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
    const deleteComment = async (commentId) => {
        try {
            await csrf();
            const response = await myAxios.delete(`/admin/delete-comment/${commentId}`, {
                withCredentials: true,
            });
            console.log("Komment törölve");
            return response.data; // <<< visszatérés
        } catch (error) {
            console.error("Hiba a komment törlésekor:", error.response?.data || error.message);
            throw error; // <<< dob hibát, ha van
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
    
    
    
    
    //macska menhelyre küldés 
    const shelterCat = async (adat, vegpont) => {
        try {
            await csrf();
            await myAxios.post(vegpont, adat, { withCredentials: true });
            alert("A macska menhelyre került!");
        } catch (error) {
            console.error("Hiba történt:", error.response?.data?.error || error.message);
        }
    };
    

    const archiveReport = async (id) => {
        try {
          await csrf();
          const res = await myAxios.patch(`/api/reports/${id}/archive`, {}, { withCredentials: true });
      
          toast.success("Sikeres archiválás!", { position: "top-right" });
          getMacsCard(user.role);
        } catch (error) {
          console.error("Hiba az archiválásnál:", error);
          toast.error("Nem sikerült archiválni.", { position: "top-right" });
        }
      };
      
    
    
    const updateReport = async (reportData) => {
        try {
            await csrf();
            await myAxios.put(`/api/reports/${reportData.report_id}`, reportData, {
                withCredentials: true,
            });
            getMacsCard(user.role);
        } catch (error) {
            console.error("Hiba a módosításnál:", error);
        }
    };    
    

    return (
        <ApiContext.Provider value={{
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
            getMapReports
        }}>
            {children}
        </ApiContext.Provider>
    );
};

export default function useApiContext() {
    return useContext(ApiContext);
};
