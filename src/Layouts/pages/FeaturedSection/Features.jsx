import React from "react";
import { motion } from "framer-motion";

const Features = () => {
  const features = [
    {
      title: "AI-Powered Workouts",
      desc: "Customized plans tailored to your fitness goals.",
      icon: "💪",
    },
    {
      title: "Expert Trainers",
      desc: "Certified trainers guiding you every step of the way.",
      icon: "🏋️‍♂️",
    },
    {
      title: "Real-Time Tracking",
      desc: "Visualize progress with dynamic charts & analytics.",
      icon: "📊",
    },
    {
      title: "Community Support",
      desc: "Stay motivated with a thriving fitness community.",
      icon: "🤝",
    },
    {
      title: "Meal Plans",
      desc: "Personalized nutrition plans for your body type.",
      icon: "🥗",
    },
    {
      title: "Challenges & Rewards",
      desc: "Push your limits and earn achievements.",
      icon: "🏆",
    },
  ];

  return (
    <section className="bg-white py-16 px-6 lg:px-12">
      <div className="max-w-6xl mx-auto text-center mb-10">
        <motion.h2
          className="text-2xl sm:text-3xl font-bold text-gray-800"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          What's In <span className="text-[#C65656]">ZenithFit?</span>
        </motion.h2>
        <motion.p
          className="mt-3 text-gray-600 max-w-xl mx-auto text-sm sm:text-base"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
        >
          Unlock your potential with modern fitness solutions designed to keep
          you consistent, motivated, and strong.
        </motion.p>
      </div>

      {/* Features Grid */}
      <motion.div
        className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        {features.map((feature, idx) => (
          <motion.div
            key={idx}
            className="bg-gray-50 rounded-xl shadow p-6 text-center hover:shadow-lg hover:-translate-y-1 transform transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            viewport={{ once: true }}
          >
            <div className="text-3xl mb-3">{feature.icon}</div>
            <h3 className="text-base sm:text-lg font-semibold text-[#C65656] mb-1.5">
              {feature.title}
            </h3>
            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
              {feature.desc}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Features;
