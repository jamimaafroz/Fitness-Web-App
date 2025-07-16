import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useAuth from "../../../../Hooks/useAuth";

const PaymentForm = () => {
  const stripe = useStripe();
  const { user } = useAuth();
  const elements = useElements();
  const [searchParams] = useSearchParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const trainerId = searchParams.get("trainerId");
  const slot = searchParams.get("slot");
  const plan = searchParams.get("plan");
  const cost = searchParams.get("cost");

  const amount = Number(cost) * 100; // Convert to cents

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setLoading(true);
    const card = elements.getElement(CardElement);
    if (!card) return;

    const { error: pmError } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (pmError) {
      setError(pmError.message);
      setLoading(false);
      return;
    } else {
      setError("");
    }

    try {
      // Create payment intent on server
      const res = await axiosSecure.post(`/create-payment-intent`, {
        amount,
      });
      const clientSecret = res.data.clientSecret;

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card,
          billing_details: {
            name: user?.displayName || "Anonymous",
            email: user?.email || "no-email@example.com",
          },
        },
      });

      if (result.error) {
        setError(result.error.message);
        setLoading(false);
        return;
      }

      if (result.paymentIntent.status === "succeeded") {
        setError("");
        console.log("Payment successful!", result);

        // Save booking/payment info to backend
        const paymentData = {
          userEmail: user.email,
          trainerId,
          slot,
          plan,
          amount: Number(cost), // store as dollars
          transactionId: result.paymentIntent.id,
          date: new Date(),
        };

        const saveRes = await axiosSecure.post("/payments/save", paymentData);
        if (saveRes.status === 201) {
          // Redirect to booked trainer page
          navigate(`/dashboard/booked-trainer/${trainerId}`);
        } else {
          setError("Failed to save booking info");
        }
      }
    } catch (err) {
      console.error(err);
      setError("Payment failed. Please try again.");
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
          {loading ? "Processing..." : "Pay Now"}
        </button>

        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      </form>
    </div>
  );
};

export default PaymentForm;
