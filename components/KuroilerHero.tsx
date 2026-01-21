"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Star, CheckCircle2, FlaskRound as Flask, Activity } from "lucide-react";
import Image from "next/image";

export default function KuroilerHero() {
    return (
        <section id="home" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-4 overflow-hidden bg-[#FAFAFA] min-h-[90vh] flex items-center">
            {/* Background Tech Overlays */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <svg className="absolute top-0 right-0 w-[800px] h-[800px] text-[#00BFFF]/5" fill="currentColor" viewBox="0 0 100 100">
                    <path d="M50 0 L100 25 L100 75 L50 100 L0 75 L0 25 Z" />
                </svg>
                <div className="absolute top-20 left-10 w-64 h-64 bg-[#00BFFF]/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#FF8A00]/5 rounded-full blur-3xl"></div>

                {/* Grid Pattern */}
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03]" style={{ backgroundSize: '30px 30px' }}></div>
            </div>

            <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
                {/* Text Content */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-left"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-slate-200 mb-8 shadow-sm animate-fade-in-up">
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                        </span>
                        <span className="text-sm font-bold text-[#0F172A] uppercase tracking-wider">Hatchery Online • 86% Vitality Rate</span>
                    </div>

                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-[#0F172A] mb-6 leading-[1.1] tracking-tight">
                        Your <span className="text-[#FF8A00]">Farm</span>. <br />
                        Our <span className="text-[#FF8A00]">Commitment</span>.
                    </h1>

                    <p className="text-lg md:text-xl text-[#6B7280] mb-10 leading-relaxed max-w-xl font-medium">
                        KukuConnect delivers healthy, high-performing chicks and expert support – so your farm thrives. We're here to help you grow, profit, and succeed.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-12">
                        <Link
                            href="#products"
                            className="px-6 md:px-8 py-3 md:py-4 bg-[#FF8A00] text-white rounded-full font-bold text-base md:text-lg hover:bg-[#FF7518] shadow-lg shadow-[#FF8A00]/20 hover:shadow-xl hover:-translate-y-1 transition-all flex items-center justify-center gap-2 group"
                        >
                            Start Batch
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    {/* Trust Badges */}
                    <div className="flex flex-wrap gap-8 border-t border-slate-200 pt-8">
                        <div>
                            <div className="text-2xl font-bold text-[#0F172A]">15k+</div>
                            <div className="text-sm text-slate-500 font-medium">Chicks Delivered</div>
                        </div>
                        <div className="w-px h-12 bg-slate-200 hidden sm:block"></div>
                        <div>
                            <div className="text-2xl font-bold text-[#0F172A]">98%</div>
                            <div className="text-sm text-slate-500 font-medium">Survival Rate</div>
                        </div>
                        <div className="w-px h-12 bg-slate-200 hidden sm:block"></div>
                        <div>
                            <div className="text-2xl font-bold text-[#0F172A]">24/7</div>
                            <div className="text-sm text-slate-500 font-medium">Vet Support</div>
                        </div>
                    </div>
                </motion.div>

                {/* Hero Image */}
                <motion.div
                    initial={{ opacity: 0, x: 30, scale: 0.95 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative"
                >
                    <div className="relative w-full aspect-square max-w-[600px] mx-auto">
                        <div className="absolute inset-0 bg-gradient-to-tr from-[#FF8A00]/10 to-[#00BFFF]/10 rounded-full blur-3xl -z-10"></div>

                        {/* Organic Shape Behind */}
                        <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] text-white drop-shadow-2xl -z-10" viewBox="0 0 200 200" fill="currentColor">
                            <path d="M45.7,-76.4C58.9,-69.3,69.1,-56.3,76.5,-42.6C83.9,-28.9,88.5,-14.4,87.6,-0.5C86.7,13.4,80.3,26.8,71.2,38.2C62.1,49.6,50.3,59,37.8,65.8C25.3,72.6,12.1,76.8,-0.6,77.9C-13.3,79,-26.6,77,-38.5,70.1C-50.4,63.2,-60.9,51.4,-69.1,38.1C-77.3,24.8,-83.2,10,-81.9,-4.2C-80.6,-18.4,-72.1,-32,-61.6,-42.9C-51.1,-53.8,-38.6,-62,-26.3,-69.6C-14,-77.2,-1.9,-84.2,11.2,-82.3C24.3,-80.4,32.5,-83.5,45.7,-76.4Z" transform="translate(100 100)" />
                        </svg>

                        {/* Image */}
                        <div className="relative w-full h-full z-10 transition-transform hover:scale-105 duration-700 ease-in-out">
                            <img
                                src="/fluffy_chick.png"
                                alt="Healthy Fluffy Chick"
                                className="object-contain w-full h-full drop-shadow-2xl"
                            />
                        </div>

                        {/* Floating Tech Elements */}
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                            className="absolute top-10 right-0 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 z-20 flex items-center gap-3"
                        >
                            <div className="bg-[#4CAF50]/10 p-2.5 rounded-xl text-[#4CAF50]">
                                <Flask className="w-6 h-6" />
                            </div>
                            <div>
                                <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">DNA Verified</div>
                                <div className="text-[#0A2540] font-bold">Pure Breed</div>
                            </div>
                        </motion.div>

                        <motion.div
                            animate={{ y: [0, 10, 0] }}
                            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
                            className="absolute bottom-20 -left-4 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 z-20 flex items-center gap-3"
                        >
                            <div className="bg-[#FF8A00]/10 p-2.5 rounded-xl text-[#FF8A00]">
                                <Activity className="w-6 h-6" />
                            </div>
                            <div>
                                <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">Health Status</div>
                                <div className="text-[#0A2540] font-bold">Optimal Growth</div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
