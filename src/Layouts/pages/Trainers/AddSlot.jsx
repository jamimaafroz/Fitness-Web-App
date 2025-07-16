// src/components/Trainer/AddSlot.jsx
import React, { useEffect, useState } from "react";
import Select from "react-select";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const daysOptions = [
  { value: "Monday", label: "Monday" },
  { value: "Tuesday", label: "Tuesday" },
  { value: "Wednesday", label: "Wednesday" },
  { value: "Thursday", label: "Thursday" },
  { value: "Friday", label: "Friday" },
  { value: "Saturday", label: "Saturday" },
  { value: "Sunday", label: "Sunday" },
];

const AddSlot = () => {
  const { user, trainerData } = useAuth(); // Assuming trainerData has previous info & availableDays
  const axiosSecure = useAxiosSecure();

  const [selectedDays, setSelectedDays] = useState([]);
  const [slotName, setSlotName] = useState("");
  const [slotTime, setSlotTime] = useState("");
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [otherInfo, setOtherInfo] = useState("");

  useEffect(() => {
    // Load admin classes for selection
    axiosSecure.get("/classes").then((res) => setClasses(res.data));
  }, [axiosSecure]);

  useEffect(() => {
    // Initialize days if trainerData exists
    if (trainerData?.availableDays) {
      const selected = daysOptions.filter((day) =>
        trainerData.availableDays.includes(day.value)
      );
      setSelectedDays(selected);
    }
  }, [trainerData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!slotName || !slotTime || !selectedClass || selectedDays.length === 0) {
      alert("Please fill all required fields");
      return;
    }

    const payload = {
      trainerEmail: user.email,
      trainerName: user.displayName,
      slotName,
      slotTime,
      days: selectedDays.map((d) => d.value),
      className: selectedClass.label,
      otherInfo,
    };

    try {
      await axiosSecure.post("/slots", payload);
      alert("Slot added successfully!");
      // Reset form if needed
      setSlotName("");
      setSlotTime("");
      setSelectedClass(null);
      setOtherInfo("");
      // Keep days read-only so no reset for that
    } catch (error) {
      console.error("Failed to add slot:", error);
      alert("Failed to add slot, try again.");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-6">Add New Slot</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Read-only trainer info */}
        <div>
          <label className="block font-semibold">Trainer Name</label>
          <input
            type="text"
            value={user.displayName}
            readOnly
            className="w-full border px-3 py-2 rounded bg-gray-100"
          />
        </div>
        <div>
          <label className="block font-semibold">Trainer Email</label>
          <input
            type="email"
            value={user.email}
            readOnly
            className="w-full border px-3 py-2 rounded bg-gray-100"
          />
        </div>

        {/* Days selection (read-only) */}
        <div>
          <label className="block font-semibold mb-1">Select Days</label>
          <Select
            isMulti
            options={daysOptions}
            value={selectedDays}
            isDisabled={true} // read-only
          />
        </div>

        {/* Slot Name */}
        <div>
          <label className="block font-semibold mb-1">Slot Name</label>
          <input
            type="text"
            value={slotName}
            onChange={(e) => setSlotName(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            placeholder="e.g., Morning Slot"
            required
          />
        </div>

        {/* Slot Time */}
        <div>
          <label className="block font-semibold mb-1">Slot Time</label>
          <input
            type="text"
            value={slotTime}
            onChange={(e) => setSlotTime(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            placeholder="e.g., 1 hour"
            required
          />
        </div>

        {/* Classes Dropdown */}
        <div>
          <label className="block font-semibold mb-1">Classes</label>
          <Select
            options={classes.map((c) => ({ label: c.name, value: c._id }))}
            value={selectedClass}
            onChange={setSelectedClass}
            placeholder="Select a class"
            isClearable
            required
          />
        </div>

        {/* Other Info */}
        <div>
          <label className="block font-semibold mb-1">
            Other Info (Optional)
          </label>
          <textarea
            value={otherInfo}
            onChange={(e) => setOtherInfo(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            rows={3}
            placeholder="Any extra details..."
          />
        </div>

        <button
          type="submit"
          className="bg-[#C65656] text-white px-6 py-2 rounded hover:bg-[#a94444]"
        >
          Add Slot
        </button>
      </form>
    </div>
  );
};

export default AddSlot;
