import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import useSignUp from "../features/auth/useSignup";
import {
  ArrowRight,
  Eye,
  EyeOff,
  Home,
  LoaderCircle,
  LockKeyhole,
  Mail,
  UserRound,
} from "lucide-react";
import myhome from "../assets/myhome-logo-exact.svg";

export default function Auth() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { signUp, isPending } = useSignUp();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function onSubmit(data) {
    if (isSignUp) {
      signUp(
        {
          fullName: data.fullName,
          email: data.email,
          password: data.password,
        },
        {
          onSuccess: () => {
            reset();
          },
        },
      );
      console.log(data.password);
      return;
    }

    console.log("Sign in:", data);
  }

  function switchMode() {
    setIsSignUp((current) => !current);
    setShowPassword(false);
    reset();
  }

  return (
    <main className="min-h-screen bg-[var(--color-background)]">
      <div className="grid min-h-screen lg:grid-cols-[1.05fr_0.95fr]">
        <section className="relative hidden overflow-hidden bg-[#1b3b2b] lg:flex">
          <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full border border-white/10" />

          <div className="absolute -bottom-40 -right-20 h-[500px] w-[500px] rounded-full border border-white/10" />

          <div className="relative z-10 flex w-full flex-col justify-between p-12 xl:p-16">
            <Link to="/" className="flex items-center gap-3 text-white">
              <div className="flex h-11 w-10 items-center justify-center rounded-2xl bg-white">
                <img
                  src={myhome}
                  alt="MyHome"
                  className="h-6 w-auto shrink-0 object-contain lg:h-8 relative left-[-0.1px]"
                />
              </div>

              <span className="text-2xl font-medium tracking-tight">
                MyHome
              </span>
            </Link>

            <div className="max-w-xl">
              <p className="mb-5 text-sm font-medium uppercase tracking-[0.2em] text-white/60">
                Your place. Your choice.
              </p>

              <h1 className="text-5xl font-medium leading-[1.08] tracking-tight text-white xl:text-6xl">
                Find a home that
                <span className="block text-white/60">feels like yours.</span>
              </h1>

              <p className="mt-6 max-w-lg text-base leading-7 text-white/65">
                Discover verified homes, connect directly with trusted owners,
                and make better property decisions without the middleman.
              </p>
            </div>

            <div className="flex items-center justify-between text-xs text-white/45"></div>
          </div>
        </section>

        <section className="flex min-h-screen items-center justify-center px-5 py-10 sm:px-8 lg:px-12">
          <div className="w-full max-w-md">
            <Link to="/" className="mb-12 flex items-center gap-2.5 lg:hidden">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#eaf0ec] text-[#1b3b2b]">
                <Home size={20} strokeWidth={1.7} />
              </div>

              <span className="text-2xl font-medium tracking-tight text-[#1b3b2b]">
                MyHome
              </span>
            </Link>

            <div className="mb-8">
              <p className="mb-3 text-sm font-medium text-[#1b3b2b]">
                {isSignUp ? "Welcome to MyHome" : "Welcome back"}
              </p>

              <h2 className="text-3xl font-medium tracking-tight text-neutral-950 sm:text-4xl">
                {isSignUp ? "Create your account" : "Sign in to your account"}
              </h2>

              <p className="mt-3 text-sm leading-6 text-neutral-500">
                {isSignUp
                  ? "Join MyHome and discover properties made for you."
                  : "Continue exploring homes and manage your MyHome experience."}
              </p>
            </div>

            <button
              type="button"
              className="flex h-12 w-full items-center justify-center gap-3 rounded-2xl border border-neutral-200 bg-white text-sm font-medium text-neutral-800 shadow-sm transition hover:bg-neutral-50"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                <path
                  fill="#4285F4"
                  d="M21.35 12.27c0-.72-.06-1.42-.18-2.09H12v3.96h5.23a4.47 4.47 0 0 1-1.94 2.93v2.44h3.14c1.84-1.69 2.92-4.18 2.92-7.24Z"
                />

                <path
                  fill="#34A853"
                  d="M12 21.7c2.63 0 4.84-.87 6.45-2.37l-3.14-2.44c-.87.58-1.98.92-3.31.92-2.54 0-4.7-1.72-5.47-4.03H3.28v2.52A9.74 9.74 0 0 0 12 21.7Z"
                />

                <path
                  fill="#FBBC05"
                  d="M6.53 13.78a5.84 5.84 0 0 1 0-3.56V7.7H3.28a9.75 9.75 0 0 0 0 8.6l3.25-2.52Z"
                />

                <path
                  fill="#EA4335"
                  d="M12 6.19c1.43 0 2.71.49 3.72 1.45l2.79-2.79C16.83 3.25 14.63 2.3 12 2.3a9.74 9.74 0 0 0-8.72 5.4l3.25 2.52C7.3 7.91 9.46 6.19 12 6.19Z"
                />
              </svg>
              Continue with Google
            </button>

            <div className="my-7 flex items-center gap-4">
              <div className="h-px flex-1 bg-neutral-200" />

              <span className="text-xs text-neutral-400">OR</span>

              <div className="h-px flex-1 bg-neutral-200" />
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {isSignUp && (
                <div>
                  <label className="mb-2 block text-sm font-medium text-neutral-800">
                    Full name
                  </label>

                  <div className="relative">
                    <UserRound
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
                      size={18}
                      strokeWidth={1.7}
                    />

                    <input
                      type="text"
                      placeholder="Your name"
                      autoComplete="name"
                      {...register("fullName", {
                        required: "Your full name is required",
                      })}
                      className="h-12 w-full rounded-2xl border border-neutral-200 bg-white pl-11 pr-4 text-sm outline-none transition placeholder:text-neutral-400 focus:border-[#1b3b2b] focus:ring-4 focus:ring-[#1b3b2b]/5"
                    />
                  </div>

                  {errors.fullName && (
                    <p className="mt-1.5 text-xs text-red-500">
                      {errors.fullName.message}
                    </p>
                  )}
                </div>
              )}

              <div>
                <label className="mb-2 block text-sm font-medium text-neutral-800">
                  Email address
                </label>

                <div className="relative">
                  <Mail
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
                    size={18}
                    strokeWidth={1.7}
                  />

                  <input
                    type="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Enter a valid email address",
                      },
                    })}
                    className="h-12 w-full rounded-2xl border border-neutral-200 bg-white pl-11 pr-4 text-sm outline-none transition placeholder:text-neutral-400 focus:border-[#1b3b2b] focus:ring-4 focus:ring-[#1b3b2b]/5"
                  />
                </div>

                {errors.email && (
                  <p className="mt-1.5 text-xs text-red-500">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-neutral-800">
                  Password
                </label>

                <div className="relative">
                  <LockKeyhole
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
                    size={18}
                    strokeWidth={1.7}
                  />

                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    autoComplete={
                      isSignUp ? "new-password" : "current-password"
                    }
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    })}
                    className="h-12 w-full rounded-2xl border border-neutral-200 bg-white pl-11 pr-12 text-sm outline-none transition placeholder:text-neutral-400 focus:border-[#1b3b2b] focus:ring-4 focus:ring-[#1b3b2b]/5"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((current) => !current)}
                    className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-xl text-neutral-400 transition hover:bg-neutral-50 hover:text-neutral-700"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                {errors.password && (
                  <p className="mt-1.5 text-xs text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {!isSignUp && (
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="text-xs font-medium text-[#1b3b2b] hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>
              )}

              <button
                type="submit"
                disabled={isPending}
                className="group flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[#1b3b2b] text-sm font-semibold text-white shadow-sm transition hover:bg-[#142e21] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isPending ? (
                  <LoaderCircle size={18} className="animate-spin" />
                ) : (
                  <>
                    {isSignUp ? "Create account" : "Sign in"}

                    <ArrowRight
                      size={17}
                      className="transition-transform duration-200 group-hover:translate-x-0.5"
                    />
                  </>
                )}
              </button>
            </form>

            <p className="mt-7 text-center text-sm text-neutral-500">
              {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
              <button
                type="button"
                onClick={switchMode}
                className="font-semibold text-[#1b3b2b] hover:underline"
              >
                {isSignUp ? "Sign in" : "Create one"}
              </button>
            </p>

            {isSignUp && (
              <p className="mt-6 text-center text-xs leading-5 text-neutral-400">
                By creating an account, you agree to MyHome's Terms of Service
                and Privacy Policy.
              </p>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
