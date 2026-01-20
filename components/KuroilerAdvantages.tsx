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
        color: "bg-blue-50 text-blue-600 border-blue-100"
    },
    {
        icon: <Scale className="w-10 h-10" />,
        title: "Expert Support",
        subtitle: "Guidance That Grows",
        desc: "We don’t just sell chicks—we walk with you. Get real-time advice, proven tips, and ongoing support from our experienced team.",
        color: "bg-green-50 text-green-600 border-green-100"
    },
    {
        icon: <Coins className="w-10 h-10" />,
        title: "Profitable Partnership",
        subtitle: "Your Success, Our Goal",
        desc: "We’re committed to your farm’s growth. Fair prices, honest business, and a focus on your long-term profit set us apart.",
        color: "bg-amber-50 text-amber-600 border-amber-100"
    }
];

export default function KuroilerAdvantages() {
    return (
        <section className="py-24 px-4 bg-white">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <span className="text-orange-600 font-bold tracking-wider uppercase text-sm">Why Choose KukuConnect?</span>
                    <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mt-3 mb-6">Farmers Succeed With Us</h2>
                    <p className="text-slate-600 text-lg max-w-2xl mx-auto">
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
                            className={`p-8 rounded-[2rem] border hover:shadow-xl transition-all duration-300 group bg-white ${adv.color.split(' ')[2]}`} // Use border color class
                        >
                            <div className={`${adv.color} w-20 h-20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                {adv.icon}
                            </div>
                            <p className="text-sm font-bold text-slate-400 uppercase tracking-wide mb-1">{adv.subtitle}</p>
                            <h3 className="text-2xl font-bold text-slate-900 mb-4">{adv.title}</h3>
                            <p className="text-slate-600/90 text-lg leading-relaxed">
                                {adv.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
