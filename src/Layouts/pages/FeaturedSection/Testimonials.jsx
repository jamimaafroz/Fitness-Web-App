// src/components/Home/Testimonials.jsx

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const Testimonials = () => {
  const axiosSecure = useAxiosSecure();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axiosSecure.get("/reviews");
        setReviews(res.data);
      } catch (err) {
        console.error("Failed to fetch reviews", err);
      }
    };
    fetchReviews();
  }, [axiosSecure]);

  return (
    <section className="my-16 px-4 md:px-8 bg-gray-50 py-16 rounded-3xl">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#C65656]">
        💬 What Our Members Say
      </h2>

      <Swiper
        slidesPerView={1}
        spaceBetween={20}
        breakpoints={{
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        navigation
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        modules={[Navigation, Autoplay]}
        className="testimonial-swiper"
      >
        {reviews.map((review, idx) => (
          <SwiperSlide key={review._id}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="p-6 rounded-2xl shadow-lg h-full bg-white border border-[#f1f1f1] flex flex-col justify-between hover:scale-[1.02] transition-transform duration-300">
                <div className="flex flex-col items-center text-center">
                  <img
                    src={review.photo || "https://i.ibb.co/Z8hVNNk/user.png"}
                    alt={review.name}
                    className="w-16 h-16 rounded-full object-cover mb-4 shadow-sm"
                  />
                  <h3 className="text-xl font-semibold mb-1 text-[#C65656]">
                    {review.name}
                  </h3>
                  <p className="text-gray-600 text-sm italic">
                    "{review.comment}"
                  </p>
                </div>
                <div className="mt-4 text-sm text-gray-400 text-center">
                  Submitted by <strong>{review.email}</strong>
                </div>
              </Card>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Testimonials;
