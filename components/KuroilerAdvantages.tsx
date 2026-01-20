"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Scale, Coins } from "lucide-react";

const advantages = [
    {
        icon: <ShieldCheck className="w-10 h-10" />,
        title: "Trusted Quality",
        subtitle: "Healthy, Strong Chicks",
        desc: "Our chicks are carefully selected, vaccinated, and raised for maximum health and survival—giving you peace of mind from day one.",
    },
    {
        icon: <Scale className="w-10 h-10" />,
        title: "Expert Support",
        subtitle: "Guidance That Grows",
        desc: "We don’t just sell chicks—we walk with you. Get real-time advice, proven tips, and ongoing support from our experienced team.",
    },
    {
        icon: <Coins className="w-10 h-10" />,
        title: "Profitable Partnership",
        subtitle: "Your Success, Our Goal",
        desc: "We’re committed to your farm’s growth. Fair prices, honest business, and a focus on your long-term profit set us apart.",
    }
];

export default function KuroilerAdvantages() {
    return (
        <section className="py-24 px-4 bg-[#FAFAFA] border-t border-slate-200">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <span className="text-[#FF8A00] font-bold tracking-wider uppercase text-sm">Why Choose KukuConnect?</span>
                    <h2 className="text-4xl md:text-5xl font-extrabold text-[#0F172A] mt-3 mb-6">Farmers Succeed With Us</h2>
                    <p className="text-[#6B7280] text-lg max-w-2xl mx-auto font-medium">
                        Discover why more farmers trust KukuConnect for healthy chicks, expert support, and real results. We’re more than a supplier—we’re your partner in poultry success.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {advantages.map((adv, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            viewport={{ once: true }}
                            className={`p-8 rounded-[2rem] border border-white/50 shadow-xl hover:shadow-2xl hover:shadow-[#FF8A00]/10 transition-all duration-300 group bg-white/70 backdrop-blur-md relative overflow-hidden hover:-translate-y-2 hover:border-[#FF8A00]/50`}
                        >
                            <div className="absolute top-0 left-0 w-full h-1 bg-[#FF8A00] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <div className={`bg-[#FF8A00]/5 text-[#FF8A00] w-20 h-20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                {adv.icon}
                            </div>
                            <p className="text-sm font-bold text-[#6B7280] uppercase tracking-wide mb-1">{adv.subtitle}</p>
                            <h3 className="text-2xl font-bold text-[#0F172A] mb-4">{adv.title}</h3>
                            <p className="text-[#6B7280] text-lg leading-relaxed font-medium">
                                {adv.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
