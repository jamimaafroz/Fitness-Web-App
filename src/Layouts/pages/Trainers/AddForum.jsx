// src/components/Trainer/AddForum.jsx
import React, { useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const AddForum = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      alert("Please fill out all fields");
      return;
    }

    const payload = {
      title,
      description,
      createdBy: user.displayName,
      createdByEmail: user.email,
      role: user.role,
      createdAt: new Date().toISOString(),
    };

    try {
      await axiosSecure.post("/forums", payload);
      alert("Forum created successfully!");
      setTitle("");
      setDescription("");
    } catch (error) {
      console.error("Error creating forum:", error);
      alert("Failed to create forum, try again.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-6">Add New Forum</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            placeholder="Forum title"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
            className="w-full border px-3 py-2 rounded"
            placeholder="Describe the forum topic"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-[#C65656] text-white px-6 py-2 rounded hover:bg-[#a94444]"
        >
          Create Forum
        </button>
      </form>
    </div>
  );
};

export default AddForum;
