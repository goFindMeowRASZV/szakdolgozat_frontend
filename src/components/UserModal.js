import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { myAxios } from "../contexts/MyAxios";

const UserModal = ({ onClose, onSave, userData, currentUser }) => {
  const isEdit = Boolean(userData);
  const [name, setName] = useState(userData?.name || "");
  const [email, setEmail] = useState(userData?.email || "");
  const [role, setRole] = useState(
    userData?.role ?? (currentUser?.role === 1 ? 1 : 0)
  );
  const [password, setPassword] = useState("");

  const csrf = () => myAxios.get("/sanctum/csrf-cookie");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await csrf();
      if (isEdit) {
        await myAxios.put(`/api/admin/update-user/${userData.id}`, {
          name,
          email,
          role,
        });
        toast.success("Felhasználó frissítve.");
      } else {
        await myAxios.post("/register", {
          name,
          email,
          role,
          password,
        });
        toast.success("Felhasználó létrehozva.");
      }
      onSave();
      onClose();
    } catch (err) {
      toast.error("Hiba történt mentés közben.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow w-[90%] max-w-md"
      >
        <h2 className="text-xl font-bold mb-4">
          {isEdit ? "Felhasználó szerkesztése" : "Új felhasználó"}
        </h2>

        <label className="block mb-2">
          Név:
          <input
            className="w-full p-2 border rounded mt-1"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>

        <label className="block mb-2">
          Email:
          <input
            className="w-full p-2 border rounded mt-1"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        {!isEdit && (
          <label className="block mb-2">
            Jelszó:
            <input
              type="password"
              className="w-full p-2 border rounded mt-1"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
        )}

        <label className="block mb-4">
          Szerepkör:
          <select
            className="w-full p-2 border rounded mt-1"
            value={role}
            onChange={(e) => setRole(parseInt(e.target.value))}
            disabled={currentUser?.role === 1}
          >
            {currentUser?.role === 0 && <option value={0}>Admin</option>}
            <option value={1}>Staff</option>
          </select>
        </label>

        <div className="flex justify-end gap-2">
          <button
            type="button"
            className="px-4 py-2 bg-gray-300 rounded"
            onClick={onClose}
          >
            Mégse
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
          >
            Mentés
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserModal;
