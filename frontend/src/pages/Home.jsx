/* eslint-disable no-unused-vars */
import React from "react";
import Hero from "../components/Hero";
import AnnouncementBanner from "../components/AnnouncementBanner";
import Card from "../components/Card";
import RegistrySearch from "../components/RegistrySearch";
import WhyIPET from "../components/WhyIPET";
import StatisticsSection from "../components/StaticticSection";
import Banner from "../components/Banner";
import Testimonial from "../components/TestMonial";
import LogoSection from "../components/LogoSection";
import UnderDesign from "./UnderDesign";

const Home = () => {
  return (
    <>
     {/* <UnderDesign /> */}
      <Hero />
      <AnnouncementBanner />
      <Card />
      <RegistrySearch />
      <WhyIPET />
      <StatisticsSection />
      <Banner />
      <Testimonial />
      <LogoSection />
    </>
  );
};

export default Home;
