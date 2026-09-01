import {
  MapPin,
  Home,
  Banknote,
  Search,
  CircleUserRound,
  Menu,
  Heart,
  Navigation,
} from "lucide-react";
import { Link } from "react-router-dom";
import myhome from "../../assets/myhome-logo-exact.svg";
import Modal from "../../components/ui/Modal";
import { useState } from "react";
import MenuContent from "../../components/ui/MenuContent";
import { useAuth } from "../../context/AuthContext";

export default function StickySearch({ location, setLocation }) {
  const [whereQuery, setWhereQuery] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const { isAuthenticated } = useAuth();
  return (
    <Modal>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-neutral-200/70 bg-[var(--color-background)]/95 shadow-sm backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-[1600px] items-center px-4 sm:px-6 lg:h-[88px] lg:grid lg:grid-cols-[1fr_auto_1fr] lg:gap-6 lg:px-10">
          <div className="flex shrink-0 items-center justify-start">
            <img
              src={myhome}
              alt="MyHome"
              className="h-9 w-auto shrink-0 object-contain lg:h-10"
            />
            <h1 className="text-2xl lg:text-3xl text-(--color-primary) font-medium tracking-tight font-sans hidden lg:block">
              MyHome
            </h1>
          </div>

          <div className="ml-auto flex min-w-0 items-center lg:mx-auto lg:mt-1">
            <div className="flex w-[min(760px,calc(100vw-130px))] items-center rounded-full border border-neutral-200 bg-white p-1 shadow-sm lg:w-[min(760px,55vw)] lg:p-1.5">
              <Modal.Open opens="where">
                <button
                  type="button"
                  className="flex min-w-0 flex-1 items-center gap-2 rounded-full px-3 py-2 text-left transition hover:bg-neutral-50 sm:px-4 sm:py-2.5"
                >
                  <MapPin
                    className="h-4 w-4 shrink-0 text-[#1b3b2b]"
                    strokeWidth={1.8}
                  />

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
                </button>
              </Modal.Open>
              <Modal.Window
                name="where"
                positionClasses="
  left-5 
  lg:left-1/4
"
                className="overflow-y-auto  "
                showOverlay
              >
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

                  {["Lekki, Nigeria", "Ikeja, Nigeria", "Abuja, Nigeria"].map(
                    (location) => (
                      <button
                        key={location}
                        type="button"
                        onClick={() => setWhereQuery(location)}
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

              <div className="hidden h-8 w-px bg-neutral-200 sm:block" />
              <Modal.Open opens="PropertyType">
                <button
                  type="button"
                  className="hidden min-w-0 flex-1 items-center gap-2 rounded-full px-4 py-2.5 text-left transition hover:bg-neutral-50 sm:flex"
                >
                  <Home
                    className="h-4 w-4 shrink-0 text-[#1b3b2b]"
                    strokeWidth={1.8}
                  />

                  <div className="min-w-0">
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-neutral-500">
                      Property
                    </p>

                    <p className="truncate text-sm font-medium text-neutral-800">
                      Any property
                    </p>
                  </div>
                </button>
              </Modal.Open>

              <Modal.Window
                name="PropertyType"
                positionClasses=" lg:left-1/3  translate-x-1/4 "
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

              <div className="hidden h-8 w-px bg-neutral-200 md:block" />
              <Modal.Open opens="budget">
                <button
                  type="button"
                  className="hidden min-w-0 flex-1 items-center gap-2 rounded-full px-4 py-2.5 text-left transition hover:bg-neutral-50 md:flex"
                >
                  <Banknote
                    className="h-4 w-4 shrink-0 text-[#1b3b2b]"
                    strokeWidth={1.8}
                  />

                  <div className="min-w-0">
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-neutral-500">
                      Budget
                    </p>

                    <p className="truncate text-sm font-medium text-neutral-800">
                      Any budget
                    </p>
                  </div>
                </button>
              </Modal.Open>

              <Modal.Window
                name="budget"
                positionClasses="left-1/2 translate-x-1/4 "
              >
                <div className="space-y-3 p-2">
                  <h4 className="text-xs font-semibold text-neutral-500 uppercase tracking-wide">
                    Price Range
                  </h4>

                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="number"
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value)}
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
                      type="number"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
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

              <button
                type="button"
                aria-label="Search"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#1b3b2b] text-white shadow-sm transition hover:bg-[#142e21] sm:h-11 sm:w-11"
              >
                <Search className="h-4.5 w-4.5 sm:h-5 sm:w-5" strokeWidth={2} />
              </button>
            </div>
          </div>

          <div className="hidden items-center justify-end gap-1 lg:flex">
            <Link
              to="#"
              aria-label="Saved properties"
              className="flex h-10 w-10 items-center justify-center rounded-full text-[var(--color-text-primary)] transition-colors duration-200 hover:bg-neutral-100 hover:text-[var(--color-primary)]"
            >
              <Heart size={22} strokeWidth={1.8} />
            </Link>

            <Link
              to="#"
              aria-label="Account"
              className="flex h-10 w-10 items-center justify-center rounded-full text-[var(--color-text-primary)] transition-colors duration-200 hover:bg-neutral-100 hover:text-[var(--color-primary)]"
            >
              <CircleUserRound size={22} strokeWidth={1.8} />
            </Link>

            <Modal.Open opens="menu" toggle>
              <button>
                <Menu size={22} strokeWidth={1.8} />
              </button>
            </Modal.Open>
            <Modal.Window
              name="menu"
              className="w-72 p-2 "
              positionClasses="right-3  "
            >
              <MenuContent isAuthenticated={isAuthenticated} />
            </Modal.Window>
          </div>
        </div>
      </header>
    </Modal>
  );
}
