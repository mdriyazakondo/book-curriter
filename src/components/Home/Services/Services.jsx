import React from "react";
import {
  FaTruck,
  FaClock,
  FaBox,
  FaGlobe,
  FaGift,
  FaRedo,
} from "react-icons/fa";

import Container from "../../../shared/Container/Container";

export default function ServicesSection() {
  const services = [
    {
      id: 1,
      title: "Book Delivery",
      desc: "Get your favorite books delivered safely and quickly right to your doorstep.",
      icon: FaTruck,
    },
    {
      id: 2,
      title: "Express Delivery",
      desc: "Experience lightning‑fast delivery with our express 1–2 day service.",
      icon: FaClock,
    },
    {
      id: 3,
      title: "Pickup Service",
      desc: "We will collect books directly from your location—easy and convenient.",
      icon: FaBox,
    },
    {
      id: 4,
      title: "International Shipping",
      desc: "Send books worldwide with reliable, trackable international shipping.",
      icon: FaGlobe,
    },
    {
      id: 5,
      title: "Gift Wrapping",
      desc: "Perfectly wrapped gifts with premium packaging and personalized notes.",
      icon: FaGift,
    },
    {
      id: 6,
      title: "Subscription Plans",
      desc: "Enjoy monthly book delivery plans designed for regular readers.",
      icon: FaRedo,
    },
  ];

  return (
    <div className="bg-slate-50/50 ">
      <Container>
        <section>
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-1.5 mb-4 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-widest">
              Premium Solutions
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight">
              Our Professional{" "}
              <span className="text-emerald-600">Services</span>
            </h2>
            <p className="mt-5 text-slate-500 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
              We provide a complete book courier experience—faster, safer, and
              more convenient for modern readers.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, idx) => {
              const Icon = s.icon;
              return (
                <article
                  key={s.id}
                  className="group relative bg-white border border-slate-100 p-8 rounded-3xl shadow-sm hover:shadow-2xl hover:shadow-emerald-100/50 hover:-translate-y-2 transition-all duration-500 flex flex-col items-start"
                >
                  {/* Icon Container */}
                  <div className="mb-6 w-14 h-14 rounded-2xl bg-slate-900 flex items-center justify-center group-hover:bg-emerald-600 transition-colors duration-500 shadow-lg shadow-slate-200">
                    <Icon className="w-6 h-6 text-white" />
                  </div>

                  <div className="grow">
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-600 transition-colors duration-300">
                      {s.title}
                    </h3>
                    <p className="mt-3 text-slate-500 text-sm leading-relaxed">
                      {s.desc}
                    </p>
                  </div>

                  {/* Action Button */}
                  <button
                    aria-label={`Learn More — ${s.title}`}
                    className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-tighter text-slate-900 group-hover:text-emerald-600 transition-all"
                  >
                    Learn More
                    <span className="w-8 h-0.5 bg-slate-200 group-hover:bg-emerald-600 group-hover:w-12 transition-all duration-500"></span>
                  </button>
                </article>
              );
            })}
          </div>
        </section>
      </Container>
    </div>
  );
}
