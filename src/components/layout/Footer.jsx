import { FaInstagram, FaFacebookF } from "react-icons/fa";

import { FaXTwitter } from "react-icons/fa6";
import { ArrowUpRight } from "lucide-react";

const exploreLinks = [
  "Featured homes",
  "Explore locations",
  "Market insights",
  "How it works",
];

const companyLinks = [
  "About MyHome",
  "List your property",
  "Contact us",
  "Careers",
];

const supportLinks = [
  "Help centre",
  "Safety & trust",
  "Terms of service",
  "Privacy policy",
];

export default function Footer() {
  return (
    <footer className="bg-[#111614] px-6 pb-6 pt-16 text-white md:px-10 lg:px-16 lg:pt-20">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_2fr]">
          <div className="max-w-sm">
            <a
              href="/"
              className="inline-block font-serif text-3xl tracking-tight"
            >
              MyHome
            </a>

            <p className="mt-5 text-sm leading-6 text-white/50">
              A simpler way to discover homes, understand the market, and
              connect directly with property owners across Nigeria.
            </p>

            <div className="mt-7 flex items-center gap-2">
              <a
                href="#"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/60 transition hover:border-white/20 hover:bg-white/5 hover:text-white"
              >
                <FaInstagram className="h-4 w-4" strokeWidth={1.7} />
              </a>

              <a
                href="#"
                aria-label="Twitter"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/60 transition hover:border-white/20 hover:bg-white/5 hover:text-white"
              >
                <FaXTwitter className="h-4 w-4" strokeWidth={1.7} />
              </a>

              <a
                href="#"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/60 transition hover:border-white/20 hover:bg-white/5 hover:text-white"
              >
                <FaFacebookF className="h-4 w-4" strokeWidth={1.7} />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            <FooterColumn title="Explore" links={exploreLinks} />

            <FooterColumn title="MyHome" links={companyLinks} />

            <FooterColumn title="Support" links={supportLinks} />
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-5 rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-white">
              Have a property to list?
            </p>

            <p className="mt-1 text-xs text-white/40">
              Put your property in front of people looking for their next home.
            </p>
          </div>

          <a
            href="#"
            className="group flex w-fit items-center gap-2 text-sm font-semibold text-white"
          >
            List your property
            <ArrowUpRight
              className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              strokeWidth={1.7}
            />
          </a>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-white/35 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} MyHome. All rights reserved.</p>

          <div className="flex items-center gap-5">
            <a href="#" className="transition hover:text-white/70">
              Privacy
            </a>

            <a href="#" className="transition hover:text-white/70">
              Terms
            </a>

            <a href="#" className="transition hover:text-white/70">
              Cookies
            </a>
          </div>

          <p>Nigeria</p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }) {
  return (
    <div>
      <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-white/40">
        {title}
      </h3>

      <ul className="mt-5 space-y-3">
        {links.map((link) => (
          <li key={link}>
            <a
              href="#"
              className="text-sm text-white/65 transition hover:text-white"
            >
              {link}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
