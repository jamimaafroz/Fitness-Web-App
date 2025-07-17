import React, { useState } from "react";
import Select from "react-select";
import { toast } from "react-toastify";
import { Button } from "../../ui/button";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useMutation } from "@tanstack/react-query";

const daysOptions = [
  { value: "Sunday", label: "Sunday" },
  { value: "Monday", label: "Monday" },
  { value: "Tuesday", label: "Tuesday" },
  { value: "Wednesday", label: "Wednesday" },
  { value: "Thursday", label: "Thursday" },
  { value: "Friday", label: "Friday" },
  { value: "Saturday", label: "Saturday" },
];

const skillsOptions = ["Yoga", "Cardio", "Strength", "Zumba", "Pilates"];

const initialFormState = {
  fullName: "",
  age: "",
  experience: "", // New field: Years of experience
  image: "",
  skills: [],
  days: [],
  time: "",
  otherInfo: "",
};

const BeATrainer = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [formData, setFormData] = useState(initialFormState);

  // TanStack mutation for form submission
  const mutation = useMutation({
    mutationFn: async (trainerData) => {
      const res = await axiosSecure.post("/trainers/apply", trainerData);
      return res.data;
    },
    onSuccess: (data) => {
      toast.success("Trainer application submitted successfully!", data);
      setFormData(initialFormState);
    },
    onError: (error) => {
      const message =
        error.response?.data?.message || "Failed to submit application.";
      toast.error(message);
      console.error("Error submitting trainer application:", error);
    },
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
      days: selectedOptions ? selectedOptions.map((opt) => opt.value) : [],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.experience ||
      isNaN(formData.experience) ||
      formData.experience < 0
    ) {
      return toast.error(
        "Please enter a valid number for years of experience."
      );
    }

    const trainerData = {
      ...formData,
      name: formData.fullName,
      email: user.email,
      status: "pending",
    };
    delete trainerData.fullName;

    mutation.mutate(trainerData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mt-24 mx-auto p-6 bg-white rounded-xl shadow-md space-y-4"
    >
      <h2 className="text-2xl font-bold text-[#C65656] text-center">
        Apply to Become a Trainer 💪
      </h2>

      <input
        type="text"
        placeholder="Full Name"
        required
        value={formData.fullName}
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
        min={1}
        value={formData.age}
        className="w-full p-2 border rounded-md"
        onChange={(e) => setFormData({ ...formData, age: e.target.value })}
      />

      {/* New: Years of Experience */}
      <input
        type="number"
        placeholder="Years of Experience"
        required
        min={0}
        value={formData.experience}
        className="w-full p-2 border rounded-md"
        onChange={(e) =>
          setFormData({ ...formData, experience: e.target.value })
        }
      />

      <input
        type="text"
        placeholder="Profile Image URL"
        required
        value={formData.image}
        className="w-full p-2 border rounded-md"
        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
      />

      <div>
        <p className="font-medium">Skills (select multiple):</p>
        <div className="flex flex-wrap gap-4 mt-2">
          {skillsOptions.map((skill) => (
            <label key={skill} className="flex items-center gap-2">
              <input
                type="checkbox"
                value={skill}
                checked={formData.skills.includes(skill)}
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
          isSearchable={false}
          onChange={handleSelectChange}
          value={daysOptions.filter((opt) => formData.days.includes(opt.value))}
          className="mt-2"
        />
      </div>

      <input
        type="text"
        placeholder="Available Time (e.g., 8AM - 10AM)"
        required
        value={formData.time}
        className="w-full p-2 border rounded-md"
        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
      />

      <textarea
        placeholder="Other Information (optional)"
        className="w-full p-2 border rounded-md"
        value={formData.otherInfo}
        onChange={(e) =>
          setFormData({ ...formData, otherInfo: e.target.value })
        }
      ></textarea>

      <Button
        type="submit"
        variant="default"
        size="lg"
        className="w-full border-[0.5px] border-[rgb(228,103,103)] text-[#C65656] shadow-2xl hover:cursor-pointer"
        disabled={mutation.isLoading}
      >
        {mutation.isLoading ? "Submitting..." : "Apply Now"}
      </Button>
    </form>
  );
};

export default BeATrainer;
