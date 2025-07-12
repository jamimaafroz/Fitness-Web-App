import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useNavigate } from "react-router";

const Banner = () => {
  const navigate = useNavigate();

  const slides = [
    {
      title: "Push Your Limits",
      desc: "Join our strength training classes and become your strongest self 💪",
      bg: "https://i.ibb.co/bRF71ngL/gabin-vallet-J154n-Ekpzl-Q-unsplash.jpg",
    },
    {
      title: "Train With Experts",
      desc: "Our certified trainers are here to guide you every step of the way 🏋️‍♀️",
      bg: "https://i.ibb.co/d0WvmCPX/bruce-mars-g-Jt-Dg6-Wf-Ml-Q-unsplash.jpg",
    },
    {
      title: "Sweat Now, Shine Later",
      desc: "Achieve your dream body with our personalized fitness plans ✨",
      bg: "https://i.ibb.co/JgxP10J/anupam-mahapatra-Vz0-Rbclz-G-w-unsplash.jpg",
    },
  ];

  return (
    <section className="relative z-auto">
      <Carousel
        autoPlay
        infiniteLoop
        interval={4000}
        showThumbs={false}
        showStatus={false}
        showArrows
        stopOnHover
      >
        {slides.map((slide, index) => (
          <div key={index} className="relative h-[70vh] md:h-[100vh] w-full">
            <img
              src={slide.bg}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/60 flex flex-col justify-center items-center text-center px-6">
              <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4 drop-shadow-lg">
                {slide.title}
              </h2>
              <p className="text-white max-w-2xl mb-6 text-lg md:text-xl drop-shadow">
                {slide.desc}
              </p>
              <button
                onClick={() => navigate("/classes")}
                className="bg-[#C65656] hover:bg-[#9e4848] text-white px-6 py-3 rounded-lg font-semibold transition duration-300"
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
