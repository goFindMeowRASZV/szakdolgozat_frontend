import { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { myAxios } from "./MyAxios.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [macskaLISTA, setMacskaLista] = useState(null);
    const [menhelyLISTA, setMenhelyLista] = useState(null);
    const [szuresLISTA, setSzuresLista] = useState(null);
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
        const { color, pattern, date1, date2 } = filters;
    
        // Ellenőrizzük és alapértelmezett értéket adunk, ha nincs adat
        const formattedDate1 = date1 ?? "2015-01-01";  // Ha nincs beállítva, akkor 2015-01-01
        const formattedDate2 = date2 ?? new Date().toISOString().split("T")[0]; // Alapértelmezés: mai nap
    
        const endpoint = `/api/get-report-filter/${color || ""},${pattern || ""},${formattedDate1},${formattedDate2}`;
    
        try {
            const { data } = await myAxios.get(endpoint);
            setSzuresLista(data);
        } catch (error) {
            console.error("Hiba történt a lekérdezés során:", error);
        }
    };
    const getShelteredReportsFilter = async (filters) => {
        const { color, pattern, date1, date2 } = filters;
    
        // Ellenőrizzük és alapértelmezett értéket adunk, ha nincs adat
        const formattedDate1 = date1 ?? "2015-01-01";  // Ha nincs beállítva, akkor 2015-01-01
        const formattedDate2 = date2 ?? new Date().toISOString().split("T")[0]; // Alapértelmezés: mai nap
    
        const endpoint = `/api/get-sheltered-report-filter/${color || ""},${pattern || ""},${formattedDate1},${formattedDate2}`;
    
        try {
            const { data } = await myAxios.get(endpoint);
            setSzuresLista(data);
        } catch (error) {
            console.error("Hiba történt a lekérdezés során:", error);
        }
    };


    //macska menhelyre küldés
    const shelterCat = async ({ ...adat }, vegpont) =>  {
        try {
            const response = await myAxios.post(vegpont, adat);
            alert("A macska menhelyre került!");
        } catch (error) {
            console.error("Hiba történt:", error.response?.data?.error || error.message);
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
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export default function useAuthContext() {
    return useContext(AuthContext);
};
