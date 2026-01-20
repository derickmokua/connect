"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, Phone, MessageCircle } from "lucide-react";

const products = [
    {
        id: 'p1',
        title: 'Phase 1: Day-Old',
        price: 110,
        age: 'Phase 1: Day-Old',
        image: '🐣',
        features: ['Cheapest Entry Point', 'Requires Brooder', 'Maximum Profit Potential'],
        desc: 'Best price. Needs 24/7 heat and high attention.',
        recommended: false
    },
    {
        id: 'p2',
        title: 'Phase 2: Started',
        price: 160,
        age: 'Phase 2: Started (2-Weeks)',
        image: '🐥',
        features: ['Past Critical Mortality', 'Gumboro Vaccinated', 'Needs Less Heat'],
        desc: 'Started. They are stronger and past the most fragile stage.',
        recommended: false
    },
    {
        id: 'p3',
        title: 'Phase 3: Hardened',
        price: 250,
        age: 'Phase 3: Hardened (1-Month)',
        image: '🐤',
        features: ['No Heat Needed', 'Free-Range Ready', 'High Survival Rate'],
        desc: 'Hardened. Fully feathered and ready for the outside coop.',
        recommended: true
    },
    {
        id: 'p4',
        title: 'Phase 4: Mature',
        price: 450,
        age: 'Phase 4: Mature (Production)',
        image: '🐓',
        features: ['Immediate Returns', 'Heavy Weight', 'Scavenging Expert'],
        desc: 'Ready for meat or near egg-laying age.',
        recommended: false
    },
];

export default function ProductShowcase() {
    return (
        <section id="products" className="py-20 px-4 bg-[#FAFAFA]">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-extrabold text-[#0F172A] mb-4">Step 1: Choose Age</h2>
                    <p className="text-[#6B7280] text-lg max-w-2xl mx-auto">Select the growth stage that fits your farm s setup and budget.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {products.map((product, idx) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            viewport={{ once: true }}
                            className={`relative flex flex-col p-8 transition-all duration-300 bg-white/40 backdrop-blur-md rounded-[24px] shadow-sm group overflow-hidden hover:-translate-y-2 hover:shadow-xl hover:bg-white/60 ${product.recommended ? 'border-2 border-[#FF8A00] ring-4 ring-[#FF8A00]/10' : 'border border-white/50'}`}
                        >
                            {/* Recommended Badge */}
                            {product.recommended && (
                                <div className="absolute top-0 right-0 left-0 bg-gradient-to-r from-[#FF8A00] to-[#FF6B00] text-white text-xs font-bold px-4 py-2 text-center uppercase tracking-widest shadow-sm">
                                    Most Popular Value
                                </div>
                            )}

                            <div className="text-6xl mb-6 text-center bg-white/50 w-24 h-24 mx-auto rounded-full flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300 mt-4 backdrop-blur-sm">
                                {product.image}
                            </div>

                            <h3 className="text-xl font-extrabold text-[#0F172A] text-center mb-1">{product.title.split(':')[0]}</h3>
                            <p className="text-center text-[#FF8A00] font-bold text-sm mb-4 uppercase tracking-wide">{product.title.split(':')[1]}</p>

                            <p className="text-center text-[#64748B] text-sm mb-8 px-2 min-h-[40px] leading-relaxed">{product.desc}</p>

                            <div className="flex justify-center items-baseline mb-8 space-x-1 border-t border-slate-100 pt-6 w-full">
                                <span className="text-lg font-bold text-[#0F172A] self-start mt-2">KES</span>
                                <span className="text-5xl font-extrabold text-[#0F172A] tracking-tight">{product.price}</span>
                            </div>

                            <ul className="space-y-4 mb-8">
                                {product.features.map((feat, i) => (
                                    <li key={i} className="flex items-start text-sm text-[#64748B] font-medium">
                                        <CheckCircle className="w-5 h-5 text-[#22C55E] mr-3 shrink-0" />
                                        {feat}
                                    </li>
                                ))}
                            </ul>

                            <div className="mt-auto space-y-3">
                                <a
                                    href={`https://wa.me/254712345678?text=I'm interested in ${product.title}`}
                                    className="w-full py-4 text-white rounded-full font-bold text-lg flex items-center justify-center gap-2 shadow-lg shadow-[#FF8A00]/20 hover:shadow-xl hover:shadow-[#FF8A00]/30 transition-all transform hover:-translate-y-0.5 bg-gradient-to-r from-[#FF8A00] to-[#FF6B00] relative overflow-hidden group/btn"
                                >
                                    <span className="absolute inset-0 w-full h-full bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity"></span>
                                    <MessageCircle className="w-5 h-5" /> Secure via WhatsApp
                                </a>
                                <a
                                    href="tel:+254712345678"
                                    className="w-full py-3 bg-white text-[#0F172A] border border-[#E2E8F0] rounded-full font-bold hover:bg-slate-50 transition flex items-center justify-center gap-2 text-sm"
                                >
                                    <Phone className="w-4 h-4" /> Call to Order
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
