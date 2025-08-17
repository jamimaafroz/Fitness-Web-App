import {
  Dumbbell,
  Users,
  CalendarCheck,
  Apple,
  Gauge,
  MessageCircleHeart,
} from "lucide-react";
import { Card, CardContent } from "../../../components/ui/card";

const features = [
  {
    title: "Personalized Workouts",
    desc: "AI-powered fitness plans tailored to your goals and schedule.",
    icon: <Dumbbell className="w-8 h-8 text-[#C65656]" />,
  },
  {
    title: "Expert Trainers",
    desc: "Train under certified pros who guide you every step of the way.",
    icon: <Users className="w-8 h-8 text-[#C65656]" />,
  },
  {
    title: "Meal Plans",
    desc: "Healthy, goal-based diet guides created by nutritionists.",
    icon: <Apple className="w-8 h-8 text-[#C65656]" />,
  },
  {
    title: "Track Your Progress",
    desc: "Visual graphs to monitor your fitness journey and stay motivated.",
    icon: <Gauge className="w-8 h-8 text-[#C65656]" />,
  },
  {
    title: "Join Challenges",
    desc: "Engage in fitness events and win rewards to keep motivation high.",
    icon: <CalendarCheck className="w-8 h-8 text-[#C65656]" />,
  },
  {
    title: "24/7 Support",
    desc: "Access trainers and peers anytime for guidance and support.",
    icon: <MessageCircleHeart className="w-8 h-8 text-[#C65656]" />,
  },
];

const FeaturedSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl sm:text-3xl font-bold text-gray-900 mb-3">
          Why Choose Us?
        </h2>
        <p className="text-gray-600 text-base sm:text-lg mb-10 max-w-2xl mx-auto">
          Features designed to elevate your fitness journey and keep you
          motivated.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <Card
              key={idx}
              className="rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-transform duration-300 transform hover:-translate-y-1 text-left bg-white"
            >
              <CardContent className="p-6">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-[#C65656] mb-1">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">{feature.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
