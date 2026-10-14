import myhome from "../../assets/myhome-logo-exact.svg";
import { Menu, Heart, CircleUserRound } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import MenuContent from "../ui/MenuContent";
import Modal from "../ui/Modal";

const navLinkClasses = ({ isActive }) =>
  `transition-colors duration-200 ${
    isActive
      ? "text-(--color-primary) font-medium"
      : "text-(--color-text-primary) hover:text-(--color-primary)"
  }`;

export default function Navbar() {
  const { profile, isAuthenticated } = useAuth();
  return (
    <Modal>
      <header className="px-6 lg:px-10 py-5 flex justify-between items-center relative z-20 bg-transparent">
        <div className="flex items-center gap-1 ">
          <span className="shrink-0">
            <img src={myhome} className="h-9  w-auto object-contain" />
          </span>
          <h1 className=" hidden md:block text-2xl lg:text-3xl text-(--color-primary) font-medium tracking-tight font-sans">
            MyHome
          </h1>
        </div>

        <div className="flex items-center gap-2 justify-center">
          <div className="flex items-center gap-1 border border-neutral-200 rounded-full p-1.5 shadow-sm bg-neutral-100">
            {profile?.avatar_url ? (
              <img
                src={profile.avatar_url}
                alt={profile?.name || "Profile"}
                className="h-9 w-9 rounded-full object-cover object-[center_30%] "
              />
            ) : isAuthenticated && !profile?.avatar_url ? (
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E9EEE9] text-xl font-semibold text-[#1B3B2B]">
                {profile?.name?.charAt(0)?.toUpperCase() || "U"}
              </div>
            ) : (
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E9EEE9] text-xl font-semibold text-[#1B3B2B]">
                <CircleUserRound size={18} strokeWidth={1.8} />
              </div>
            )}
            <Link
              to="/properties/favourites"
              aria-label="Saved properties"
              className="flex h-10 w-10 items-center justify-center rounded-full text-[var(--color-text-primary)] transition-colors duration-200 hover:bg-neutral-100 hover:text-[var(--color-primary)]"
            >
              <Heart size={20} strokeWidth={1.8} />
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
          <div className="ml-0.5 shrink-0 lg:hidden">
            {/* <Modal.Open opens="menu" toggle>
              <button
                type="button"
                aria-label="Open menu"
                className="
        flex
        h-10
        w-10
        items-center
        justify-center
        rounded-full
        text-[var(--color-text)]
        transition-all
        duration-200
        hover:bg-neutral-100
        active:scale-95
      "
              >
                <Menu size={21} strokeWidth={1.8} />
              </button>
            </Modal.Open> */}

            <Modal.Window
              name="menu"
              className="lg:w-72 p-2 w-30"
              positionClasses="right-3"
            >
              <MenuContent isAuthenticated={isAuthenticated} />
            </Modal.Window>
          </div>
        </div>
      </header>
    </Modal>
  );
}
