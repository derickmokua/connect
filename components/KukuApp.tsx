"use client";

import React, { useEffect } from "react";
import Navbar from "./Navbar";
import Hero from "./KuroilerHero";
import KuroilerAdvantages from "./KuroilerAdvantages";
import GrowthTimeline from "./GrowthTimeline";
import TrustLogistics from "./TrustLogistics";
import VaccinationScheduler from "./VaccinationScheduler";
import { Chatbot } from "./Chatbot";
import Footer from "./Footer";
import CareTimeline from "./CareTimeline";
import AboutUs from "./AboutUs";
import Reviews from "./Reviews";
import Gallery from "./Gallery";
import ContactSection from "./ContactSection";


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

                <section id="how-it-works" className="py-24 px-4 bg-[#0F172A] border-t border-slate-800">
                    <div className="max-w-7xl mx-auto text-center">
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
