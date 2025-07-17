import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Balance = () => {
  const axiosSecure = useAxiosSecure();
  const [totalBalance, setTotalBalance] = useState(0);
  const [recentPayments, setRecentPayments] = useState([]);
  const [subscribersCount, setSubscribersCount] = useState(0);
  const [paidMembersCount, setPaidMembersCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch all payments (admin endpoint)
        const paymentsRes = await axiosSecure.get("/payments");
        const payments = paymentsRes.data;

        // Total balance sum
        const total = payments.reduce((acc, p) => acc + (p.amount || 0), 0);
        setTotalBalance(total);

        // Sort by date descending, take last 6
        const lastSix = payments
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .slice(0, 6);
        setRecentPayments(lastSix);

        // Fetch newsletter subscribers count
        const subsRes = await axiosSecure.get("/newsletter-subscribers");
        setSubscribersCount(subsRes.data.length);

        // Unique paid members count by userEmail
        const uniquePaidMembers = new Set(payments.map((p) => p.userEmail));
        setPaidMembersCount(uniquePaidMembers.size);

        setLoading(false);
      } catch (error) {
        toast.error("Failed to load balance data");
        console.error(error);
        setLoading(false);
      }
    }

    fetchData();
  }, [axiosSecure]);

  const chartData = {
    labels: ["Newsletter Subscribers", "Paid Members"],
    datasets: [
      {
        label: "Count",
        data: [subscribersCount, paidMembersCount],
        backgroundColor: ["#C65656", "#4CAF50"],
      },
    ],
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded-md shadow-md">
      <h2 className="text-3xl font-bold mb-6 text-center text-primary">
        Financial Overview 💰
      </h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading data...</p>
      ) : (
        <>
          <div className="mb-8 text-center">
            <p className="text-xl font-semibold">
              Total Remaining Balance:{" "}
              <span className="text-green-600">${totalBalance.toFixed(2)}</span>
            </p>
          </div>

          <div className="mb-10">
            <h3 className="text-2xl font-semibold mb-4">Recent Transactions</h3>
            {recentPayments.length === 0 ? (
              <p>No recent transactions found.</p>
            ) : (
              <table className="w-full border-collapse border border-gray-300">
                <thead className="bg-[#C65656] text-white">
                  <tr>
                    <th className="border border-gray-300 px-4 py-2 text-left">
                      User Email
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left">
                      Amount ($)
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left">
                      Plan
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {recentPayments.map((payment) => (
                    <tr key={payment._id} className="hover:bg-gray-100">
                      <td className="border border-gray-300 px-4 py-2">
                        {payment.userEmail}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        ${payment.amount?.toFixed(2) ?? "0.00"}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {payment.plan || "N/A"}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {new Date(payment.date).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          <div className="max-w-md mx-auto">
            <h3 className="text-2xl font-semibold mb-4 text-center">
              Subscribers vs Paid Members
            </h3>
            <Bar
              data={chartData}
              options={{
                responsive: true,
                plugins: { legend: { position: "top" } },
              }}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Balance;
