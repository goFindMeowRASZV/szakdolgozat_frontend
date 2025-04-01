import { createContext, useState, useContext, useEffect } from "react";
import { myAxios } from "./MyAxios.js";
import useAuthContext from "./AuthContext.js";

const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
    const [macskaLISTA, setMacskaLista] = useState(null);
    const [menhelyLISTA, setMenhelyLista] = useState(null);
    const [szuresLISTA, setSzuresLista] = useState([]);
    const [aktualisMacska, setAktualisMacska] = useState(null);

    const { user, setUser } = useAuthContext();


    
    const csrf = () => myAxios.get("/sanctum/csrf-cookie");
    useEffect(() => {
        const fetchData = async () => {
          await getMacsCardMenhely(); // mindig lekérhető
      
          try {
            await csrf(); // csak kell, ha még nincs
            const { data: user } = await myAxios.get("/api/whoami");
            setUser(user);
            await getMacsCard(); // csak ha bejelentkezve vagyunk
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
        const { userStatus, color, pattern} = filters;
        const endpoint = `/api/get-sheltered-report-filter/${color || ""},${pattern || ""}`;
        try {
            const { data } = await myAxios.get(endpoint);
            setSzuresLista(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Hiba történt a lekérdezés során:", error);
        }
    };

    const createComment = async ({ ...adat }, vegpont) =>  {
        try {
            const response = await myAxios.post(vegpont, adat);
            console.log("komment elküldve")
        } catch (error) {
            console.error("Hiba történt:", error.response?.data?.error || error.message);
        }
    };
    //macska menhelyre küldés

    //macska menhelyre 
    const shelterCat = async ({ ...adat }, vegpont) =>  {
        try {
            await myAxios.post(vegpont, adat);
            alert("A macska menhelyre került!");
        } catch (error) {
            console.error("Hiba történt:", error.response?.data?.error || error.message);
        }
    };

    const archiveReport = async (id) => {
        try {
            await myAxios.patch(`/api/reports/${id}/archive`);
            getMacsCard(user.role); // Frissítés
        } catch (error) {
            console.error("Hiba az archiválásnál:", error);
        }
    };
    
    const updateReport = async (reportData) => {
        try {
            await myAxios.put(`/api/reports/${reportData.report_id}`, reportData);
            getMacsCard(user.role); // Frissítés
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
             updateReport
        }}>
            {children}
        </ApiContext.Provider>
    );
};

export default function useApiContext() {
    return useContext(ApiContext);
};
