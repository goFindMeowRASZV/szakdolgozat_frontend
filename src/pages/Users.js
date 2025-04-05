import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAuthContext from "../contexts/AuthContext";
import { myAxios } from "../contexts/MyAxios";
import UserModal from "../components/UserModal.js";





const UsersPage = () => {
    const { user } = useAuthContext();
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    // CSRF cookie lekérése Sanctum-hoz
    const csrf = () => myAxios.get("/sanctum/csrf-cookie");

    useEffect(() => {
        if (!user || (user.role !== 0 && user.role !== 1)) {
            navigate("/");
            return;
        }

        fetchUsers();
    }, [user]);

  

    const fetchUsers = async () => {
        try {
          await csrf();
          const res = await myAxios.get("/api/get-users");
      
          const filtered = user?.role === 1
            ? res.data.filter(u => u.role === 1)
            : res.data;
      
          setUsers(filtered);
        } catch (err) {
          toast.error("Hiba a felhasználók lekérésekor.");
        }
      };

    const handleDelete = async (id) => {
        const confirmed = window.confirm("Biztosan törölni szeretnéd ezt a felhasználót?");
        if (!confirmed) return;

        try {
            await csrf(); // minden módosító kérés előtt CSRF
            await myAxios.delete(`/api/admin/delete-user/${id}`);
            toast.success("Felhasználó törölve.");
            setUsers(users.filter((u) => u.id !== id));
        } catch (err) {
            toast.error("Hiba történt a törlés során.");
        }
    };

    return (
        <div className="p-6 max-w-5xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Felhasználók kezelése</h1>

            <div className="flex justify-end mb-4">
                <button
                    onClick={() => setShowCreateModal(true)}
                    className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
                >
                    Új felhasználó
                </button>
            </div>

            <div className="overflow-x-auto bg-white rounded-lg shadow">
                <table className="min-w-full text-sm text-left">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-3">Név</th>
                            <th className="px-4 py-3">Email</th>
                            <th className="px-4 py-3">Szerepkör</th>
                            <th className="px-4 py-3 text-center">Műveletek</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((u) => (
                            <tr key={u.id} className="border-t hover:bg-gray-50">
                                <td className="px-4 py-2">{u.name}</td>
                                <td className="px-4 py-2">{u.email}</td>
                                <td className="px-4 py-2 capitalize">{u.role}</td>
                                <td className="px-4 py-2 text-center">
                                    <button
                                        className="text-blue-600 hover:underline mr-2"
                                        onClick={() => {
                                            setSelectedUser(u);
                                            setShowEditModal(true);
                                        }}
                                    >
                                        Szerkesztés
                                    </button>

                                    <button
                                        className="text-red-600 hover:underline disabled:opacity-50"
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
                                <td colSpan="4" className="px-4 py-4 text-center text-gray-500">
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

export default UsersPage;
