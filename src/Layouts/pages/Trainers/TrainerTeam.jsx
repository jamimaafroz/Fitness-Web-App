import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Link } from "react-router";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const TrainerTeam = () => {
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure(); // destructured fix

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
  }, [axiosSecure]);

  if (loading)
    return (
      <p className="text-center text-lg font-semibold mt-10">
        Loading trainers...
      </p>
    );

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-[#C65656] mb-12">
          Meet Our Trainers
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {trainers.map((trainer, index) => (
            <motion.div
              key={trainer._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white border rounded-xl shadow-lg p-5 flex flex-col"
            >
              <img
                src={trainer.image || "/default-profile.png"}
                alt={trainer.name}
                className="w-full h-52 object-cover rounded-md mb-4"
              />
              <h3 className="text-xl font-semibold text-[#C65656] mb-1">
                {trainer.name}
              </h3>
              <p className="text-sm text-gray-600 mb-2">
                {trainer.otherInfo ||
                  "Passionate and experienced fitness trainer."}
              </p>
              <p className="text-sm mb-2 font-medium text-gray-700">
                Experience: {trainer.experience || "N/A"} years
              </p>

              {/* Expertise (optional future field) */}
              {trainer.skills?.length > 0 && (
                <ul className="text-sm text-gray-600 list-disc list-inside mb-3">
                  {trainer.skills.map((skill, i) => (
                    <li key={i}>{skill}</li>
                  ))}
                </ul>
              )}

              {/* Slots */}
              <div className="mb-3">
                <p className="text-sm font-medium">Available Slots:</p>
                {trainer.days?.length > 0 ? (
                  <ul className="list-disc list-inside text-sm text-gray-700">
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

              {/* Social Links */}
              <div className="flex space-x-3 mb-4">
                {trainer.socials?.facebook && (
                  <a
                    href={trainer.socials.facebook}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FaFacebook className="text-blue-600 hover:scale-110 transition" />
                  </a>
                )}
                {trainer.socials?.twitter && (
                  <a
                    href={trainer.socials.twitter}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FaTwitter className="text-sky-400 hover:scale-110 transition" />
                  </a>
                )}
                {trainer.socials?.instagram && (
                  <a
                    href={trainer.socials.instagram}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FaInstagram className="text-pink-500 hover:scale-110 transition" />
                  </a>
                )}
              </div>

              {/* Know More Button */}
              <Link
                to={`/trainers/${trainer._id}`}
                className="mt-auto bg-[#C65656] hover:bg-[#a94545] text-white text-sm font-medium py-2 px-4 rounded text-center transition"
              >
                Know More
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrainerTeam;
