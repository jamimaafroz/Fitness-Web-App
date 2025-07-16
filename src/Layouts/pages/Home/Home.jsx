import React from "react";
import Navbar from "../Navbar/Navbar";
import CustomHelmet from "../../../components/ui/Meta/CustomHelmet";
import Banner from "../Banner/Banner";
import FeaturedSection from "../FeaturedSection/FeaturedSection";
import AboutSection from "../AboutSection/AboutSection";
import TrainerTeam from "../Trainers/TrainerTeam";
import NewsletterSubscription from "../FeaturedSection/NewsletterSubscription";

const Home = () => {
  return (
    <>
      <section className="relative z-10">
        <CustomHelmet title="Home" />
        <Banner />
        <FeaturedSection></FeaturedSection>
        <AboutSection />
        <TrainerTeam></TrainerTeam>
        <NewsletterSubscription></NewsletterSubscription>
      </section>
    </>
  );
};

export default Home;
