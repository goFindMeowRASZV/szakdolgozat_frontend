import { createContext, useState } from 'react';
import { myAxios } from "./MyAxios";
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext("");
export const AuthProvider = ({ children }) => {
    const [user, setUser]=useState(null);

    const navigacio=useNavigate()

    const csrf = () => myAxios.get("/sanctum/csrf-cookie");

    const regisztracio_fv = async (adat) => {
        await csrf();
        try {
            const response = await myAxios.post("/register", adat);
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
        const response=await myAxios.get("/api/user");
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
        const response = await myAxios.post("/login");
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
            const response = await myAxios.post("/logout");
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