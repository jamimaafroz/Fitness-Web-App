import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const DetailsSection = () => {
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const [classes, setClasses] = useState([]);
  const [totalClasses, setTotalClasses] = useState(0);
  const [page, setPage] = useState(1);
  const [loadingClasses, setLoadingClasses] = useState(true);
  const [error, setError] = useState(null);
  const limit = 6;

  const fetchClasses = async (pageNum = 1) => {
    setLoadingClasses(true);
    try {
      const res = await axiosSecure.get(
        `/classes?page=${pageNum}&limit=${limit}`
      );
      setClasses(res.data?.classes || []);
      setTotalClasses(res.data?.totalCount || 0);
    } catch (err) {
      console.error("Failed to fetch classes:", err.response?.data || err);
      setError("Failed to load classes.");
    } finally {
      setLoadingClasses(false);
    }
  };

  useEffect(() => {
    fetchClasses(page);
  }, [page]);

  const totalPages = Math.ceil(totalClasses / limit);

  return (
    <section className="bg-white py-20 px-4">
      <div className="max-w-full mx-auto grid grid-cols-1 md:grid-cols-[70%_30%] gap-6 lg:gap-12">
        {/* Left: News-Article Style About Section */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="prose prose-lg text-gray-800"
        >
          <h1 className="text-4xl font-bold mb-4 text-[#C65656]">
            About Our Fitness Journey
          </h1>
          <div className="flex flex-col space-y-6">
            <p className="text-gray-700 text-lg">
              Founded in 2025, our mission is to make fitness accessible, fun,
              and personal. Wherever you are, we help you grow stronger —
              physically and mentally.
            </p>
            <p className="text-gray-700 text-lg">
              Beyond workouts and nutrition, we focus on empowering our
              community. Every program is designed to inspire consistency, build
              confidence, and cultivate a sustainable lifestyle. From beginner
              milestones to expert challenges, every member's journey is
              celebrated, making fitness not just a routine, but a story worth
              sharing.
            </p>
          </div>

          {/* Right Column: Image */}
          <div className="flex flex-col space-y-6">
            <img
              src="https://i.ibb.co/d4J6b12s/jonathan-borba-lr-QPTQs7n-QQ-unsplash.jpg"
              alt="fitness mission"
              className="rounded-2xl shadow-lg w-full object-cover max-h-[450px]"
            />
            {/* New paragraph under the image */}
            <p className="text-gray-700 text-lg">
              Our facilities are designed with every detail in mind — from
              state-of-the-art equipment to comfortable spaces that encourage
              focus and motivation. Whether you're training solo or with a
              group, each environment supports your growth and ensures you feel
              inspired every step of the way.
            </p>
          </div>
        </motion.div>

        {/* Right: Classes News Feed */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-[#C65656] mb-4 text-center lg:text-left">
            Latest Classes
          </h2>

          {loadingClasses ? (
            <p className="text-center text-gray-500">Loading classes...</p>
          ) : error ? (
            <p className="text-center text-red-600">{error}</p>
          ) : classes.length > 0 ? (
            classes.map((cls, idx) => (
              <motion.div
                key={cls._id}
                className="flex flex-col bg-gray-50 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-500 overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <img
                  src={cls.image || "/default-class.png"}
                  alt={cls.name || "Class"}
                  className="w-full h-32 object-cover"
                />
                <div className="p-3 flex flex-col justify-between">
                  <h3 className="text-lg font-semibold text-[#C65656] mb-1">
                    {cls.name || "Untitled Class"}
                  </h3>
                  <p className="text-gray-500 text-xs mb-2">
                    {cls.otherInfo || "Time: As per Trainer slot"} | Created:{" "}
                    {cls.createdAt
                      ? new Date(cls.createdAt).toLocaleDateString()
                      : "N/A"}
                  </p>
                  <p className="text-gray-600 text-sm">
                    {cls.details
                      ? cls.details.length > 100
                        ? cls.details.slice(0, 100) + "..."
                        : cls.details
                      : "No description available."}
                  </p>
                </div>
              </motion.div>
            ))
          ) : (
            <p className="text-gray-500 text-center">No classes available.</p>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-4 space-x-2 flex-wrap">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`px-3 py-1 rounded-md border transition ${
                    page === i + 1
                      ? "bg-[#C65656] text-white border-[#C65656]"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-[#C65656] hover:text-white"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default DetailsSection;
