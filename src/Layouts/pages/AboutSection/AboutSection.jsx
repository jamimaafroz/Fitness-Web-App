import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";

const AboutSection = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-white py-20 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left: Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            About <span className="text-[#C65656]">Our Fitness Journey</span>
          </h2>
          <p className="text-gray-600 text-lg mb-6">
            At <strong>YourFitnessApp</strong>, fitness is more than lifting
            weights — it’s about lifting yourself. From beginners to pros, we
            guide you with AI-personalized workouts, expert trainers, real-time
            tracking, and a strong community.
          </p>
          <p className="text-gray-600 mb-6">
            Founded in 2025, our mission is to make fitness accessible, fun, and
            personal. Wherever you are, we help you grow stronger — physically
            and mentally.
          </p>
          <Button
            onClick={() => navigate("/details")}
            className="bg-[#C65656] hover:bg-[#b94a4a] text-white text-base mt-2"
          >
            Learn More
          </Button>
        </motion.div>

        {/* Right: Image */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <img
            src="https://i.ibb.co/d4J6b12s/jonathan-borba-lr-QPTQs7n-QQ-unsplash.jpg"
            alt="fitness mission"
            className="rounded-2xl shadow-lg w-full object-cover max-h-[450px]"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
