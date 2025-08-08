/* App.jsx for local/dev deployment with Vite + Tailwind */
import React from 'react';
import { MapPin, Linkedin, Mail } from 'lucide-react';
import './index.css';

const DATA = {
  name: 'Jas Sehgal',
  title: 'Senior Product Manager',
  tagline: 'Product leader who turns ambiguous problems into shipped, measurable wins.',
  location: 'Toronto, ON, Canada',
  email: 'jasehgal23@gmail.com',
  links: {
    linkedin: 'https://www.linkedin.com/in/jasehgal/',
    resume: 'https://docs.google.com/document/d/1LEtQkKTjW5VxPsAysxqcaee_PXrxyRWVLZxKX6b0FRo/edit?usp=sharing',
  },
  projects: [
    { name: 'Marriott International — Data-Driven Pricing & Loyalty Personalization', simple: 'Studied booking patterns, campaigns, and point redemptions to find ways to grow member engagement and revenue.', description: 'Collaborated with the data science team to develop models identifying booking drivers (+6% direct bookings). Automated reporting (SQL/Excel) to reduce reporting time ~40%, and partnered with Marketing to segment loyalty guests, increasing on-property spend ~5%.', image: '/images/marriott.jpg' },
    { name: 'Penguin Pickup — Website Redesign & Subscription Product', simple: 'Redesigned the brand and website, and launched a subscription product that made sign-up and tracking easier for partners.', description: 'Orchestrated a full rebrand and website overhaul that boosted unaided brand recall (+22%) and first-shipment conversion (+15%). Built a $400K ARR subscription product by translating market sizing into PRDs and implementing data-driven UX changes to improve activation and retention.', image: '/images/website-rebrand.jpg' },
    { name: 'Penguin Pickup — Automated Solar-Powered Parcel Lockers', simple: 'Launched solar-powered parcel lockers in Toronto and Montreal so customers could pick up and return packages anytime.', description: 'Led Canada\'s first multi-courier solar-powered locker rollout across major transit systems. Integrated EU-manufactured hardware and REST APIs with Purolator, DHL, and Canpar, on track to exceed 220k parcels annually.', image: '/images/locker.jpg' },
    { name: 'Partner Shop Platform', simple: 'Built a web app enabling convenience stores to offer parcel pickup/drop‑off, earning ~$7k/year in extra profit per store; scaled to 100+ locations in six months.', description: 'Led strategic digitization by pivoting Penguin Pickup from brick-and-mortar to an AI-driven SaaS logistics platform; reset north-star metrics, won C-suite buy-in, and launched a new stack in < 6 mo (React, .NET · PostgreSQL, Azure AutoML time-series forecasting).', image: '/images/partner-shop.jpg' },
  ],
};

export default function App() {
  return (
    <div className="bg-gray-50 text-neutral-900">
      <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center py-20">
        <h1 className="text-6xl font-extrabold mb-4 tracking-tight drop-shadow-lg">{DATA.name}</h1>
        <p className="text-2xl font-medium mb-2 opacity-90">{DATA.title}</p>
        <p className="max-w-2xl mx-auto text-lg opacity-90">{DATA.tagline}</p>
        <div className="mt-6 flex justify-center flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-2"><MapPin className="h-4 w-4" /> {DATA.location}</div>
          <a className="underline underline-offset-4" href={`mailto:${DATA.email}`}><Mail className="h-4 w-4 inline"/> Email</a>
          <a className="underline underline-offset-4" href={DATA.links.linkedin} target="_blank" rel="noreferrer"><Linkedin className="h-4 w-4 inline"/> LinkedIn</a>
          <a className="underline underline-offset-4" href={DATA.links.resume} target="_blank" rel="noreferrer">Resume</a>
        </div>
      </header>
      <section className="mx-auto max-w-5xl px-6 py-12 space-y-10">
        {DATA.projects.map(p => (
          <div key={p.name} className="grid gap-6 md:grid-cols-2 items-center bg-white shadow rounded p-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">{p.name}</h3>
              <p className="text-neutral-700 mb-3">{p.simple}</p>
              <p className="text-neutral-700 leading-relaxed">{p.description}</p>
            </div>
            <div className="w-full h-64 md:h-80 bg-neutral-100 flex items-center justify-center text-neutral-400 rounded-xl overflow-hidden shadow">
              <img src={p.image} alt={p.name} className="h-full w-full object-cover" />
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
