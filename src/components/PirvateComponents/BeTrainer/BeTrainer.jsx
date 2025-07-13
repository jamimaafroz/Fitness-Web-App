import React, { useState } from "react";
import Select from "react-select";
import useAuth from "../../../Hooks/useAuth";
import axios from "axios";
import { toast } from "react-toastify";

const daysOptions = [
  { value: "Sunday", label: "Sunday" },
  { value: "Monday", label: "Monday" },
  { value: "Tuesday", label: "Tuesday" },
  { value: "Wednesday", label: "Wednesday" },
  { value: "Thursday", label: "Thursday" },
  { value: "Friday", label: "Friday" },
  { value: "Saturday", label: "Saturday" },
];

const BeATrainer = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    fullName: "",
    age: "",
    image: "",
    skills: [],
    days: [],
    time: "",
    otherInfo: "",
  });

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      skills: checked
        ? [...prev.skills, value]
        : prev.skills.filter((skill) => skill !== value),
    }));
  };

  const handleSelectChange = (selectedOptions) => {
    setFormData((prev) => ({
      ...prev,
      days: selectedOptions.map((opt) => opt.value),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trainerInfo = {
      ...formData,
      email: user.email,
      status: "pending",
    };

    try {
      const res = await axios.post(
        "http://localhost:3000/api/be-a-trainer",
        trainerInfo
      );
      if (res.data.insertedId) {
        toast.success("Application Submitted! 🎉");
      }
    } catch (err) {
      toast.error("Submission failed 😥");
      console.error(err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-md space-y-4"
    >
      <h2 className="text-2xl font-bold text-[#C65656] text-center">
        Apply to Become a Trainer 💪
      </h2>

      <input
        type="text"
        placeholder="Full Name"
        required
        className="w-full p-2 border rounded-md"
        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
      />

      <input
        type="email"
        value={user.email}
        readOnly
        className="w-full p-2 border rounded-md bg-gray-100"
      />

      <input
        type="number"
        placeholder="Age"
        required
        className="w-full p-2 border rounded-md"
        onChange={(e) => setFormData({ ...formData, age: e.target.value })}
      />

      <input
        type="text"
        placeholder="Profile Image URL"
        required
        className="w-full p-2 border rounded-md"
        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
      />

      <div>
        <p className="font-medium">Skills (select multiple):</p>
        <div className="flex flex-wrap gap-4 mt-2">
          {["Yoga", "Cardio", "Strength", "Zumba", "Pilates"].map((skill) => (
            <label key={skill} className="flex items-center gap-2">
              <input
                type="checkbox"
                value={skill}
                onChange={handleCheckboxChange}
              />
              {skill}
            </label>
          ))}
        </div>
      </div>

      <div>
        <p className="font-medium">Available Days (choose from list):</p>
        <Select
          options={daysOptions}
          isMulti
          onChange={handleSelectChange}
          className="mt-2"
        />
      </div>

      <input
        type="text"
        placeholder="Available Time (e.g., 8AM - 10AM)"
        required
        className="w-full p-2 border rounded-md"
        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
      />

      <textarea
        placeholder="Other Information (optional)"
        className="w-full p-2 border rounded-md"
        onChange={(e) =>
          setFormData({ ...formData, otherInfo: e.target.value })
        }
      ></textarea>

      <button type="submit" className="w-full bg-[#C65656] text-white">
        Apply Now
      </button>
    </form>
  );
};

export default BeATrainer;
