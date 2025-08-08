/* App.jsx — full page with Hero, About, Newsletter, Projects, Footer */
import React, { useState } from "react";
import { MapPin, Linkedin, Mail, Check } from "lucide-react";
import "./index.css";

const DATA = {
  name: "Jas Sehgal",
  title: "Senior Product Manager",
  tagline: "Product leader who turns ambiguous problems into shipped, measurable wins.",
  location: "Toronto, ON, Canada",
  email: "jasehgal23@gmail.com",
  links: {
    linkedin: "https://www.linkedin.com/in/jasehgal/",
    resume:
      "https://docs.google.com/document/d/1LEtQkKTjW5VxPsAysxqcaee_PXrxyRWVLZxKX6b0FRo/edit?usp=sharing",
  },
  bio: `I'm a Senior Product Manager with a track record of leading high-impact initiatives from concept to scale. I specialize in building products that solve complex problems, unite cross-functional teams, and deliver measurable business results.

My work spans SaaS platforms, customer experience overhauls, and emerging technology rollouts, consistently balancing innovation with operational excellence.

Outside of work, you'll find me exploring photography, woodworking, bio-hacking, or writing my newsletter on the latest in tech, AI, and product.`,
  skills: [
    "Product Strategy",
    "Marketplace Ops",
    "Cross-Functional Leadership",
    "Experimentation",
    "Analytics",
    "Stakeholder Management",
  ],
  projects: [
    {
      name: "Marriott International — Data-Driven Pricing & Loyalty Personalization",
      simple:
        "Studied booking patterns, campaigns, and point redemptions to find ways to grow member engagement and revenue.",
      description:
        "Collaborated with the data science team to develop models identifying booking drivers (+6% direct bookings). Automated reporting (SQL/Excel) to reduce reporting time ~40%, and partnered with Marketing to segment loyalty guests, increasing on-property spend ~5%.",
      image: "/images/marriott.jpg",
    },
    {
      name: "Penguin Pickup — Website Redesign & Subscription Product",
      simple:
        "Redesigned the brand and website, and launched a subscription product that made sign-up and tracking easier for partners.",
      description:
        "Orchestrated a full rebrand and website overhaul that boosted unaided brand recall (+22%) and first-shipment conversion (+15%). Built a $400K ARR subscription product by translating market sizing into PRDs and implementing data-driven UX changes to improve activation and retention.",
      image: "/images/website-rebrand.jpg",
    },
    {
      name: "Penguin Pickup — Automated Solar-Powered Parcel Lockers",
      simple:
        "Launched solar-powered parcel lockers in Toronto and Montreal so customers could pick up and return packages anytime.",
      description:
        "Led Canada's first multi-courier solar-powered locker rollout across major transit systems. Integrated EU-manufactured hardware and REST APIs with Purolator, DHL, and Canpar, on track to exceed 220k parcels annually.",
      image: "/images/locker.jpg",
    },
    {
      name: "Partner Shop Platform",
      simple:
        "Built a web app enabling convenience stores to offer parcel pickup/drop‑off, earning ~$7k/year in extra profit per store; scaled to 100+ locations in six months.",
      description:
        "Led strategic digitization by pivoting Penguin Pickup from brick-and-mortar to an AI-driven SaaS logistics platform; reset north-star metrics, won C-suite buy-in, and launched a new stack in < 6 mo (React, .NET · PostgreSQL, Azure AutoML time-series forecasting).",
      image: "/images/partner-shop.jpg",
    },
  ],
};

// keep constant or move to env var later (Vercel: VITE_SHEETS_WEBAPP_URL)
const SHEETS_WEBAPP_URL =
  "https://script.google.com/macros/s/AKfycbxoCpgi5CY1ievk5OPij_DL90qOEfkCi9VoS93E_b2GbZwVjx0rM-vbH6v2MnZ37vQS/exec";

