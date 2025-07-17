import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useAuth from "../../../../Hooks/useAuth";
import { format } from "date-fns";

const PaymentHistory = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  // Fetch trainers
  const {
    data: trainers = [],
    isLoading: trainersLoading,
    isError: trainersError,
  } = useQuery({
    queryKey: ["trainers"],
    queryFn: () => axiosSecure.get("/trainers").then((res) => res.data),
    staleTime: 1000 * 60 * 5, // 5 mins cache
  });

  // Fetch payments for logged-in user
  const {
    data: payments = [],
    isLoading: paymentsLoading,
    isError: paymentsError,
  } = useQuery({
    queryKey: ["payments", user?.email],
    queryFn: () =>
      axiosSecure
        .get(`/payments/user?email=${user.email}`)
        .then((res) => res.data),
    enabled: !!user?.email, // only fetch if user email exists
  });

  // Helper: Get trainer name by ID (make sure _id and payment.trainerId are strings)
  const getTrainerName = (id) => {
    const trainer = trainers.find(
      (t) => t._id === id || t._id.toString() === id
    );
    return trainer ? trainer.name : "Unknown Trainer";
  };

  if (trainersLoading || paymentsLoading) {
    return (
      <p className="text-center mt-10 font-semibold text-gray-600">
        Loading payment history...
      </p>
    );
  }

  if (trainersError || paymentsError) {
    return (
      <p className="text-center mt-10 font-semibold text-red-600">
        Failed to load data. Please try again later.
      </p>
    );
  }

  if (payments.length === 0) {
    return (
      <p className="text-center mt-10 font-semibold text-gray-600">
        No payment history found.
      </p>
    );
  }

  return (
    <div className="max-w-5xl mx-auto mt-20 px-4">
      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="w-full table-auto border-collapse bg-white">
          <thead className="bg-[#C65656] text-white">
            <tr>
              <th className="p-3 text-left">#</th>
              <th className="p-3 text-left">Trainer</th>
              <th className="p-3 text-left">Slot</th>
              <th className="p-3 text-left">Plan</th>
              <th className="p-3 text-left">Amount</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Txn ID</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, idx) => (
              <tr key={payment._id} className="border-t hover:bg-gray-50">
                <td className="p-3">{idx + 1}</td>
                <td className="p-3">{getTrainerName(payment.trainerId)}</td>
                <td className="p-3">{payment.slot || "N/A"}</td>{" "}
                {/* fallback */}
                <td className="p-3">{payment.plan}</td>
                <td className="p-3">${(payment.amount / 100).toFixed(2)}</td>
                <td className="p-3">
                  {format(new Date(payment.date), "dd MMM yyyy")}
                </td>
                <td className="p-3 text-xs text-gray-500 break-all">
                  {payment.transactionId}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
