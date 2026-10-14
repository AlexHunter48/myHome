import { useEffect, useState } from "react";

import { MapPin, Home, Banknote, Search, Navigation } from "lucide-react";

import Modal from "../../components/ui/Modal";
import { useRef } from "react";
import StickySearch from "./StickySearch";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import formatPriceInput from "../../utils/formatInputCurrency";

export default function Hero() {
  const [whereQuery, setWhereQuery] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [showStickySearch, setShowStickySearch] = useState(false);

  const [type, setType] = useState("");
  const { isAuthenticated, profile } = useAuth();
  const navigate = useNavigate();

  function showHomes() {
    const params = new URLSearchParams();
    if (whereQuery) {
      params.set("location", whereQuery);
    }
    if (minPrice) {
      params.set("minPrice", minPrice);
    }
    if (maxPrice) {
      params.set("maxPrice", maxPrice);
    }
    if (type) {
      params.set("type", type);
    }
    navigate(`/properties?${params.toString()}`);
  }

  const searchRef = useRef(null);

  useEffect(function () {
    const searchElement = searchRef.current;
    if (!searchElement) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowStickySearch(!entry.isIntersecting);
      },
      {
        threshold: 0,
      },
    );

    observer.observe(searchElement);

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {showStickySearch && <StickySearch />}
      <Modal>
        <section className="relative rounded-3xl text-neutral-900 min-h-[680px] md:min-h-[560px]">
          <div className="absolute inset-0 bg-cover bg-right min-h-[580px] rounded-3xl overflow-hidden"></div>

          <div
            className="
            relative
            max-w-7xl
            mx-auto
            px-5 sm:px-6
            pt-12 pb-8
            md:pt-20 md:pb-32
            flex
            flex-col
            justify-between
            min-h-[680px]
            md:min-h-[560px]
          "
          >
            <div className="relative z-10 max-w-xl space-y-4 md:space-y-4">
              <h1 className="font-serif text-[2.5rem] leading-[1.18] tracking-tight text-(--color-text-primary) sm:text-5xl md:leading-[1.15] md:mb-1 lg:text-6xl">
                Find your next <br />
                home, directly <br />
                from{" "}
                <span className="text-[var(--color-primary)]">owners.</span>
              </h1>

              <p className="text-sm font-medium leading-6 text-stone-950 sm:text-base sm:leading-relaxed md:text-lg">
                Rent or buy trusted properties across Lagos.{" "}
                <br className="hidden min-[380px]:inline" />
                No middleman. No hidden fees.
              </p>
            </div>
            <div
              className="
              w-full
              max-w-4xl
              bg-white/95
              backdrop-blur-md
              rounded-2xl
              md:rounded-full
              p-2.5
              md:p-3
              shadow-xl
              border
              border-white/40
              flex
             flex-col
              md:flex-row
              items-center
              gap-1.5
              md:gap-2
              mt-4
              md:mt-3
            "
              ref={searchRef}
            >
              <div className="relative flex-1 w-full">
                <Modal.Open opens="where">
                  <div
                    className="
                    flex
                    items-center
                    gap-3
                    px-3
                    md:px-4
                    py-2.5
                    md:py-3
                    border-b
                    md:border-b-0
                    md:border-r
                    border-neutral-200
                    hover:bg-stone-100
                    rounded-2xl
                    md:rounded-full
                    transition
                    cursor-pointer
                  "
                  >
                    <div className="p-2 md:p-2.5 bg-[#EAF0EC] text-[#1b3b2b] rounded-full shrink-0">
                      <MapPin className="w-4 h-4 md:w-5 md:h-5" />
                    </div>

                    <div className="flex flex-col text-left w-full min-w-0">
                      <label className="text-xs font-semibold tracking-wide text-neutral-800 cursor-pointer">
                        Where?
                      </label>

                      <input
                        type="text"
                        value={whereQuery}
                        onChange={(e) => setWhereQuery(e.target.value)}
                        placeholder="Lagos, Lekki, Ikoyi..."
                        className="
                        text-sm
                        text-[var(--color-text-primary)]
                        placeholder:text-neutral-500
                        bg-transparent
                        focus:outline-none
                        w-full
                        font-medium
                      "
                      />
                    </div>
                  </div>
                </Modal.Open>

                <Modal.Window name="where" positionClasses="left-0">
                  <div className="space-y-2">
                    <p className="text-xs font-semibold text-neutral-500 px-3 py-1">
                      Suggested destinations
                    </p>

                    <button
                      type="button"
                      onClick={() => setWhereQuery("Nearby")}
                      className="
                      w-full
                      flex
                      items-center
                      gap-4
                      p-3
                      hover:bg-neutral-50
                      rounded-2xl
                      transition
                      text-left
                      group
                    "
                    >
                      <div className="p-3 bg-blue-50 text-blue-600 rounded-xl group-hover:bg-blue-100 transition">
                        <Navigation className="w-5 h-5" />
                      </div>

                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-neutral-800">
                          Nearby
                        </span>

                        <span className="text-xs text-neutral-500">
                          Find what's around you
                        </span>
                      </div>
                    </button>

                    {["Lekki", "Surulere", "Victoria Island"].map(
                      (location) => (
                        <button
                          key={location}
                          type="button"
                          onClick={() => setWhereQuery(location.toLowerCase())}
                          className="
                        w-full
                        flex
                        items-center
                        gap-4
                        p-3
                        hover:bg-neutral-50
                        rounded-2xl
                        transition
                        text-left
                        group
                      "
                        >
                          <div className="p-3 bg-[#EAF0EC] text-[#1b3b2b] rounded-xl group-hover:bg-[#d8e4dc] transition">
                            <MapPin className="w-5 h-5" />
                          </div>

                          <div className="flex flex-col">
                            <span className="text-sm font-semibold text-neutral-800">
                              {location}
                            </span>

                            <span className="text-xs text-neutral-500">
                              Popular destination
                            </span>
                          </div>
                        </button>
                      ),
                    )}
                  </div>
                </Modal.Window>
              </div>

              <div className="grid grid-cols-2 w-full md:contents">
                <div className="relative flex-1 w-full">
                  <Modal.Open opens="PropertyType">
                    <div
                      className="
                    flex
                    items-center
                    gap-3
                    px-3
                    md:px-4
                    py-2.5
                    md:py-3
                    border-r
                    border-neutral-200
                    hover:bg-stone-100
                    rounded-2xl
                    md:rounded-full
                    transition
                    cursor-pointer
                  "
                    >
                      <div className="hidden md:block p-2.5 bg-[#EAF0EC] text-[#1b3b2b] rounded-full shrink-0">
                        <Home className="w-5 h-5" />
                      </div>

                      <div className="flex flex-col text-left min-w-0">
                        <span className="text-xs font-semibold tracking-wide text-neutral-800">
                          <span className="md:hidden">Property</span>
                          <span className="hidden md:inline">
                            What are you looking for?
                          </span>
                        </span>

                        <span className="text-sm text-neutral-500 truncate">
                          <span className="md:hidden">Any type</span>
                          <span className="hidden md:inline">
                            Apartment, Duplex...
                          </span>
                        </span>
                      </div>
                    </div>
                  </Modal.Open>

                  <Modal.Window
                    name="PropertyType"
                    positionClasses="left-0 md:-left-8"
                  >
                    <div className="grid grid-cols-2 gap-2 p-1">
                      {["Apartment", "Duplex", "Terrace", "Penthouse"].map(
                        (type) => (
                          <button
                            key={type}
                            type="button"
                            className="
                          p-3
                          border
                          border-neutral-200
                          hover:border-[#1b3b2b]
                          hover:bg-[#EAF0EC]/40
                          rounded-xl
                          text-left
                          font-medium
                          text-sm
                          text-neutral-700
                          transition
                        "
                          >
                            {type}
                          </button>
                        ),
                      )}
                    </div>
                  </Modal.Window>
                </div>

                <div className="relative flex-1 w-full">
                  <Modal.Open opens="budget">
                    <div
                      className="
                    flex
                    items-center
                    gap-3
                    px-3
                    md:px-4
                    py-2.5
                    md:py-3
                    hover:bg-stone-100
                    rounded-2xl
                    md:rounded-full
                    transition
                    cursor-pointer
                  "
                    >
                      <div className="hidden md:block p-2.5 bg-[#EAF0EC] text-[#1b3b2b] rounded-full shrink-0">
                        <Banknote className="w-5 h-5" />
                      </div>

                      <div className="flex flex-col text-left min-w-0">
                        <span className="text-xs font-semibold tracking-wide text-neutral-800">
                          Budget
                        </span>

                        <span className="text-sm text-neutral-500 truncate">
                          {minPrice || maxPrice
                            ? `₦${minPrice || "0"} - ₦${maxPrice || "Any"}`
                            : "Any budget"}
                        </span>
                      </div>
                    </div>
                  </Modal.Open>

                  <Modal.Window
                    name="budget"
                    positionClasses="right-0 md:left-auto"
                  >
                    <div className="space-y-3 p-2">
                      <h4 className="text-xs font-semibold text-neutral-500 uppercase tracking-wide">
                        Price Range
                      </h4>

                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          inputMode="numeric"
                          value={formatPriceInput(minPrice)}
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, "");
                            setMinPrice(value);
                          }}
                          onClick={(e) => e.stopPropagation()}
                          placeholder="Min ₦"
                          className="
                                                            w-full
                                                            px-3
                                                            py-2
                                                            text-sm
                                                            border
                                                            border-neutral-200
                                                            rounded-xl
                                                            focus:outline-none
                                                            focus:ring-1
                                                            focus:ring-[#1b3b2b]
                                                          "
                        />

                        <input
                          type="text"
                          inputMode="numeric"
                          value={formatPriceInput(maxPrice)}
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, "");
                            setMaxPrice(value);
                          }}
                          onClick={(e) => e.stopPropagation()}
                          placeholder="Max ₦"
                          className="
                                                            w-full
                                                            px-3
                                                            py-2
                                                            text-sm
                                                            border
                                                            border-neutral-200
                                                            rounded-xl
                                                            focus:outline-none
                                                            focus:ring-1
                                                            focus:ring-[#1b3b2b]
                                                          "
                        />
                      </div>
                    </div>
                  </Modal.Window>
                </div>
              </div>

              <button
                type="button"
                onClick={showHomes}
                aria-label="Search"
                className="
                w-full
                md:w-auto
                p-3
                md:p-4
                bg-[#1b3b2b]
                hover:bg-[#142e21]
                text-white
                rounded-2xl
                md:rounded-full
                flex
                items-center
                justify-center
                transition-colors
                shadow-md
                shrink-0
                mt-1
                md:mt-0
              "
              >
                <Search className="w-5 h-5" />
              </button>
            </div>
          </div>
        </section>
      </Modal>
    </>
  );
}
