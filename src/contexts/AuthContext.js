import { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { myAxios } from "./MyAxios.js";
import { toast } from "react-toastify";

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

    useEffect(() => {
        getUser();
    }, []);

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
            
        });
        navigate("/");
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

    const uploadProfilePicture = async (file) => {
        const formData = new FormData();
        formData.append("profile_picture", file);
    
        try {
          const res = await myAxios.post("/api/profile-picture", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          setUser((prev) => ({ ...prev, profile_picture: res.data.profile_picture }));
          toast.success("Profilkép frissítve!");
        } catch (error) {
          toast.error("Hiba történt a feltöltés során.");
          console.error(error);
        }
      };
    
      const changePassword = async (data) => {
        try {
          await myAxios.post("/api/change-password", data);
          toast.success("Jelszó sikeresen megváltoztatva!");
        } catch (error) {
          toast.error("Hiba történt a jelszó frissítésekor.");
          console.error(error);
        }
      };

    return (
        <AuthContext.Provider value={{
            createReport,
            logout,
            loginReg,
            errors,
            getUser,
            user,
            changePassword,
            uploadProfilePicture
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export default function useAuthContext() {
    return useContext(AuthContext);
};
