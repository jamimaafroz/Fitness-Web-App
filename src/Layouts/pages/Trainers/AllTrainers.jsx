import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const AllTrainers = () => {
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure
      .get("/trainers")
      .then((res) => {
        setTrainers(res.data);
      })
      .catch((err) => {
        console.error("JWT failed:", err.response?.data || err);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center mt-10">Loading trainers...</p>;

  return (
    <div className="max-w-7xl mx-auto p-4 mt-24 mb-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {trainers.map((trainer) => (
        <div
          key={trainer._id}
          className="border rounded-lg shadow p-4 flex flex-col"
        >
          <img
            src={trainer.image || "/default-profile.png"}
            alt={trainer.name}
            className="w-full h-48 object-cover rounded-md mb-4"
          />
          <h3 className="text-xl font-semibold mb-2">{trainer.name}</h3>
          <p className="mb-1">
            Experience: {trainer.experience || "N/A"} years
          </p>
          <p className="mb-2 text-sm text-gray-600">
            {trainer.otherInfo || ""}
          </p>

          {/* Social Icons (add if you have URLs in your data) */}
          <div className="flex space-x-4 mb-4">
            {/* Example icons, conditionally render if URLs exist */}
            {trainer.socials?.facebook && (
              <a
                href={trainer.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook className="w-5 h-5 text-blue-600" />
              </a>
            )}
            {trainer.socials?.twitter && (
              <a
                href={trainer.socials.twitter}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTwitter className="w-5 h-5 text-blue-400" />
              </a>
            )}
            {trainer.socials?.instagram && (
              <a
                href={trainer.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram className="w-5 h-5 text-pink-500" />
              </a>
            )}
          </div>

          {/* Available Slots */}
          <div className="mb-4">
            <p className="font-medium">Available Slots:</p>
            {trainer.days && trainer.days.length > 0 ? (
              <ul className="list-disc list-inside text-sm">
                {trainer.days.map((day, i) => (
                  <li key={i}>
                    {day} - {trainer.time || "Time not set"}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500">No slots available</p>
            )}
          </div>

          {/* Know More Button */}
          <Link
            to={`/trainers/${trainer._id}`}
            className="mt-auto inline-block bg-[#C65656] text-white py-2 px-4 rounded hover:bg-[#a94545] text-center"
          >
            Know More
          </Link>
        </div>
      ))}
    </div>
  );
};

export default AllTrainers;
