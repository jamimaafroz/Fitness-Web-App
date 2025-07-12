import React from "react";
import Navbar from "../Navbar/Navbar";
import CustomHelmet from "../../../components/ui/Meta/CustomHelmet";
import Banner from "../Banner/Banner";

const Home = () => {
  return (
    <>
      <section className="relative z-10">
        <CustomHelmet title="Home" />
        <Banner />
      </section>
    </>
  );
};

export default Home;
