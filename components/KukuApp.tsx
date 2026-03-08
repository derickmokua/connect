"use client";

import React, { useEffect } from "react";
import Navbar from "./Navbar";
import Hero from "./KuroilerHero";
import KuroilerAdvantages from "./KuroilerAdvantages";

import dynamic from "next/dynamic";

const GrowthTimeline = dynamic(() => import("./GrowthTimeline"));
const TrustLogistics = dynamic(() => import("./TrustLogistics"));
const VaccinationScheduler = dynamic(() => import("./VaccinationScheduler"));
const CareTimeline = dynamic(() => import("./CareTimeline"));
const Reviews = dynamic(() => import("./Reviews"));
const Gallery = dynamic(() => import("./Gallery"));
const ContactSection = dynamic(() => import("./ContactSection"));
const AboutUs = dynamic(() => import("./AboutUs"));
const Footer = dynamic(() => import("./Footer"));
const Chatbot = dynamic(() => import("./Chatbot").then(mod => mod.Chatbot));


export default function KukuApp() {
    useEffect(() => {
        const isMobile = typeof window !== "undefined" && /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        if (isMobile) {
            // Remove hash from URL if present and scroll to top
            if (window.location.hash) {
                history.replaceState(null, '', window.location.pathname + window.location.search);
            }
            window.scrollTo({ top: 0, behavior: 'auto' });
        }
    }, []);
    return (
        <div className="min-h-screen bg-[#0F172A]">
            <Navbar />
            <main>
                <Hero />
                <KuroilerAdvantages />
                <GrowthTimeline />
                <TrustLogistics />
                <AboutUs />
                <Reviews />
                <VaccinationScheduler />

                <section id="how-it-works" className="py-24 px-4 bg-[#0F172A] relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent opacity-50"></div>
                    <div className="max-w-7xl mx-auto text-center relative z-10">
                        <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-12">Maximum Growth</h2>
                        <CareTimeline />
                    </div>
                </section>

                <Gallery />
                <ContactSection />
            </main>
            <Footer />
            <Chatbot />
        </div>
    );
}
