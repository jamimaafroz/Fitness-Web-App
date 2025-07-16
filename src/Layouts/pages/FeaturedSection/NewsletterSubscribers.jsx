import React, { useEffect, useState } from "react";

const NewsletterSubscribers = () => {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("fit-access-token"); // or wherever you store your JWT

    fetch("http://localhost:3000/newsletter-subscribers", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // this is crucial
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
    return <p className="text-center mt-10">Loading subscribers...</p>;
  if (error) return <p className="text-center mt-10 text-red-600">{error}</p>;

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded shadow-md">
      <h2 className="text-3xl font-bold mb-6 text-[#C65656]">
        Newsletter Subscribers
      </h2>
      {subscribers.length === 0 ? (
        <p>No subscribers yet.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-[#C65656] text-white">
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">
                Subscribed At
              </th>
            </tr>
          </thead>
          <tbody>
            {subscribers.map(({ _id, name, email, subscribedAt }) => (
              <tr key={_id} className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2">{name}</td>
                <td className="border border-gray-300 px-4 py-2">{email}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {new Date(subscribedAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default NewsletterSubscribers;
