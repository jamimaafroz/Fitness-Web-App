import { Button } from "@/components/ui/button";
import { Navigate } from "react-router";

const AboutSection = () => {
  return (
    <section className="bg-white py-16 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left: Text Content */}
        <div className="text-left">
          <h2 className="text-4xl font-bold text-[#222] mb-4">
            About <span className="text-[#C65656]">Our Fitness Journey</span>
          </h2>
          <p className="text-gray-600 text-lg mb-6">
            At <strong>YourFitnessApp</strong>, we believe fitness is not just
            about lifting weights — it’s about lifting yourself. Whether you're
            a beginner or a beast, we’re here to guide you with AI-personalized
            workouts, expert trainers, real-time tracking, and a strong
            community that never lets you quit.
          </p>
          <p className="text-gray-600 mb-6">
            Founded in 2025, our mission is to make fitness accessible, fun, and
            deeply personal. No matter where you are, we’ve got the tools to
            help you grow stronger — physically and mentally.
          </p>
          <Button
            onClick={() => Navigate("/details")}
            className="bg-[#C65656] hover:bg-[#b94a4a] text-white text-base mt-2"
          >
            Learn More
          </Button>
        </div>

        {/* Right: Optional Image or Illustration */}
        <div className="w-full">
          <img
            src="https://i.ibb.co/d4J6b12s/jonathan-borba-lr-QPTQs7n-QQ-unsplash.jpg"
            alt="fitness mission"
            className="rounded-2xl shadow-md w-full object-cover max-h-[450px]"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
