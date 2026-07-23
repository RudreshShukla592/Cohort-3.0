import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import StatsSection from "../components/StatsSection";
import CategorySection from "../components/CategorySection";
import ProductSection from "../components/ProductSection";
import FeatureSection from "../components/FeatureSection";
import Footer from "../components/Footer";

const Home = () => {
  useEffect(()=>{
     window.scrollTo(0, 0);
  },[])
  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white">
      <Navbar />

      <main className="mx-auto flex w-full max-w-7xl flex-col gap-14 px-4 py-8 sm:px-6 lg:px-8">
        <HeroSection />

        <StatsSection />

        <CategorySection />

        <ProductSection />

        <FeatureSection />
      </main>

      <Footer />
    </div>
  );
};

export default Home;
