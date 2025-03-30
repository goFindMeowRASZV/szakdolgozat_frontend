import { createContext, useState, useContext} from "react";
import { useNavigate } from "react-router-dom";
import { myAxios } from "./MyAxios.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [errors, setErrors] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    //lekérjük a csrf tokent a backendről
    const csrf = () => myAxios.get("/sanctum/csrf-cookie");

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


    return (
        <AuthContext.Provider value={{
            createReport,
            logout,
            loginReg,
            errors,
            getUser,
            user
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export default function useAuthContext() {
    return useContext(AuthContext);
};
