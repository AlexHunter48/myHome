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
  LogOut,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

import { Link, NavLink } from "react-router-dom";
import useLogOut from "../auth/useLogout";

export default function SettingsSidebar() {
  const { profile, isAuthenticated } = useAuth();
  const { logOut } = useLogOut();

  const navlinks = [
    {
      title: "Account",
      links: [
        {
          icon: <User size={18} />,
          title: "Personal Information",
          to: "/settings",
          end: true,
        },
        {
          icon: <LockKeyhole size={18} />,
          title: "Login & security",
          to: "/settings/login-security",
          end: true,
        },
        {
          icon: <Settings size={18} />,
          title: "Account preferences",
          to: "/settings/preferences",
          end: true,
        },
      ],
    },
    {
      title: "Notifications",
      links: [
        {
          icon: <Bell size={18} />,
          title: "Notifications",
          to: "/settings/notifications",
          end: true,
        },
      ],
    },
    {
      title: "Activity",
      links: [
        {
          icon: <Heart size={18} />,
          title: "Saved properties",
          to: "/properties/favourites",
        },
        {
          icon: <MessageSquare size={18} />,
          title: "Enquiries & messages",
          to: "/messages",
        },
      ],
    },
    {
      title: "For owners",
      links: [
        {
          icon: <House size={18} />,
          title: "Owner profile",
          to: "/owner",
        },
        {
          icon: <FileText size={18} />,
          title: "Listing preferences",
          to: "/settings/listing-preferences",
          end: true,
        },
      ],
    },
    {
      title: "Support",
      links: [
        {
          icon: <CircleHelp size={18} />,
          title: "Help & support",
          to: "/help",
        },
      ],
    },
  ];

  if (!isAuthenticated) return null;

  return (
    <aside className="min-h-full w-full bg-white px-6 py-8">
      {/* Profile */}
      <div className="flex items-center gap-3 border-b border-neutral-200/70 pb-8">
        {profile?.avatar_url ? (
          <img
            src={profile.avatar_url}
            alt={profile?.name || "Profile"}
            className="h-12 w-12 shrink-0 rounded-full object-cover"
          />
        ) : (
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#E8ECE7] font-semibold text-[#1B3B2B]">
            {profile?.name?.charAt(0)?.toUpperCase() || "U"}
          </div>
        )}

        <div className="min-w-0">
          <h2 className="truncate text-[16px] font-semibold text-neutral-900">
            {profile?.name || "User"}
          </h2>

          <Link
            to="/profile"
            className="text-[13px] text-neutral-500 transition hover:text-[#1B3B2B]"
          >
            View profile
          </Link>
        </div>
      </div>

      {/* Navigation */}
      <div className="space-y-7 pt-8">
        {navlinks.map((navlink) => (
          <section key={navlink.title}>
            <h3 className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-neutral-400">
              {navlink.title}
            </h3>

            <nav>
              <ul className="space-y-1">
                {navlink.links.map((link) => (
                  <li key={link.title}>
                    <NavLink
                      to={link.to}
                      end={link.end}
                      className={({ isActive }) =>
                        `group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-[14px] transition-colors duration-200 ${
                          isActive
                            ? "bg-[#F1F4F0] font-medium text-[#1B3B2B]"
                            : "text-neutral-600 hover:bg-[#F7F7F5] hover:text-neutral-900"
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          <span
                            className={`shrink-0 transition-colors ${
                              isActive
                                ? "text-[#1B3B2B]"
                                : "text-neutral-400 group-hover:text-neutral-600"
                            }`}
                          >
                            {link.icon}
                          </span>

                          <span>{link.title}</span>
                        </>
                      )}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>
          </section>
        ))}
      </div>

      {/* Log out */}
      <div className="mt-8 border-t border-neutral-200/70 pt-5">
        <button
          type="button"
          onClick={logOut}
          className="group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-[14px] text-neutral-500 transition-colors hover:bg-red-50 hover:text-red-600"
        >
          <LogOut
            size={18}
            className="text-neutral-400 transition-colors group-hover:text-red-500"
          />

          <span>Log out</span>
        </button>
      </div>
    </aside>
  );
}
