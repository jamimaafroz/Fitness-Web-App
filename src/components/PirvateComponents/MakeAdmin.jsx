import React, { useState } from "react";
import { toast } from "react-toastify";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const MakeAdmin = () => {
  const [searchEmail, setSearchEmail] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedRoles, setSelectedRoles] = useState({});
  const axiosSecure = useAxiosSecure();

  const handleSearch = async () => {
    if (!searchEmail) return toast.error("Please enter an email to search");

    try {
      const res = await axiosSecure.get(`/users/search?email=${searchEmail}`);
      if (res.data.length === 0) {
        toast.info("No users found with that email");
      }
      setUsers(res.data);

      // Set default selected roles
      const rolesObj = {};
      res.data.forEach((user) => {
        rolesObj[user._id] = user.role || "";
      });
      setSelectedRoles(rolesObj);
    } catch (err) {
      toast.error("Search failed. Try again.", err);
    }
  };

  const handleSelectChange = (userId, newRole) => {
    setSelectedRoles((prev) => ({
      ...prev,
      [userId]: newRole,
    }));
  };

  const handleUpdateRole = async (userId) => {
    const newRole = selectedRoles[userId];

    try {
      const res = await axiosSecure.patch("/users/role", {
        userId,
        role: newRole,
      });

      toast.success(res.data.message);

      // Update role in local state
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId ? { ...user, role: newRole } : user
        )
      );
    } catch (err) {
      toast.error(err.response?.data?.error || "Role update failed");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Manage User Roles</h2>

      <div className="flex gap-2 mb-6">
        <input
          type="email"
          placeholder="Search user by email"
          value={searchEmail}
          onChange={(e) => setSearchEmail(e.target.value)}
          className="flex-1 border px-3 py-2 rounded"
        />
        <button
          onClick={handleSearch}
          className="bg-[#C65656] text-white px-4 py-2 rounded hover:bg-[#a94545]"
        >
          Search
        </button>
      </div>

      {users.length > 0 && (
        <table className="w-full border text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Current Role</th>
              <th className="p-3">Update Role</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-t">
                <td className="p-3">{user.name || "N/A"}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3 capitalize">{user.role || "None"}</td>
                <td className="p-3">
                  <select
                    value={selectedRoles[user._id]}
                    onChange={(e) =>
                      handleSelectChange(user._id, e.target.value)
                    }
                    className="border px-2 py-1 rounded"
                  >
                    <option value="member">Member</option>
                    <option value="trainer">Trainer</option>
                    <option value="admin">Admin</option>
                    <option value="">Remove Role</option>
                  </select>
                </td>
                <td className="p-3">
                  <button
                    onClick={() => handleUpdateRole(user._id)}
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MakeAdmin;
