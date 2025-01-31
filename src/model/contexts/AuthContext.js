import { createContext, useState, useContext, useEffect } from "react";

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
        password_confirmation:"",
    });
    //lekérjük a csrf tokent a backendről
    const csrf = () => myAxios.get("/sanctum/csrf-cookie");

    //bejelentkezett felhasználó adatainak lekérdezése
    const getUser = async () => {
      const { data } = await myAxios.get("/api/user");
      console.log(data)
      setUser(data);
    };

    //elküldi a kijelentkezési kérelmet, majd törli a felhasználói adatokat
    const logout = async () => {
        await csrf();

        myAxios.post("/logout").then((resp) => {
            setUser(null);
            console.log(resp);
        });
    };



    //elküldi a bejelentkezési v. regisztrációs kérelmet
    const loginReg = async ({ ...adat }, vegpont) => {
        //lekérem a csrf tokent
        await csrf();
        console.log(adat, vegpont);
        try {
            await myAxios.post(vegpont, adat);
            console.log("sikerült!")
            getUser()
            navigate("/");
        } catch (error) {
            console.log(error);
            if (error.response.status === 422) {
                setErrors(error.response.data.errors);
            }
        }
    };

    //store fuggveny
    const createReport = async ({ ...adat }, vegpont) => {
        await csrf();
        try {
            // A /api/reports egy példát mutat, cseréld a megfelelő endpoint-ra
            await myAxios.post(vegpont, adat);
            console.log("Bejelentés sikerült!");
            // Sikeres bejelentés esetén további teendő: navigálás, üzenet, stb.
        } catch (error) {
            console.log(error);
            if (error.response && error.response.status === 422) {
                setErrors(error.response.data.errors);
            }
        }
    };

    return (
        <AuthContext.Provider value={{ logout, loginReg, errors, getUser, user , createReport}}>
            {children}
        </AuthContext.Provider>
    );
};
export default function useAuthContext() {
    return useContext(AuthContext);
}

/* import { createContext, useState } from 'react';
import { myAxios } from "./MyAxios";
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext("");
export const AuthProvider = ({ children }) => {
    const [user, setUser]=useState(null);

    const navigacio=useNavigate()
    const [errors, setErrors] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
      });
    const csrf = () => myAxios.get("/sanctum/csrf-cookie");


    const regisztracio_fv = async (adat) => {
        await csrf();
        try {
            await myAxios.post("/register", adat);
            console.log("siker")
            getUser()
            navigacio("/") //ezzel elmegyünk a kezdőlapra
        } catch (err) {
            console.log("Hiba történt az adat elküldésekor.", err)
        } finally {
        }
    };

    //lekérjük a bejelentkezett felhasználó adatait
    const getUser = async () => {
        await csrf();
    try{
        const response=await myAxios.get("/user");
        console.log(response.data)
        setUser(response.data)

    }catch (err){
        console.log("Hiba történt az adat elküldésekor.", err)
    }finally{
    }
}; 
//bejelentkezes
const bejelentkezes_fv = async () => {
    await csrf();
    try {
        await myAxios.post("/login");
        console.log("sikeres bejelentkezés")
        navigacio("/public")

    } catch (err) {
        console.log("Hiba történt a kijelentkezéskor", err)
    } finally {
    }
};
    //kijelentkezés
    const kijelentkezes_fv = async () => {
        await csrf();
        try {
            await myAxios.post("/logout");
            console.log("sikeres kijelentkezés")
            navigacio("/regisztracio")

        } catch (err) {
            console.log("Hiba történt a kijelentkezéskor", err)
        } finally {
        }
    };
    return (
        <AuthContext.Provider value={{ regisztracio_fv, kijelentkezes_fv, bejelentkezes_fv, user }}>
            {children}
        </AuthContext.Provider>

    )
} 

export default AuthContext
*/