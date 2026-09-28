import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";

import SettingsSidebar from "../../features/settings/SettingsSidebar";
import logo from "../../assets/myhome-logo-exact.svg";
import MobileSettingsMenu from "../../features/settings/MobileSettingsMenu";
import { ArrowLeft } from "lucide-react";

export default function SettingsLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  const isSettingsHome = location.pathname === "/settings";
  return (
    <div className="h-dvh flex flex-col overflow-hidden bg-[var(--color-background)]">
      <header className="h-20 shrink-0 border-b border-neutral-200 bg-stone-50">
        <div className="flex h-full items-center px-5 sm:px-8">
          <Link to="/properties">
            <img src={logo} alt="MyHome" className="h-8 w-auto" />
          </Link>
        </div>
      </header>

      <main className="flex-1 min-h-0 overflow-hidden">
        <div className="h-full min-h-0 lg:grid lg:grid-cols-[360px_minmax(0,1fr)]">
          <aside className="hidden min-h-0 overflow-y-auto lg:block">
            <SettingsSidebar />
          </aside>

          <section className="hidden min-h-0 min-w-0 overflow-y-auto lg:block">
            <Outlet />
          </section>

          <section className="h-full min-h-0 overflow-y-auto lg:hidden">
            {isSettingsHome ? (
              <MobileSettingsMenu />
            ) : (
              <>
                <div className="flex items-center  px-5 py-3">
                  <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="flex h-10 w-10 items-center justify-center rounded-full text-neutral-700 transition hover:bg-neutral-100"
                    aria-label="Go back"
                  >
                    <ArrowLeft size={21} />
                  </button>
                </div>

                <Outlet />
              </>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
