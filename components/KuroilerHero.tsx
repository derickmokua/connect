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
                    className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#FFA64D]/10 rounded-full text-[#D97706] font-bold text-xs md:text-sm mb-6 border border-[#FFA64D]/20">
                        <Star className="w-3 h-3 md:w-4 md:h-4 fill-current" />
                        <span>#1 Dual-Purpose Breed</span>
                    </div>

                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-[#431407] mb-6 leading-[1.2] tracking-tight">
                        Your Farm. <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D97706] to-[#B45309]">
                            Our Commitment.
                        </span>
                    </h1>

                    <p className="text-lg md:text-xl text-[#78350F] mb-10 leading-relaxed max-w-2xl mx-auto opacity-90 font-medium">
                        KukuConnect delivers healthy, high-performing chicks and expert support—so your farm thrives. We’re here to help you grow, profit, and succeed.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-10 justify-center">
                        <Link
                            href="#products"
                            className="w-full sm:w-48 px-8 py-4 bg-[#D97706] text-white rounded-full font-bold text-lg hover:bg-[#B45309] transition-all shadow-xl hover:shadow-[#D97706]/20 flex items-center justify-center gap-2 group"
                        >
                            Start Batch
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link
                            href="#contact"
                            className="w-full sm:w-48 px-8 py-4 bg-white text-[#78350F] border border-[#D97706]/20 rounded-full font-bold text-lg hover:bg-[#FFF7ED] transition-colors flex items-center justify-center shadow-sm"
                        >
                            Speak to Expert
                        </Link>
                    </div>

                    {/* Social Proof */}
                    <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-8 border-t border-[#D97706]/10 pt-6 w-full max-w-md mx-auto">
                        <div className="flex items-center gap-2">
                            <div className="flex -space-x-2">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="w-8 h-8 rounded-full bg-gray-200 border-2 border-[#FFFBEA]" />
                                ))}
                            </div>
                            <div className="text-xs text-[#78350F] text-left">
                                <span className="block font-bold">500+ Farmers</span>
                                <span>Trusted & Served</span>
                            </div>
                        </div>
                        <div className="hidden sm:block w-px h-8 bg-[#D97706]/20"></div>
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-[#D97706]/10 flex items-center justify-center text-[#D97706]">
                                <Star className="w-4 h-4 fill-current" />
                            </div>
                            <div className="text-xs text-[#78350F] text-left">
                                <span className="block font-bold">Healthy Basics</span>
                                <span>Quality Guarantee</span>
                            </div>
                        </div>
                    </div>

                    <p className="mt-4 text-sm text-[#78350F]/70 font-medium w-full text-center">
                        Need instant advice? <span className="text-[#D97706] font-bold">Chat with our Kuku Assistant</span> at the bottom right! 👇
                    </p>
                </motion.div>
            </div>

            {/* Subtle Background Elements - kept minimal for premium feel */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#FFA64D]/5 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
        </section>
    );
}
