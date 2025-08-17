import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Link } from "react-router";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const TrainerTeam = () => {
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure
      .get("/trainers")
      .then((res) => setTrainers(res.data))
      .catch((err) => console.error("JWT failed:", err.response?.data || err))
      .finally(() => setLoading(false));
  }, [axiosSecure]);

  if (loading)
    return (
      <p className="text-center text-lg font-semibold mt-10 text-gray-500">
        Loading trainers...
      </p>
    );

  return (
    <section className="py-16 md:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-[#C65656] mb-12">
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
              className="bg-white border border-gray-200 rounded-2xl shadow-lg flex flex-col overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={trainer.image || "/default-profile.png"}
                alt={trainer.name}
                className="w-full h-56 sm:h-64 md:h-60 object-cover"
              />
              <div className="p-5 flex flex-col flex-1">
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

                {trainer.skills?.length > 0 && (
                  <ul className="text-sm text-gray-600 list-disc list-inside mb-3">
                    {trainer.skills.map((skill, i) => (
                      <li key={i}>{skill}</li>
                    ))}
                  </ul>
                )}

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

                <div className="flex space-x-3 mb-4">
                  {trainer.socials?.facebook && (
                    <a
                      href={trainer.socials.facebook}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 hover:scale-110 transition-transform duration-200"
                    >
                      <FaFacebook size={20} />
                    </a>
                  )}
                  {trainer.socials?.twitter && (
                    <a
                      href={trainer.socials.twitter}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sky-400 hover:scale-110 transition-transform duration-200"
                    >
                      <FaTwitter size={20} />
                    </a>
                  )}
                  {trainer.socials?.instagram && (
                    <a
                      href={trainer.socials.instagram}
                      target="_blank"
                      rel="noreferrer"
                      className="text-pink-500 hover:scale-110 transition-transform duration-200"
                    >
                      <FaInstagram size={20} />
                    </a>
                  )}
                </div>

                <Link
                  to={`/trainers/${trainer._id}`}
                  className="mt-auto bg-[#C65656] hover:bg-[#a94545] text-white text-sm font-medium py-2 px-4 rounded-lg text-center transition-colors duration-300"
                >
                  Know More
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrainerTeam;
