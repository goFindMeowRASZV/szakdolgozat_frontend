import { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { myAxios } from "./MyAxios.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [macskaLISTA, setMacskaLista] = useState(null);
    const [menhelyLISTA, setMenhelyLista] = useState(null);
    const [szuresLISTA, setSzuresLista] = useState([]);
    const [user, setUser] = useState(null);
    const [aktualisMacska, setAktualisMacska] = useState(null);
    const [errors, setErrors] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    //lekérjük a csrf tokent a backendről
    const csrf = () => myAxios.get("/sanctum/csrf-cookie");

    //bejelentkezett felhasználó adatainak lekérdezése
    const getUser = async () => {
        const { data } = await myAxios.get("/api/user");
        setUser(data);
        
    };

    //elküldi a kijelentkezési kérelmet, majd törli a felhasználói adatokat
    const logout = async () => {
        await csrf();
        myAxios.post("/logout").then((resp) => {
            setUser(null);
            navigate("/kezdolap2"); 
        });
    };

    //elküldi a bejelentkezési v. regisztrációs kérelmet
    const loginReg = async ({ ...adat }, vegpont) => {
        await csrf();
        try {
            await myAxios.post(vegpont, adat);
            getUser();
            navigate("/");
        } catch (error) {
            if (error.response.status === 422) {
                setErrors(error.response.data.errors);
            }
        }
    };

    //store fuggveny
    const createReport = async ({ ...adat }, vegpont) => {
        await csrf();
        try {
            await myAxios.post(vegpont, adat, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
        } catch (error) {
            if (error.response && error.response.status === 422) {
                setErrors(error.response.data.errors);
            }
        }
    };

    //macskalistaaa
    const getMacsCard = async () => {
        const { data } = await myAxios.get("/api/get-reports");
        setMacskaLista(data);
    };

    //menhelyLista
    const getMacsCardMenhely = async () => {
        const { data } = await myAxios.get("/api/get-sheltered-reports");
        setMenhelyLista(data);
    };

    //szűrési jelentések
    const getReportsFilter = async (filters) => {
        const { status,color, pattern} = filters;
        const endpoint = `/api/get-report-filter/${status || ""},${color || ""},${pattern || ""}`;
        try {
            const { data } = await myAxios.get(endpoint);
            setSzuresLista(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Hiba történt a lekérdezés során:", error);
        }
    };
    const getShelteredReportsFilter = async (filters) => {
        const { status, color, pattern} = filters;
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
            getMacsCard(); // Frissítés
        } catch (error) {
            console.error("Hiba az archiválásnál:", error);
        }
    };
    
    const updateReport = async (reportData) => {
        try {
            await myAxios.put(`/api/reports/${reportData.report_id}`, reportData);
            getMacsCard(); // Frissítés
        } catch (error) {
            console.error("Hiba a módosításnál:", error);
        }
    };
    


    return (
        <AuthContext.Provider value={{
            logout,
            loginReg,
            errors,
            getUser,
            user,
            createReport,
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
        </AuthContext.Provider>
    );
};

export default function useAuthContext() {
    return useContext(AuthContext);
};
