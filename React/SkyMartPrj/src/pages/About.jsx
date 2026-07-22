import React, { useEffect } from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import AboutHero from "../components/AboutHero";
import AboutFeatures from "../components/AboutFeatures";
import AboutStory from "../components/AboutStory";
import AboutCTA from "../components/AboutCTA";

const Shop = () => {
  useEffect(()=>{
     window.scrollTo(0, 0);
  },[])
  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white">
      <Navbar />

      <main className="mx-auto flex w-full max-w-7xl flex-col gap-14 px-4 py-8 sm:px-6 lg:px-8">
         <AboutHero />
        <AboutFeatures />
        <AboutStory />
        <AboutCTA />
      </main>

      <Footer />
    </div>
  )
}

export default Shop