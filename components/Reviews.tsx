"use client";

import React from "react";
import { Star, Quote } from "lucide-react";
import { m } from "framer-motion";

const reviews = [
    {
        id: 1,
        name: "John Kamau",
        role: "Poultry Farmer, Kitui",
        content: "The mortality rate of chicks from KukuConnect is widely low. I bought 200 chicks and raised 198 to maturity. Their vaccination schedule advice is spot on!",
        rating: 5,
    },
    {
        id: 2,
        name: "Sarah Ochieng",
        role: "Small Scale Farmer",
        content: "I love the delivery service. They call you to confirm everything. The 3-week old chicks saved me so much brooding stress.",
        rating: 5,
    },
    {
        id: 3,
        name: "David Njoroge",
        role: "Agri-Business Owner",
        content: "Professional team. The success schedule on the site helped me plan my bird management accurately. Highly recommend for serious farmers.",
        rating: 4,
    }
];

export default function Reviews() {
    return (
        <section id="reviews" className="py-24 px-4 bg-[#FAFAFA]">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <span className="text-[#C2410C] font-bold tracking-wider uppercase text-sm">Flock Feedback</span>
                    <h2 className="text-4xl md:text-5xl font-extrabold text-[#0F172A] mt-2 mb-4">Happy Farmers</h2>
                    <p className="text-slate-600 text-lg max-w-2xl mx-auto font-medium">Don't just take our word for it. Hear from the successful farmers in our community.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {reviews.map((review, idx) => (
                        <m.div
                            key={review.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1, duration: 0.5 }}
                            viewport={{ once: true }}
                            className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-2xl hover:shadow-[#FF8A00]/20 transition-all duration-300 border border-slate-100 relative group overflow-hidden hover:-translate-y-2"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-[#FF8A00]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div className="absolute top-8 right-8 text-slate-200 group-hover:text-[#FF8A00]/20 transition-colors">
                                <Quote className="w-12 h-12" />
                            </div>

                            <div className="flex gap-1 mb-6">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`w-5 h-5 ${i < review.rating ? "text-[#FFD54F] fill-[#FFD54F]" : "text-slate-200"}`}
                                    />
                                ))}
                            </div>

                            <p className="text-[#0F172A]/80 mb-8 leading-relaxed relative z-10 font-medium">"{review.content}"</p>

                            <div className="flex items-center gap-4 mt-auto">
                                <div className="w-12 h-12 bg-gradient-to-br from-[#C2410C] to-[#ea580c] rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">
                                    {review.name.charAt(0)}
                                </div>
                                <div>
                                    <h3 className="font-bold text-[#0F172A]">{review.name}</h3>
                                    <p className="text-xs text-slate-600 font-bold uppercase tracking-wide">{review.role}</p>
                                </div>
                            </div>
                        </m.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
