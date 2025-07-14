import React from "react";
import useAuth from "../../../Hooks/useAuth";
import BeATrainer from "../../../components/PirvateComponents/BeTrainer/BeTrainer";

// Dummy components or content for each section
const UserProfile = () => <p>This is your User Profile content ✨</p>;
const ActivityLog = () => <p>This is your Activity Log 📝</p>;
const BookedTrainer = () => <p>Here's your Booked Trainer info 👨‍🏫</p>;

const sectionComponents = {
  "User Profile": <UserProfile />,
  "Activity Log": <ActivityLog />,
  "Be A Trainer": <BeATrainer />,
  "Booked Trainer": <BookedTrainer />,
};

const SideVar = ({ section }) => {
  const { user } = useAuth();
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
