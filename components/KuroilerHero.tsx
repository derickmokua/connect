"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";

export default function KuroilerHero() {
    return (
        <section id="home" className="relative pt-24 pb-20 px-4 overflow-hidden bg-[#FFFBEA] flex flex-col justify-center min-h-[60vh]">
            <div className="max-w-7xl mx-auto relative z-10">

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-16 lg:gap-24"
                >
                    {/* Logo - Order 1 on Mobile (Top), Order 2 on Desktop (Right) */}
                    <div className="md:order-2 flex-shrink-0">
                        <img
                            src="/images/01fba53c-6771-472b-94cf-81a31a996042_20250715_162930_0000.png"
                            alt="KukuConnect Official Logo"
                            className="w-40 h-40 md:w-64 md:h-64 rounded-full object-cover"
                        />
                    </div>

                    {/* Content - Order 2 on Mobile, Order 1 on Desktop (Left) */}
                    <div className="md:order-1 flex flex-col items-center md:items-start text-center md:text-left flex-1">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#FFA64D]/10 rounded-full text-[#D97706] font-bold text-xs md:text-sm mb-6 border border-[#FFA64D]/20">
                            <Star className="w-3 h-3 md:w-4 md:h-4 fill-current" />
                            <span>#1 Dual-Purpose Breed</span>
                        </div>

                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-[#431407] mb-6 leading-[1.1] tracking-tight">
                            Your Farm. <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D97706] to-[#B45309]">
                                Our Commitment.
                            </span>
                        </h1>

                        <p className="text-lg md:text-xl text-[#78350F] mb-10 leading-relaxed max-w-xl opacity-90">
                            KukuConnect delivers healthy, high-performing chicks and expert support—so your farm thrives. We’re here to help you grow, profit, and succeed.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                            <Link
                                href="#products"
                                className="w-full sm:w-auto px-8 py-4 bg-[#D97706] text-white rounded-full font-bold text-lg hover:bg-[#B45309] transition-all shadow-xl hover:shadow-[#D97706]/20 flex items-center justify-center gap-2 group"
                            >
                                Start Your Batch
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link
                                href="#contact"
                                className="w-full sm:w-auto px-8 py-4 bg-white text-[#78350F] border border-[#D97706]/20 rounded-full font-bold text-lg hover:bg-[#FFF7ED] transition-colors flex items-center justify-center shadow-sm"
                            >
                                Speak to an Expert
                            </Link>
                        </div>

                        <p className="mt-6 text-sm text-[#78350F]/70 font-medium w-full text-center md:text-left">
                            Need instant advice? <span className="text-[#D97706] font-bold">Chat with our Kuku Assistant</span> at the bottom right! 👇
                        </p>
                    </div>
                </motion.div>
            </div>

            {/* Subtle Background Elements - kept minimal for premium feel */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#FFA64D]/5 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
        </section>
    );
}
