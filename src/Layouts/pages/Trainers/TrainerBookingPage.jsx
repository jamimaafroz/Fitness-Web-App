import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { RadioGroup, RadioGroupItem } from "../../../components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { useLocation, useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import { cn } from "@/lib/utils"; // Ensure you have this utility

const packages = [
  {
    title: "Basic Membership",
    price: "$10",
    benefits: [
      "Access to gym facilities during regular hours",
      "Use of cardio & strength equipment",
      "Access to locker rooms and showers",
    ],
  },
  {
    title: "Standard Membership",
    price: "$50",
    benefits: [
      "All benefits of Basic",
      "Use of cardio & strength equipment",
      "Access to group fitness classes (yoga, spinning, Zumba)",
    ],
  },
  {
    title: "Premium Membership",
    price: "$100",
    benefits: [
      "All benefits of Standard",
      "Locker rooms, showers, sauna",
      "Discounts on massages and nutrition counseling",
      "Personal trainer sessions",
    ],
  },
];

const TrainerBookingPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const slot = searchParams.get("slot");

  const [selectedPlan, setSelectedPlan] = useState("");

  const handleJoinNow = () => {
    if (!selectedPlan) {
      toast.error("Please select a membership package.");
      return;
    }

    // Redirect to payment page with selected info
    console.log("Navigating to payment...");
    const selectedPackage = packages.find((pkg) => pkg.title === selectedPlan);
    const cost = selectedPackage?.price?.replace("$", "") || "0";
    console.log(slot, selectedPlan, cost);
    navigate(
      `/payment?trainerId=${id}&slot=${slot}&plan=${selectedPlan}&cost=${cost}`
    );
  };

  return (
    <section className="max-w-5xl mx-auto p-6 mt-24 space-y-6">
      <h2 className="text-3xl font-bold text-[#C65656] mb-4">
        Trainer Booking
      </h2>

      <Card>
        <CardContent className="p-6 space-y-2">
          <p>
            <strong>Trainer ID:</strong> {id}
          </p>
          <p>
            <strong>Selected Slot:</strong> {slot}
          </p>
          <p>
            <strong>Classes:</strong> HIIT, Yoga, Zumba, Strength Training
          </p>
        </CardContent>
      </Card>

      <h3 className="text-xl font-semibold text-[#C65656]">
        Choose Your Membership
      </h3>

      <RadioGroup value={selectedPlan} onValueChange={setSelectedPlan}>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {packages.map((pkg, idx) => (
            <label
              key={idx}
              htmlFor={`plan-${idx}`}
              className={cn(
                "cursor-pointer border rounded-lg p-6 flex flex-col justify-between shadow-md transition-transform hover:scale-[1.02] duration-200",
                selectedPlan === pkg.title
                  ? "border-[#C65656] bg-[#fee2e2]"
                  : "border-gray-200 bg-white"
              )}
            >
              <CardHeader className="p-0 mb-3">
                <CardTitle className="text-2xl text-[#C65656] font-bold">
                  {pkg.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="p-0 text-gray-700 flex-grow mb-4">
                <ul className="list-disc pl-5 text-sm leading-relaxed space-y-1">
                  {pkg.benefits.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </CardContent>

              <div className="flex items-center justify-between">
                <RadioGroupItem
                  id={`plan-${idx}`}
                  value={pkg.title}
                  className="w-6 h-6 border border-[#C65656] cursor-pointer"
                />
                <p className="font-semibold text-lg text-[#C65656]">
                  {pkg.price}
                </p>
              </div>
            </label>
          ))}
        </div>
      </RadioGroup>

      <div className="flex justify-center">
        <Button
          onClick={handleJoinNow}
          className="mt-6 bg-[#C65656] hover:bg-[#a84242] text-white w-full max-w-xs"
        >
          Join Now
        </Button>
      </div>
    </section>
  );
};

export default TrainerBookingPage;
