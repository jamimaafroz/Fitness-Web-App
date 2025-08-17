// src/components/Dashboard/SideVar.jsx
import React, { useState, useEffect } from "react";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

import BeATrainer from "../../../components/PirvateComponents/BeTrainer/BeTrainer";
import PaymentHistory from "./Payment/PaymentHistory";
import PendingTrainers from "../../../components/PirvateComponents/BeTrainer/PendingTrainer";
import MakeAdmin from "../../../components/PirvateComponents/makeAdmin";
import Profile from "../../../components/PirvateComponents/Profile/Profile";
import ActivityLog from "../../../components/PirvateComponents/ActivityLog/ActivityLog";
import ManageSlots from "../Trainers/ManageSlots";
import AddSlot from "../Trainers/AddSlot";
import AddForum from "../Trainers/AddForum";
import BookedTrainer from "../../../components/PirvateComponents/BookedTrainer";
import NewsletterSubscribers from "../FeaturedSection/NewsletterSubscribers";
import Balance from "./Payment/Balance";
import AddClass from "../../../components/PirvateComponents/AddClass";

const SideVar = ({ section }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [trainerId, setTrainerId] = useState(null);
  const [loadingTrainerId, setLoadingTrainerId] = useState(true);

  // Fetch trainer ID linked to the logged-in user's email
  useEffect(() => {
    if (user?.email) {
      setLoadingTrainerId(true);
      axiosSecure
        .get(`/trainers?email=${user.email}`)
        .then((res) => {
          setTrainerId(res.data?.[0]?._id || null);
        })
        .catch((err) => {
          console.error("Error fetching trainerId:", err);
          setTrainerId(null);
        })
        .finally(() => setLoadingTrainerId(false));
    } else {
      setTrainerId(null);
      setLoadingTrainerId(false);
    }
  }, [user, axiosSecure]);

  // Access control messages
  const accessDeniedMessage = (msg) => (
    <div className="text-center text-red-600 font-semibold p-6 border border-red-200 rounded-md bg-red-50">
      ❌ {msg}
    </div>
  );

  if (section === "Activity Log" && ["trainer", "admin"].includes(user?.role))
    return accessDeniedMessage(
      "Trainers and Admins cannot access Activity Log."
    );

  if (section === "Make Admin" && user?.role !== "admin")
    return accessDeniedMessage(
      "You do not have permission to access Make Admin."
    );

  if (section === "Add Class" && user?.role !== "admin")
    return accessDeniedMessage(
      "You do not have permission to access Add Class."
    );

  if (section === "Total Balance" && user?.role !== "admin")
    return accessDeniedMessage(
      "You do not have permission to access Total Balance."
    );

  if (section === "Newsletter Subscribers" && user?.role !== "admin")
    return accessDeniedMessage(
      "You do not have permission to access Newsletter Subscribers."
    );

  if (loadingTrainerId)
    return (
      <div className="text-center p-6 text-gray-600 font-semibold">
        Loading user info...
      </div>
    );

  // Section components
  const sectionComponents = {
    "User Profile": <Profile />,
    "Activity Log": <ActivityLog />,
    "Be A Trainer": <BeATrainer />,
    "Booked Trainer": <BookedTrainer trainerId={trainerId} />,
    "Payment History": <PaymentHistory />,
    "Pending Trainer Requests": <PendingTrainers />,
    "Make Admin": <MakeAdmin />,
    Forum: <AddForum />,
    "Manage Slots": <ManageSlots />,
    "Add Slot": <AddSlot />,
    "Newsletter Subscribers": <NewsletterSubscribers />,
    "Total Balance": <Balance />,
    "Add Class": <AddClass />,
  };

  return (
    <div className="flex-1 w-full min-h-[calc(100vh-100px)] px-4 sm:px-8 py-6 bg-gray-50">
      <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        {/* Section Title */}
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center text-[#C65656]">
          {section}
        </h1>

        {/* Section Content */}
        <div className="space-y-6">
          {sectionComponents[section] || (
            <p className="text-center text-gray-600 text-lg">
              Welcome, {user?.displayName || "user"}! Select a section from the
              sidebar.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SideVar;
