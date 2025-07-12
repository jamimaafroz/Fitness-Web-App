import React from "react";
import Navbar from "../Navbar/Navbar";
import CustomHelmet from "../../../components/ui/Meta/CustomHelmet";
import Banner from "../Banner/Banner";
import FeaturedSection from "../FeaturedSection/FeaturedSection";

const Home = () => {
  return (
    <>
      <section className="relative z-10">
        <CustomHelmet title="Home" />
        <Banner />
        <FeaturedSection></FeaturedSection>
      </section>
    </>
  );
};

export default Home;
