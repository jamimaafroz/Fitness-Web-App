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
          if (res.data.length > 0) {
            setTrainerId(res.data[0]._id);
          } else {
            setTrainerId(null);
          }
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

  // Access control for Activity Log (only members)
  if (
    section === "Activity Log" &&
    (user?.role === "trainer" || user?.role === "Admin")
  ) {
    return (
      <div className="text-center text-red-600 font-semibold p-6">
        ❌ Trainers and Admins cannot access Activity Log.
      </div>
    );
  }

  // Make Admin exclusive for admins
  if (section === "Make Admin" && user?.role !== "Admin") {
    return (
      <div className="text-center text-red-600 font-semibold p-6">
        ❌ You do not have permission to access Make Admin.
      </div>
    );
  }
  //Add class: Only admin can access
  if (section === "Add Class" && user?.role !== "Admin") {
    return (
      <div className="text-center text-red-600 font-semibold p-6">
        ❌ You do not have permission to access Add Class.
      </div>
    );
  }
  // Balance & Payment History: Only admin can access
  if (section === "Total Balance" && user?.role !== "Admin") {
    return (
      <div className="text-center text-red-600 font-semibold p-6">
        ❌ You do not have permission to access Make Admin.
      </div>
    );
  }

  // Newsletter Subscribers - Admin only
  if (section === "Newsletter Subscribers" && user?.role !== "Admin") {
    return (
      <div className="text-center text-red-600 font-semibold p-6">
        ❌ You do not have permission to access Newsletter Subscribers.
      </div>
    );
  }

  if (loadingTrainerId) {
    return (
      <div className="text-center p-6 text-gray-600 font-semibold">
        Loading user info...
      </div>
    );
  }

  // Build the section components here, now that you have trainerId
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
    "Newsletter Subscribers": <NewsletterSubscribers />, // NEW COMPONENT
    "Total Balance": <Balance />,
    "Add Class": <AddClass></AddClass>, // NEW COMPONENT
  };

  return (
    <div className="w-full min-h-[calc(100vh-100px)] px-4 sm:px-8 py-6">
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl md:text-4xl font-semibold mb-6 text-center text-[#C65656]">
          {section}
        </h1>
        {sectionComponents[section] || (
          <p className="text-center text-gray-600">
            Welcome to {user?.displayName || "User"}'s dashboard!
          </p>
        )}
      </div>
    </div>
  );
};

export default SideVar;
