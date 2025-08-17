import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useAuth from "../../../../Hooks/useAuth";
import { toast } from "react-toastify";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const trainerId = searchParams.get("trainerId");
  const trainerName = searchParams.get("trainerName") || "Unknown Trainer";
  const slot = searchParams.get("slot");
  const plan = searchParams.get("plan") || "Standard";
  const cost = Number(searchParams.get("cost")) || 0;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    if (!trainerId || !slot || !plan || !cost) {
      setError("Booking info incomplete!");
      return;
    }

    const card = elements.getElement(CardElement);
    if (!card) return setError("Card info not loaded!");

    setLoading(true);
    setError("");

    try {
      // 1️⃣ Create payment intent
      const { data } = await axiosSecure.post("/create-payment-intent", {
        amount: cost * 100,
      });

      // 2️⃣ Confirm payment
      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: { card },
      });

      if (result.error) throw new Error(result.error.message);
      if (result.paymentIntent.status !== "succeeded")
        throw new Error("Payment failed");

      // 3️⃣ Build booking & payment objects
      const commonData = {
        userEmail: user.email,
        userName: user.displayName || "Anonymous",
        trainerId,
        trainerName,
        slot,
        plan,
        amount: cost,
        transactionId: result.paymentIntent.id,
        date: new Date(),
      };

      const bookingData = {
        ...commonData,
        package: plan,
        status: "confirmed",
        createdAt: new Date(),
      };

      // 4️⃣ Save to backend
      await axiosSecure.post("/payments/save", commonData);
      await axiosSecure.post("/booked-trainers", bookingData);

      toast.success("Payment & booking successful!");
      navigate(`/dashboard/booked-trainer/${trainerId}`);
    } catch (err) {
      console.error(err);
      setError(err.message || "Payment failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md sm:max-w-lg md:max-w-xl w-full mx-auto mt-16 px-6 sm:px-10 py-8 bg-white border border-gray-200 rounded-2xl shadow-lg transition-all duration-300">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
        Enter Payment Info
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="p-4 rounded-lg border border-gray-300 bg-gray-50 shadow-sm">
          <CardElement
            options={{
              hidePostalCode: false,
              style: {
                base: {
                  fontSize: "16px",
                  color: "#1a202c",
                  fontFamily: "Inter, sans-serif",
                  "::placeholder": { color: "#a0aec0" },
                },
                invalid: { color: "#e53e3e" },
              },
            }}
          />
        </div>

        <button
          type="submit"
          disabled={!stripe || loading}
          className="w-full py-3 rounded-lg bg-[#C65656] text-white text-lg font-medium shadow-md hover:bg-[#a84242] transition-all duration-300 disabled:opacity-60"
        >
          {loading ? "Processing..." : `Pay $${cost}`}
        </button>

        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      </form>
    </div>
  );
};

export default PaymentForm;