function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [message, setMessage] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    setMessage("");
    if (!SHEETS_WEBAPP_URL) {
      setMessage("Newsletter not connected. Try again later.");
      return;
    }
    try {
      setLoading(true);
      const payload = { email, timestamp: new Date().toISOString() };
      const res = await fetch(SHEETS_WEBAPP_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (json && json.ok) {
        setSubscribed(true);
        setEmail("");
        setMessage("You're subscribed!");
      } else {
        setMessage("Something went wrong. Please try again.");
      }
    } catch {
      setMessage("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="mt-4 flex flex-col sm:flex-row gap-2 items-stretch sm:items-center"
      aria-live="polite"
    >
      <input
        type="email"
        required
        placeholder="Your email address"
        className="flex-1 border border-neutral-300 rounded px-3 py-2 text-sm"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={subscribed}
        aria-label="Email address"
      />
      <button
        type="submit"
        disabled={loading || subscribed}
        className={`px-4 py-2 rounded text-sm text-white transition-all ${
          subscribed ? "bg-green-600" : "bg-blue-600 hover:bg-blue-500"
        } disabled:opacity-70 flex items-center justify-center gap-2`}
        aria-label={subscribed ? "Subscribed" : "Subscribe"}
      >
        {subscribed ? (
          <>
            <Check className="h-4 w-4" /> Subscribed
          </>
        ) : loading ? (
          "Submitting…"
        ) : (
          "Subscribe"
        )}
      </button>
      {message && (
        <span className={`text-sm ${subscribed ? "text-green-700" : "text-red-600"} sm:ml-2`}>
          {message}
        </span>
      )}
    </form>
  );
}

export default function App() {
  return (
    <div className="bg-gray-50 text-neutral-900">
      {/* HERO */}
      <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center py-20">
        <h1 className="text-6xl font-extrabold mb-4 tracking-tight drop-shadow-lg">{DATA.name}</h1>
        <p className="text-2xl font-medium mb-2 opacity-90">{DATA.title}</p>
        <p className="max-w-2xl mx-auto text-lg opacity-90">{DATA.tagline}</p>
        <div className="mt-6 flex justify-center flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" /> {DATA.location}
          </div>
          <a className="underline underline-offset-4" href={`mailto:${DATA.email}`}>
            <Mail className="h-4 w-4 inline" /> Email
          </a>
          <a
            className="underline underline-offset-4"
            href={DATA.links.linkedin}
            target="_blank"
            rel="noreferrer"
          >
            <Linkedin className="h-4 w-4 inline" /> LinkedIn
          </a>
          <a
            className="underline underline-offset-4"
            href={DATA.links.resume}
            target="_blank"
            rel="noreferrer"
          >
            Resume
          </a>
        </div>
      </header>

      {/* ABOUT */}
      <section className="mx-auto max-w-5xl px-6 py-12">
        <h2 className="text-3xl font-bold mb-4">About</h2>
        <p className="whitespace-pre-line text-neutral-700 leading-relaxed">{DATA.bio}</p>
        <ul className="mt-4 flex flex-wrap gap-2 text-xs text-neutral-600">
          {DATA.skills.map((s) => (
            <li key={s} className="rounded-full bg-white border px-3 py-1 shadow-sm">
              {s}
            </li>
          ))}
        </ul>
      </section>

      {/* NEWSLETTER */}
      <section className="mx-auto max-w-5xl px-6 py-12 bg-white shadow-md rounded">
        <h2 className="text-3xl font-bold mb-4">Newsletter</h2>
        <p className="text-neutral-700">
          I share a weekly newsletter on the latest in tech, AI, and product — curated, no fluff.
          Subscribe to get it in your inbox.
        </p>
        <NewsletterForm />
      </section>

      {/* PROJECTS */}
      <section className="mx-auto max-w-5xl px-6 py-12 space-y-16">
        <h2 className="text-3xl font-bold">Projects</h2>
        {DATA.projects.map((p) => (
          <div
            key={p.name}
            className="grid gap-6 md:grid-cols-2 items-center bg-white shadow rounded p-6"
          >
            <div>
              <h3 className="text-xl font-semibold mb-2">{p.name}</h3>
              <p className="text-neutral-700 mb-3">{p.simple}</p>
              <p className="text-neutral-700 leading-relaxed">{p.description}</p>
            </div>
            <div className="w-full h-48 md:h-64 bg-neutral-100 flex items-center justify-center text-neutral-400 rounded overflow-hidden">
              <img src={p.image} alt={p.name} className="h-full w-full object-cover" />
            </div>
          </div>
        ))}
      </section>

      {/* FOOTER */}
      <footer className="text-center py-12 mt-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <h2 className="text-2xl font-semibold mb-2">Let's talk</h2>
        <p>I'm open to opportunities and collaborations — feel free to reach out.</p>
        <div className="mt-4 flex justify-center gap-4">
          <a className="underline underline-offset-4" href={`mailto:${DATA.email}`}>
            Email Me
          </a>
          <a
            className="underline underline-offset-4"
            href={DATA.links.linkedin}
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
        </div>
        <p className="mt-6 text-sm opacity-80">
          © {new Date().getFullYear()} {DATA.name}. Built with care in Toronto.
        </p>
      </footer>
    </div>
  );
}
