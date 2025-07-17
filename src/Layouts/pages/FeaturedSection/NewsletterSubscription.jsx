import React, { useState } from "react";

const NewsletterSubscription = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setMessage(null);

    if (!name.trim() || !email.trim()) {
      setMessage({ type: "error", text: "Name and Email are required." });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        "https://fitness-app-server-six.vercel.app/newsletter-subscribe",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email }),
        }
      );

      if (res.ok) {
        setMessage({ type: "success", text: "Thanks for subscribing!" });
        setName("");
        setEmail("");
      } else {
        const data = await res.json();
        setMessage({
          type: "error",
          text: data.error || "Subscription failed.",
        });
      }
    } catch (err) {
      setMessage({
        type: "error",
        text: "Network error, try again later.",
        err,
      });
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto p-6  rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-[#C65656]">
        Subscribe to our Newsletter
      </h2>
      <form onSubmit={handleSubscribe} className="space-y-4">
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded"
          required
          disabled={loading}
        />
        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded"
          required
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-[#C65656] text-white rounded font-semibold hover:bg-[#a84242] transition"
        >
          {loading ? "Subscribing..." : "Subscribe Now"}
        </button>
      </form>
      {message && (
        <p
          className={`mt-4 text-center font-semibold ${
            message.type === "success" ? "text-green-600" : "text-red-600"
          }`}
        >
          {message.text}
        </p>
      )}
    </div>
  );
};

export default NewsletterSubscription;
