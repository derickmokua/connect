"use client";

import React from "react";
import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";

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
        content: "Professional team. The profit calculator on the site helped me plan my budget accurately. Highly recommend for serious farmers.",
        rating: 4,
    }
];

export default function Reviews() {
    return (
        <section id="reviews" className="py-24 px-4 bg-orange-50/50">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <span className="text-orange-600 font-semibold tracking-wider uppercase text-sm">Community Feedback</span>
                    <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mt-2 mb-4">Farmer Stories</h2>
                    <p className="text-slate-600 text-lg max-w-2xl mx-auto">Don't just take our word for it. Hear from the successful farmers in our community.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {reviews.map((review, idx) => (
                        <motion.div
                            key={review.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1, duration: 0.5 }}
                            viewport={{ once: true }}
                            className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-shadow duration-300 border border-slate-100 relative group"
                        >
                            <div className="absolute top-8 right-8 text-orange-100 group-hover:text-orange-200 transition-colors">
                                <Quote className="w-12 h-12" />
                            </div>

                            <div className="flex gap-1 mb-6">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`w-5 h-5 ${i < review.rating ? "text-amber-400 fill-amber-400" : "text-gray-200"}`}
                                    />
                                ))}
                            </div>

                            <p className="text-slate-700 mb-8 leading-relaxed relative z-10">"{review.content}"</p>

                            <div className="flex items-center gap-4 mt-auto">
                                <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">
                                    {review.name.charAt(0)}
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900">{review.name}</h4>
                                    <p className="text-xs text-slate-500 font-semibold uppercase tracking-wide">{review.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
