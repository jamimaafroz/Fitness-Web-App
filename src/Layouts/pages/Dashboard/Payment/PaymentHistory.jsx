import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useAuth from "../../../../Hooks/useAuth";
import { format } from "date-fns"; // ✅ correct date formatter

const PaymentHistory = () => {
  const [payments, setPayments] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  // Fetch all trainers once to map trainerId to trainer name
  useEffect(() => {
    axiosSecure
      .get("/trainers")
      .then((res) => setTrainers(res.data))
      .catch((err) => console.error("Failed to fetch trainers:", err));
  }, [axiosSecure]);

  // Fetch payments
  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/payments/user?email=${user.email}`)
        .then((res) => setPayments(res.data))
        .catch((err) => console.error("Failed to fetch payment history:", err))
        .finally(() => setLoading(false));
    }
  }, [user, axiosSecure]);

  // Helper: Get trainer name by ID
  const getTrainerName = (id) => {
    const trainer = trainers.find((t) => t._id === id);
    return trainer ? trainer.name : "Unknown Trainer";
  };

  if (loading) {
    return (
      <p className="text-center mt-10 font-semibold text-gray-600">
        Loading payments...
      </p>
    );
  }

  return (
    <div className="max-w-5xl mx-auto mt-20 px-4">
      {payments.length === 0 ? (
        <p className="text-center text-gray-600">No payment history found.</p>
      ) : (
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
                  <td className="p-3">{payment.slot}</td>
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
      )}
    </div>
  );
};

export default PaymentHistory;
