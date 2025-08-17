// src/components/Trainer/ManageSlots.jsx
import React, { useState, useEffect } from "react";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const ManageSlots = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [slots, setSlots] = useState([]);

  useEffect(() => {
    if (user?.email) {
      axiosSecure.get(`/slots?trainerEmail=${user.email}`).then((res) => {
        setSlots(res.data);
      });
    }
  }, [user, axiosSecure]);

  const handleDelete = async (slotId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this slot?"
    );
    if (!confirmed) return;

    try {
      await axiosSecure.delete(`/slots/${slotId}`);
      setSlots((prev) => prev.filter((slot) => slot._id !== slotId));
    } catch (error) {
      console.error("Failed to delete slot:", error);
      alert("Failed to delete slot. Try again.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-6">Manage Slots</h2>
      {slots.length === 0 ? (
        <p>No slots found.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Slot Name</th>
              <th className="border px-4 py-2">Slot Time</th>
              <th className="border px-4 py-2">Days</th>
              <th className="border px-4 py-2">Classes</th>
              <th className="border px-4 py-2">Booked By</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {slots.map((slot) => (
              <tr key={slot._id} className="text-center border-t">
                <td className="border px-4 py-2">{slot.slotName}</td>
                <td className="border px-4 py-2">{slot.slotTime}</td>
                <td className="border px-4 py-2">{slot.days.join(", ")}</td>
                <td className="border px-4 py-2">{slot.className}</td>
                <td className="border px-4 py-2">
                  {slot.isBooked ? slot.bookedByName : "Available"}
                </td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleDelete(slot._id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                  >
                    Delete
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

export default ManageSlots;
