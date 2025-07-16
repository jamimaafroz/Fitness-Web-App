import React, { useState } from "react";

import { toast } from "react-toastify";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const MakeAdmin = () => {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("admin"); // default to admin
  const axiosSecure = useAxiosSecure();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return toast.error("Please enter an email");

    try {
      const res = await axiosSecure.patch("/users/role", { email, role });
      toast.success(res.data.message);
      setEmail("");
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to update user role");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Make / Remove Admin
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="User's email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        >
          <option value="admin">Admin</option>
          <option value="trainer">Trainer</option>
          <option value="member">Member</option>
          <option value="">Remove Role</option>
        </select>

        <button
          type="submit"
          className="w-full bg-[#C65656] text-white py-2 rounded hover:bg-[#a94545]"
        >
          Update Role
        </button>
      </form>
    </div>
  );
};

export default MakeAdmin;
