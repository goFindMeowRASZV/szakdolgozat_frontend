import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAuthContext from "../contexts/AuthContext";
import { myAxios } from "../contexts/MyAxios";
import UserModal from "../components/UserModal.js";
import "../MenhelyListaNezet.css"; 

const Users = () => {
  const { user } = useAuthContext();
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    if (!user || (user.role !== 0 && user.role !== 1)) {
      navigate("/");
      return;
    }
    fetchUsers();
  }, [user]);

  const fetchUsers = async () => {
    try {
      const res = await myAxios.get("/api/get-users");
      const filtered =
        user?.role === 1 ? res.data.filter((u) => u.role === 1) : res.data;
      setUsers(filtered);
    } catch (err) {
      toast.error("Hiba a felhasználók lekérésekor.");
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Biztosan törölni szeretnéd ezt a felhasználót?"
    );
    if (!confirmed) return;

    try {
      await myAxios.delete(`/api/admin/delete-user/${id}`);
      toast.success("Felhasználó törölve.");
      setUsers(users.filter((u) => u.id !== id));
    } catch (err) {
      toast.error("Hiba történt a törlés során.");
    }
  };

  return (
    <div className="galeriaBody" style={{ paddingTop: "60px" }}>
      <h1 className="galeriaCim">FELHASZNÁLÓK KEZELÉSE</h1>

      <div style={{ textAlign: "right", marginBottom: "20px", width: "100%" }}>
        <button
          onClick={() => setShowCreateModal(true)}
          className="btn btn-dark"
        >
          Új felhasználó
        </button>
      </div>

      <div className="menhely-lista-container">
        <table className="menhely-lista-table">
          <thead>
            <tr>
              <th>Név</th>
              <th>Email</th>
              <th>Szerepkör</th>
              <th>Műveletek</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>
                  {u.role === 0 ? "Admin" : u.role === 1 ? "Staff" : "User"}
                </td>
                <td className="px-4 py-2 flex gap-2 justify-center">
                  <button
                    className="bg-black text-white px-3 py-1 rounded hover:bg-gray-800 transition"
                    onClick={() => {
                      setSelectedUser(u);
                      setShowEditModal(true);
                    }}
                  >
                    Szerkesztés
                  </button>

                  <button
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition disabled:opacity-50"
                    onClick={() => handleDelete(u.id)}
                    disabled={u.id === user.id}
                  >
                    Törlés
                  </button>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-6 text-gray-500">
                  Nincs felhasználó.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showCreateModal && (
        <UserModal
          onClose={() => setShowCreateModal(false)}
          onSave={fetchUsers}
          currentUser={user}
        />
      )}

      {showEditModal && (
        <UserModal
          userData={selectedUser}
          onClose={() => {
            setShowEditModal(false);
            setSelectedUser(null);
          }}
          onSave={fetchUsers}
          currentUser={user}
        />
      )}
    </div>
  );
};

export default Users;
