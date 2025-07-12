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
    desc: "Get AI-powered fitness plans tailored to your goals and schedule.",
    icon: <Dumbbell className="w-8 h-8 text-[#C65656]" />,
  },
  {
    title: "Expert Trainers",
    desc: "Train under certified pros who guide you every step of the way.",
    icon: <Users className="w-8 h-8 text-[#C65656]" />,
  },
  {
    title: "Meal Plans",
    desc: "Access healthy, goal-based diet guides created by nutritionists.",
    icon: <Apple className="w-8 h-8 text-[#C65656]" />,
  },
  {
    title: "Track Your Progress",
    desc: "Visual graphs to see your fitness journey and stay motivated.",
    icon: <Gauge className="w-8 h-8 text-[#C65656]" />,
  },
  {
    title: "Join Challenges",
    desc: "Stay engaged with fitness events and win cool rewards.",
    icon: <CalendarCheck className="w-8 h-8 text-[#C65656]" />,
  },
  {
    title: "24/7 Support",
    desc: "Get help from trainers & peers whenever you need it.",
    icon: <MessageCircleHeart className="w-8 h-8 text-[#C65656]" />,
  },
];

const FeaturedSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-[#222] mb-4">Why Choose Us?</h2>
        <p className="text-gray-600 text-lg mb-12">
          Unlock your best self with features crafted to power your fitness
          journey.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <Card
              key={idx}
              className="rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 text-left"
            >
              <CardContent className="p-6">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-[#C65656] mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
