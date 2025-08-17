import React, { useEffect, useState } from "react";

const NewsletterSubscribers = () => {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("fit-access-token");

    fetch("https://fitness-app-server-six.vercel.app/newsletter-subscribers", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch subscribers");
        return res.json();
      })
      .then((data) => {
        setSubscribers(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <p className="text-center mt-10 text-gray-500">Loading subscribers...</p>
    );
  if (error)
    return (
      <p className="text-center mt-10 text-red-600 font-semibold">{error}</p>
    );

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded-2xl shadow-lg">
      {subscribers.length === 0 ? (
        <p className="text-center text-gray-600">No subscribers yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 divide-y divide-gray-200">
            <thead className="bg-[#C65656] text-white">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                  Name
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                  Email
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                  Subscribed At
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {subscribers.map(({ _id, name, email, subscribedAt }) => (
                <tr key={_id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 text-gray-800">{name}</td>
                  <td className="px-4 py-3 text-gray-800">{email}</td>
                  <td className="px-4 py-3 text-gray-500 text-sm">
                    {new Date(subscribedAt).toLocaleString()}
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

export default NewsletterSubscribers;
