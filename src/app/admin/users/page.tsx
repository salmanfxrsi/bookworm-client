"use client";

import { useEffect, useState } from "react";
import axios from "axios";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionMessage, setActionMessage] = useState("");
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [roleUpdate, setRoleUpdate] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users`);
      setUsers(res.data);
    } catch (err) {
      console.error("Fetch users error:", err);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const updateUserRole = async (userId: string) => {
    if (!roleUpdate.trim()) {
      setActionMessage("Select a role to update!");
      return;
    }

    try {
      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/users/${userId}/role`, {
        role: roleUpdate,
      });
      setActionMessage("User role updated successfully!");
      setSelectedUser(null);
      setRoleUpdate("");
      fetchUsers();
      setTimeout(() => setActionMessage(""), 3000);
    } catch (err: any) {
      console.error("Update role error:", err.response?.data || err.message);
      setActionMessage("Failed to update role");
    }
  };

  const deleteUser = async (userId: string) => {
    if (!confirm("Delete this user?")) return;

    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`);
      setActionMessage("User deleted!");
      fetchUsers();
      setTimeout(() => setActionMessage(""), 3000);
    } catch (err: any) {
      console.error("Delete user error:", err.response?.data || err.message);
      setActionMessage("Failed to delete user");
    }
  };

  if (loading) return <p className="text-center py-20 text-zinc-500">Loading users...</p>;

  return (
    <div className="container mx-auto px-6 py-12 space-y-8">
      {actionMessage && (
        <div className="fixed top-6 right-6 z-50 bg-emerald-500 text-white px-4 py-2 rounded-lg shadow-lg backdrop-blur-md">
          {actionMessage}
        </div>
      )}

      <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">User Management</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {users.map((user) => (
          <div
            key={user._id}
            className="bg-white/60 dark:bg-black/60 backdrop-blur-md rounded-2xl shadow-md p-5 flex flex-col justify-between hover:scale-[1.02] transition-transform"
          >
            <div>
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                {user.name}
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">{user.email}</p>
              <p className="mt-1 text-sm font-medium text-zinc-800 dark:text-zinc-200">
                Role: <span className="font-bold">{user.role}</span>
              </p>
            </div>

            <div className="mt-4 flex flex-col sm:flex-row gap-2 items-start sm:items-center">
              {/* Role dropdown */}
              <select
                value={selectedUser === user._id ? roleUpdate : user.role}
                onChange={(e) => {
                  setSelectedUser(user._id);
                  setRoleUpdate(e.target.value);
                }}
                className="px-3 py-2 rounded-xl border border-zinc-300 dark:border-zinc-600 w-full sm:w-auto"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>

              <button
                onClick={() => updateUserRole(user._id)}
                className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600 transition w-full sm:w-auto"
              >
                Update Role
              </button>

              <button
                onClick={() => deleteUser(user._id)}
                className="bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 transition w-full sm:w-auto"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {users.length === 0 && (
        <p className="text-center py-20 text-zinc-500">No users found.</p>
      )}
    </div>
  );
}
