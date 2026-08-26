import Hero from "../../features/home/Hero";
import Navbar from "./Navbar";
import modernHome from "../../assets/modern-home.png";

import FeaturedHomes from "../../features/home/FeaturedHomes";

export default function AppLayout() {
  return (
    <div>
      <div className="relative">
        <div
          className="absolute inset-0 bg-cover bg-center"
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
          className="
    md:hidden
    absolute inset-x-0 top-0 h-[420px]
    bg-gradient-to-b
    from-[#F7F5F0]/75 from-0%
    via-[#F7F5F0]/60 via-65%
    to-transparent to-100%
  "
        />

        <Navbar />

        <div className="overflow-scroll">
          <Hero />
        </div>
      </div>
      <FeaturedHomes />
    </div>
  );
}
