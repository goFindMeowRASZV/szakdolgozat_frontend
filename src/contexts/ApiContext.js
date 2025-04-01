import { createContext, useState, useContext } from "react";
import { myAxios } from "./MyAxios.js";
import useAuthContext from "./AuthContext.js";


const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
    const [macskaLISTA, setMacskaLista] = useState(null);
    const [menhelyLISTA, setMenhelyLista] = useState(null);
    const [szuresLISTA, setSzuresLista] = useState([]);
    const [aktualisMacska, setAktualisMacska] = useState(null);
    const [comments, setComments] = useState([]); // ApiContext.js-ben

    const {user} = useAuthContext();

    
    //lekérjük a csrf tokent a backendről
    const csrf = () => myAxios.get("/sanctum/csrf-cookie");

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
            await myAxios.patch(`/api/reports/${id}/archive`, {}, { withCredentials: true });
            getMacsCard(user.role);
        } catch (error) {
            console.error("Hiba az archiválásnál:", error);
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
            getComments
        }}>
            {children}
        </ApiContext.Provider>
    );
};

export default function useApiContext() {
    return useContext(ApiContext);
};
