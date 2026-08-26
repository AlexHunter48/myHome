import myhome from "../../assets/myhome-logo-exact.svg";
import { Menu, Heart, CircleUserRound } from "lucide-react";

const navLinkClasses = ({ isActive }) =>
  `transition-colors duration-200 ${
    isActive
      ? "text-(--color-primary) font-medium"
      : "text-(--color-text-primary) hover:text-(--color-primary)"
  }`;

export default function Navbar() {
  return (
    <header className="px-6 lg:px-10 py-5 flex justify-between items-center relative z-20 bg-transparent">
      <div className="flex items-center gap-2.5">
        <span className="shrink-0">
          <img src={myhome} className="h-9 w-auto object-contain" />
        </span>
        <h1 className="text-2xl lg:text-3xl text-(--color-primary) font-medium tracking-tight font-sans">
          MyHome
        </h1>
      </div>

      <nav className="hidden lg:block">
        <ul className="flex gap-8 whitespace-nowrap text-sm tracking-wide">
          <li>
            <a to="#" className={navLinkClasses}>
              Explore
            </a>
          </li>
          <li>
            <a to="#" className={navLinkClasses}>
              Homes
            </a>
          </li>
          <li>
            <a to="#" className={navLinkClasses}>
              Areas
            </a>
          </li>
          <li>
            <a to="#" className={navLinkClasses}>
              Insights
            </a>
          </li>
        </ul>
      </nav>

      <div className="flex items-center gap-3">
        <a
          to="#"
          className="hidden text-sm font-medium text-(--color-text-primary) hover:text-(--color-primary) transition-colors duration-200"
        >
          List your property
        </a>

        <div className="flex items-center gap-1 border border-neutral-200 rounded-full p-1.5 shadow-sm bg-neutral-100">
          <abg-neutral-100
            to="#"
            aria-label="Saved properties"
            className="p-2 rounded-full  hover:text-(--color-primary) transition-colors duration-200"
          >
            <Heart size={19} />
          </abg-neutral-100>
          <a
            to="#"
            aria-label="Account"
            className="p-2 rounded-full text-(--color-text-primary) hover:bg-neutral-100 hover:text-(--color-primary) transition-colors duration-200"
          >
            <CircleUserRound size={19} />
          </a>
          <a
            to="#"
            aria-label="Menu"
            className="p-2 rounded-full text-(--color-text-primary) hover:bg-neutral-100 hover:text-(--color-primary) transition-colors duration-200"
          >
            <Menu size={19} />
          </a>
        </div>
      </div>
    </header>
  );
}
