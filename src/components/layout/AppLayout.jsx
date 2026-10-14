import Hero from "../../features/home/Hero";
import Navbar from "./Navbar";
import modernHome from "../../assets/modern-home.webp";

import FeaturedHomes from "../../features/home/FeaturedHomes";
import ExploreLocations from "../../locations/ExploreLocations";
import Insights from "../../features/home/Insights";
import TrustSection from "../../features/home/TrustSection";
import HowItWorks from "../../features/home/HowItWorks";
import CTA from "../../features/home/CTA";
import Footer from "./Footer";

export default function AppLayout() {
  return (
    <div>
      <div className="relative">
        <div
          className="absolute inset-0 bg-no-repeat bg-cover bg-[position:65%_center] sm:bg-center"
          style={{ backgroundImage: `url(${modernHome})` }}
        />

        <div
          className="
      hidden md:block
      absolute inset-0
      bg-gradient-to-r
      from-[#F7F5F0]/85 from-0%
      via-[#F7F5F0]/80 via-30%
      to-transparent to-65%
    "
        />

        <div
          className="md:hidden absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(247,245,240,0.92) 0px, rgba(247,245,240,0.75) 340px, transparent 500px)",
          }}
        />

        <Navbar />

        <div>
          <Hero />
        </div>
      </div>
      <FeaturedHomes />
      <ExploreLocations />
      <Insights />
      <HowItWorks />
      {/* <CTA /> */}
      <Footer />
    </div>
  );
}
