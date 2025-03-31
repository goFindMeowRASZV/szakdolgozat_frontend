import { createContext, useState, useContext } from "react";
import { myAxios } from "./MyAxios.js";
import useAuthContext from "./AuthContext.js";


const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
    const [macskaLISTA, setMacskaLista] = useState(null);
    const [menhelyLISTA, setMenhelyLista] = useState(null);
    const [szuresLISTA, setSzuresLista] = useState([]);
    const [aktualisMacska, setAktualisMacska] = useState(null);
    const {user} = useAuthContext();


   /*  //macskalistaaa
    const getMacsCard = async () => {

        const { data } = await myAxios.get("/api/get-reports");
        setMacskaLista(data);
    }; */

    //admin es staff latha a nem aktiv bejelentest is
    const getMacsCard = async (userStatus) => {
        try {
            let endpoint = "/api/get-reports"; 
    
            if (userStatus === 0 || userStatus === 1) {
                endpoint = "/api/get-reports-a-s"; 
            }
    
            const { data } = await myAxios.get(endpoint);
            setMacskaLista(data);
        } catch (error) {
            console.error("Hiba történt a macskák lekérésekor:", error);
        }
    };

    //menhelyLista
    const getMacsCardMenhely = async () => {
        const { data } = await myAxios.get("/api/get-sheltered-reports");
        setMenhelyLista(data);
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
