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
  const createReport = async ({ ...adat }, vegpont) => {
    try {
      await myAxios.post(vegpont, adat, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Sikeres létrehozás!", { position: "top-right" });
      navigate("/bejelentesek");
    } catch (error) {
      if (error.response && error.response.status === 422) {
        setErrors(error.response.data.errors);
      }
      toast.error("Nem sikerült létrehozni.", { position: "top-right" });
    }
  };

  const getUser = async () => {
    try {
      const { data } = await myAxios.get("/api/whoami");
      setUser(data);
    } catch (error) {
      if (error.response?.status === 401) {
        console.log("Nincs bejelentkezve – ez rendben van.");
      } else {
        console.error("Váratlan hiba a getUser-ben:", error);
      }
    }
  };

  const logout = async () => {
    myAxios.post("/logout").then((resp) => {
      setUser(null);
    });
    navigate("/");
  };

  const loginReg = async ({ ...adat }, vegpont) => {
    try {
      await myAxios.get("/sanctum/csrf-cookie");
      await myAxios.post(vegpont, adat);
      await getUser();
      navigate("/");
    } catch (error) {
      if (error.response && error.response.status === 422) {
        setErrors({ email: ["Hibás e-mail cím vagy jelszó."] });
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
      setUser((prev) => ({
        ...prev,
        profile_picture: res.data.profile_picture,
      }));
      toast.success("Profilkép frissítve!");
    } catch (error) {
      if (error.response && error.response.status === 422) {
        toast.error("Kérlek, képfájlt tölts fel!");
      } else {
        toast.error("Hiba történt a feltöltés során.");
      }
      console.error(error);
    }
  };

  const changePassword = async (passwordData) => {
    try {
      await myAxios.put("/api/change-password", passwordData);
    } catch (error) {
      if (
        error.response &&
        error.response.status === 403 &&
        error.response.data.code === "INVALID_CURRENT_PASSWORD"
      ) {
        const err = new Error("A jelenlegi jelszó hibás.");
        err.code = "INVALID_CURRENT_PASSWORD";
        throw err;
      }

      throw new Error("UNKNOWN_ERROR");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        createReport,
        logout,
        loginReg,
        errors,
        getUser,
        user,
        changePassword,
        uploadProfilePicture,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuthContext() {
  return useContext(AuthContext);
}
