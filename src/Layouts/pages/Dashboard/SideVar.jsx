import React from "react";
import useAuth from "../../../Hooks/useAuth";
import BeATrainer from "../../../components/PirvateComponents/BeTrainer/BeTrainer";
import PaymentHistory from "./Payment/PaymentHistory";
import PendingTrainers from "../../../components/PirvateComponents/BeTrainer/PendingTrainer";
import MakeAdmin from "../../../components/PirvateComponents/makeAdmin";
import Profile from "../../../components/PirvateComponents/Profile/Profile";

// Dummy components or content for each section

const ActivityLog = () => <p>This is your Activity Log 📝</p>;
const BookedTrainer = () => <p>Here's your Booked Trainer info 👨‍🏫</p>;

const sectionComponents = {
  "User Profile": <Profile />,
  "Activity Log": <ActivityLog />,
  "Be A Trainer": <BeATrainer />,
  "Booked Trainer": <BookedTrainer />,
  Payment_History: <PaymentHistory />,
  "Pending Trainer Requests": <PendingTrainers />,
  "Make Admin": <MakeAdmin />,
};

const SideVar = ({ section }) => {
  const { user } = useAuth();

  // Protect Make Admin section by role check
  if (section === "Make Admin" && user?.role !== "admin") {
    return (
      <div className="text-center text-red-600 font-semibold p-6">
        ❌ You do not have permission to access this section.
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-4xl font-semibold mb-4 text-[#C65656] text-center">
        {section}
      </h1>
      {sectionComponents[section] || (
        <p>Welcome to the {user?.displayName || "user"}s dashboard!</p>
      )}
    </div>
  );
};

export default SideVar;
