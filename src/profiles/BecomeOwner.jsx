import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  House,
  LockKeyhole,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import myHomeLogo from "../assets/home3.png";
import useUpdateProfileRole from "./useUpdateProfileRole";

export default function BecomeOwner() {
  const navigate = useNavigate();
  const { user, profile } = useAuth();

  const { updateRole, isPending } = useUpdateProfileRole();

  async function handleBecomeOwner() {
    if (!user?.id) return;
    if (profile?.role === "owner") {
      navigate("/properties/new");
      return;
    }
    try {
      await updateRole(
        { userId: user.id },
        {
          onSuccess: () => {
            navigate("/properties/new");
          },
        },
      );
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="min-h-screen bg-[#f7f5f0]">
      <main className="mx-auto grid min-h-screen max-w-[1440px] lg:grid-cols-[0.9fr_1.1fr]">
        {/* LEFT */}
        <section className="flex flex-col px-6 py-8 sm:px-10 lg:px-14 xl:px-20">
          {/* Back */}
          <button
            onClick={() => navigate(-1)}
            className="flex w-fit items-center gap-2 text-sm font-medium text-neutral-700 transition hover:text-[#1b3b2b]"
          >
            <ArrowLeft size={18} strokeWidth={1.7} />
            Back
          </button>

          <div className="my-auto max-w-xl py-16 lg:py-20">
            {/* Eyebrow */}
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#1b3b2b]">
              List on MyHome
            </p>

            <h1 className="mt-6 max-w-xl text-5xl font-medium leading-[0.98] tracking-[-0.055em] text-neutral-950 sm:text-6xl xl:text-[68px]">
              Turn your property into{" "}
              <span className="font-serif italic font-normal text-[#1b3b2b]">
                opportunity.
              </span>
            </h1>

            <p className="mt-7 max-w-lg text-base leading-7 text-neutral-500 sm:text-lg">
              Become a MyHome owner and connect directly with people looking for
              their next home. No middlemen. No unnecessary fees.
            </p>

            <button
              onClick={handleBecomeOwner}
              disabled={isPending}
              className="group flex w-full items-center justify-center gap-3 rounded-2xl bg-[#1b3b2b] px-6 py-4 text-sm font-medium text-white transition mt-4 hover:bg-[#163225] disabled:cursor-not-allowed disabled:opacity-60 sm:w-[500px]"
            >
              {isPending ? "Setting up your account..." : "Become an owner"}

              {!isPending && (
                <ArrowRight
                  size={17}
                  strokeWidth={1.8}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              )}
            </button>

            <div className="mt-10 space-y-6">
              <Benefit
                icon={House}
                title="List with ease"
                description="Create beautiful property listings in minutes."
              />

              <Benefit
                icon={MessageCircle}
                title="Receive enquiries"
                description="Chat directly with interested buyers and renters."
              />

              <Benefit
                icon={BarChart3}
                title="Stay in control"
                description="Manage your listings and track enquiries all in one place."
              />
            </div>

            <div className="mt-10">
              {/* <button
                onClick={handleBecomeOwner}
                disabled={isPending}
                className="group flex w-full items-center justify-center gap-3 rounded-2xl bg-[#1b3b2b] px-6 py-4 text-sm font-medium text-white transition hover:bg-[#163225] disabled:cursor-not-allowed disabled:opacity-60 sm:w-[500px]"
              >
                {isPending ? "Setting up your account..." : "Become an owner"}

                {!isPending && (
                  <ArrowRight
                    size={17}
                    strokeWidth={1.8}
                    className="transition-transform duration-200 group-hover:translate-x-1"
                  />
                )}
              </button>*/}

              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-neutral-400 sm:w-[500px]">
                <LockKeyhole size={13} strokeWidth={1.7} />
                <span>Your information is secure with us.</span>
              </div>
            </div>
          </div>
        </section>

        <section className="relative hidden p-5 lg:block xl:p-7">
          <div className="relative h-full min-h-[720px] overflow-hidden rounded-[32px]">
            <img
              src={myHomeLogo}
              alt="Modern Nigerian home"
              className="absolute inset-0 h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" />

            <div className="absolute left-10 top-12 max-w-[180px] text-white">
              <div className="mb-5 h-px w-12 bg-white/70" />

              <p className="text-xs font-medium uppercase tracking-[0.22em] leading-6">
                People
                <br />
                find homes
                <br />
                here
              </p>
            </div>

            <div className="absolute bottom-10 left-8 right-8 rounded-3xl border border-white/20 bg-black/40 p-6 text-white backdrop-blur-xl">
              <div className="flex -space-x-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white/70 bg-neutral-300 text-[10px] font-medium text-neutral-700">
                  TA
                </div>

                <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white/70 bg-neutral-200 text-[10px] font-medium text-neutral-700">
                  OA
                </div>

                <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white/70 bg-neutral-400 text-[10px] font-medium text-white">
                  AM
                </div>

                <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white/70 bg-white text-xs font-medium text-neutral-700">
                  +
                </div>
              </div>

              <div className="mt-5 flex items-start gap-3">
                <ShieldCheck
                  size={20}
                  strokeWidth={1.7}
                  className="mt-0.5 shrink-0"
                />

                <div>
                  <p className="text-sm font-medium">
                    Trusted by property owners
                  </p>

                  <p className="mt-1 text-xs leading-5 text-white/65">
                    Join a growing community of owners across Nigeria.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function Benefit({ icon: Icon, title, description }) {
  return (
    <div className="flex items-start gap-4">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#e7ebe6] text-[#1b3b2b]">
        <Icon size={20} strokeWidth={1.7} />
      </div>

      <div className="pt-0.5">
        <h2 className="text-sm font-semibold text-neutral-900">{title}</h2>

        <p className="mt-1 text-sm leading-6 text-neutral-500">{description}</p>
      </div>
    </div>
  );
}
