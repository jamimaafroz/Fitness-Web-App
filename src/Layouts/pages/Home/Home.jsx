// src/Layouts/pages/Home.jsx

import React from "react";
import Navbar from "../Navbar/Navbar";
import CustomHelmet from "../../../components/ui/Meta/CustomHelmet";
import Banner from "../Banner/Banner";
import FeaturedSection from "../FeaturedSection/FeaturedSection";
import AboutSection from "../AboutSection/AboutSection";
import TrainerTeam from "../Trainers/TrainerTeam";
import NewsletterSubscription from "../FeaturedSection/NewsletterSubscription";
import Testimonials from "../FeaturedSection/Testimonials";
import Features from "../FeaturedSection/Features";

const Home = () => {
  return (
    <>
      <CustomHelmet title="Home" />
      <Navbar />

      <main className="relative z-10">
        {/* Hero Banner */}
        <section className="relative">
          <Banner />
        </section>

        {/* Featured Section */}
        <section className="bg-gray-50 py-16">
          <FeaturedSection />
        </section>

        {/* About Section */}
        <section className="bg-white py-20">
          <AboutSection />
        </section>

        <section className="bg-gray-50 py-20">
          <Features />
        </section>
        {/* Trainer Team */}
        <section className="bg-gray-50 py-20">
          <TrainerTeam />
        </section>

        {/* Newsletter Subscription */}
        <section className="bg-white py-16">
          <NewsletterSubscription />
        </section>

        {/* Testimonials */}
        <section className="bg-gray-50 py-20">
          <Testimonials />
        </section>
      </main>
    </>
  );
};

export default Home;
