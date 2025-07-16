import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";
import { useSearchParams } from "react-router";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useAuth from "../../../../Hooks/useAuth";

const PaymentForm = () => {
  const stripe = useStripe();
  const { user } = useAuth();
  const elements = useElements();
  const [searchParams] = useSearchParams();
  const axiosSecure = useAxiosSecure();
  const trainerId = searchParams.get("trainerId");
  const slot = searchParams.get("slot");
  const plan = searchParams.get("plan");
  const cost = searchParams.get("cost");

  console.log("Trainer ID:", trainerId);
  console.log("Slot:", slot);
  console.log("Plan:", plan);
  console.log("Cost to pay:", cost);
  const amount = cost * 100;

  console.log("Amount in cents:", amount);

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setError(error.message);
      console.error("Error creating payment method:", error);
    } else {
      setError("");
      console.log("Payment method created successfully:", paymentMethod);
    }

    // Here you would typically send the paymentMethod.id to your server
    const res = await axiosSecure.post(`/create-payment-intent`, {
      amount: amount,
    });
    const clientSecret = res.data.clientSecret;

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: user.displayName,
          email: user.email, // Replace with actual customer name
        },
      },
    });
    if (result.error) {
      setError(result.error.message);
    } else {
      if (result.paymentIntent.status === "succeeded") {
        setError("");
        console.log("Payment successful!");
        console.log(result);
        // Optionally, you can handle post-payment actions here
        //payment hisatory
        const paymentData = {
          userEmail: user.email,
          trainerId,
          slot,
          plan,
          amount: cost * 100,
          transactionId: result.paymentIntent.id,
          date: new Date(),
        };

        await axiosSecure.post("/payments/save", paymentData);
      }
    }

    console.log("res from amount", res);
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
                  "::placeholder": {
                    color: "#a0aec0",
                  },
                },
                invalid: {
                  color: "#e53e3e",
                },
              },
            }}
          />
        </div>

        <button
          type="submit"
          disabled={!stripe}
          className="w-full py-3 rounded-lg bg-[#C65656] text-white text-lg font-medium shadow-md hover:bg-blue-700 transition-all duration-300 disabled:opacity-60"
        >
          Pay Now
        </button>
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      </form>
    </div>
  );
};

export default PaymentForm;
