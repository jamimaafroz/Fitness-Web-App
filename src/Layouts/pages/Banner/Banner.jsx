import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useNavigate } from "react-router";

const Banner = () => {
  const navigate = useNavigate();

  const slides = [
    {
      title: "Elevate Your Strength",
      desc: "Professional training programs tailored to help you achieve peak performance.",
      bg: "https://i.ibb.co/bRF71ngL/gabin-vallet-J154n-Ekpzl-Q-unsplash.jpg",
    },
    {
      title: "Train With Experts",
      desc: "Certified trainers providing guidance, motivation, and personalized plans.",
      bg: "https://i.ibb.co/d0WvmCPX/bruce-mars-g-Jt-Dg6-Wf-Ml-Q-unsplash.jpg",
    },
    {
      title: "Achieve Your Goals",
      desc: "Transform your fitness journey with structured routines and expert support.",
      bg: "https://i.ibb.co/JgxP10J/anupam-mahapatra-Vz0-Rbclz-G-w-unsplash.jpg",
    },
  ];

  return (
    <section className="relative w-full pt-8 md:pt-16">
      <Carousel
        autoPlay
        infiniteLoop
        interval={4500}
        showThumbs={false}
        showStatus={false}
        showArrows
        stopOnHover
        emulateTouch
      >
        {slides.map((slide, index) => (
          <div key={index} className="relative h-[70vh] md:h-[90vh] w-full">
            {/* Background */}
            <img
              src={slide.bg}
              alt={slide.title}
              className="w-full h-full object-cover"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40"></div>

            {/* Text Content */}
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6 md:px-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-4 md:mb-6 drop-shadow-lg">
                {slide.title}
              </h2>
              <p className="text-white max-w-2xl text-base sm:text-lg md:text-xl mb-6 drop-shadow-md">
                {slide.desc}
              </p>
              <button
                onClick={() => navigate("/classes")}
                className="bg-[#C65656] hover:bg-[#a84242] text-white px-6 py-3 md:px-8 md:py-4 rounded-lg font-semibold text-sm md:text-base transition duration-300 shadow-lg hover:shadow-xl"
              >
                Explore Classes
              </button>
            </div>
          </div>
        ))}
      </Carousel>
    </section>
  );
};

export default Banner;
