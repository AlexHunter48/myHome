import {
  User,
  LockKeyhole,
  Settings,
  Bell,
  Heart,
  MessageSquare,
  House,
  FileText,
  CircleHelp,
  ChevronRight,
  LogOut,
} from "lucide-react";
import { Link } from "react-router-dom";
import useLogOut from "../auth/useLogout";

export default function MobileSettingsMenu() {
  const { logOut } = useLogOut();

  const sections = [
    {
      title: "Account",
      links: [
        {
          title: "Personal information",
          to: "/settings/personal",
          icon: User,
        },
        {
          title: "Login & security",
          to: "/settings/login-security",
          icon: LockKeyhole,
        },
        {
          title: "Account preferences",
          to: "/settings/preferences",
          icon: Settings,
        },
      ],
    },
    {
      title: "Notifications",
      links: [
        {
          title: "Notifications",
          to: "/settings/notifications",
          icon: Bell,
        },
      ],
    },
    {
      title: "Activity",
      links: [
        {
          title: "Saved properties",
          to: "/properties/favourites",
          icon: Heart,
        },
        {
          title: "Enquiries & messages",
          to: "/messages",
          icon: MessageSquare,
        },
      ],
    },
    {
      title: "For owners",
      links: [
        {
          title: "Owner profile",
          to: "/owner",
          icon: House,
        },
        {
          title: "Listing preferences",
          to: "/settings/listing-preferences",
          icon: FileText,
        },
      ],
    },
    {
      title: "Support",
      links: [
        {
          title: "Help & support",
          to: "/help",
          icon: CircleHelp,
        },
      ],
    },
  ];

  return (
    <div className="bg-[var(--color-background)] px-5 py-8 sm:px-8">
      {/* Heading */}
      <div className="mb-9">
        <h1 className="text-3xl font-semibold tracking-[-0.03em] text-[#17221D]">
          Account settings
        </h1>

        <p className="mt-2 text-sm leading-6 text-neutral-500">
          Manage your account and MyHome experience.
        </p>
      </div>

      <div className="space-y-8">
        {sections.map((section) => (
          <section key={section.title}>
            <h2 className="mb-3 px-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-400">
              {section.title}
            </h2>

            <div className="overflow-hidden rounded-2xl border border-neutral-200/80 bg-white">
              {section.links.map((link, index) => {
                const Icon = link.icon;

                return (
                  <Link
                    key={link.title}
                    to={link.to}
                    className={`group flex items-center gap-4 px-5 py-4 transition-colors hover:bg-neutral-50 ${
                      index !== section.links.length - 1
                        ? "border-b border-neutral-100"
                        : ""
                    }`}
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#F1F4F0] text-[#1B3B2B]">
                      <Icon size={19} strokeWidth={1.8} />
                    </span>

                    <span className="flex-1 text-[15px] font-medium text-neutral-800">
                      {link.title}
                    </span>

                    <ChevronRight
                      size={18}
                      strokeWidth={1.8}
                      className="shrink-0 text-neutral-400 transition-transform group-hover:translate-x-0.5"
                    />
                  </Link>
                );
              })}
            </div>
          </section>
        ))}
      </div>

      <div className="mt-10 border-t border-neutral-200/70 pt-6">
        <button
          type="button"
          onClick={logOut}
          className="group flex w-full items-center gap-4 rounded-2xl border border-neutral-200/80 bg-white px-5 py-4 text-left transition-colors hover:border-red-100 hover:bg-red-50"
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-neutral-500 transition-colors group-hover:bg-red-100 group-hover:text-red-500">
            <LogOut size={19} strokeWidth={1.8} />
          </span>

          <span className="flex-1 text-[15px] font-medium text-neutral-700 transition-colors group-hover:text-red-600">
            Log out
          </span>
        </button>
      </div>
    </div>
  );
}
