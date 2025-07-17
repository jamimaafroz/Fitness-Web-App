import React, { useState } from "react";
import { toast } from "react-toastify";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const AddClass = () => {
  const axiosSecure = useAxiosSecure();
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    details: "",
    otherInfo: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, image, details } = formData;
    if (!name || !image || !details) {
      toast.error("Please fill in all required fields!");
      return;
    }

    try {
      const res = await axiosSecure.post("/classes", formData);
      if (res.data.insertedId) {
        toast.success("Class added successfully!");
        setFormData({ name: "", image: "", details: "", otherInfo: "" });
      } else {
        toast.error("Failed to add class.");
      }
    } catch (error) {
      toast.error("Error adding class.");
      console.error(error);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-center text-primary">
        Add New Class
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Class Name */}
        <div>
          <label className="block mb-1 font-medium" htmlFor="name">
            Class Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter class name"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#C65656]"
            required
          />
        </div>

        {/* Image URL */}
        <div>
          <label className="block mb-1 font-medium" htmlFor="image">
            Image URL <span className="text-red-500">*</span>
          </label>
          <input
            type="url"
            name="image"
            id="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="Enter image URL"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#C65656]"
            required
          />
        </div>

        {/* Details */}
        <div>
          <label className="block mb-1 font-medium" htmlFor="details">
            Details <span className="text-red-500">*</span>
          </label>
          <textarea
            name="details"
            id="details"
            value={formData.details}
            onChange={handleChange}
            placeholder="Write class details"
            rows="4"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#C65656]"
            required
          ></textarea>
        </div>

        {/* Other Info (optional) */}
        <div>
          <label className="block mb-1 font-medium" htmlFor="otherInfo">
            Other Info (optional)
          </label>
          <textarea
            name="otherInfo"
            id="otherInfo"
            value={formData.otherInfo}
            onChange={handleChange}
            placeholder="Additional information"
            rows="2"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#C65656]"
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-[#C65656] text-white py-2 rounded hover:bg-[#9e4444] transition"
        >
          Add Class
        </button>
      </form>
    </div>
  );
};

export default AddClass;
