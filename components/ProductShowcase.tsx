"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, Phone, MessageCircle } from "lucide-react";

const products = {
    chicks: [
        { id: 'c1', title: 'Day Old', price: 110, image: '🐣', features: ['Cheapest Entry Point', 'Requires Brooder', 'High Potential'], desc: 'Freshly hatched. Needs 24/7 heat and care.', recommended: false },
        { id: 'c2', title: '1 Week Old', price: 130, image: '🐥', features: ['1st Gumboro Done', 'Active & Alert', 'Starter Feed'], desc: 'Past the critical first few days.', recommended: false },
        { id: 'c3', title: '2 Weeks Old', price: 160, image: '🐥', features: ['Strong Immunity', 'Gumboro Vaccinated', 'Needs Less Heat'], desc: 'Growing fast and past high mortality risk.', recommended: false },
        { id: 'c4', title: '3 Weeks Old', price: 190, image: '🐤', features: ['Newcastle Vaccinated', 'Feathering Well', 'Active Foraging'], desc: 'Robust and almost ready for hardening.', recommended: false },
        { id: 'c5', title: '4 Weeks Old', price: 250, image: '🐓', features: ['No Heat Needed', 'Free-Range Ready', 'High Survival Rate'], desc: 'Hardened. Ready for the outside coop.', recommended: true }
    ],
    mature: [
        { id: 'm1', title: 'Mature Hen', price: 1000, image: '🐔', features: ['Ready to Lay', 'Great for Meat', 'Fully Grown'], desc: 'Perfect for immediate egg production or meat.', recommended: false },
        { id: 'm2', title: 'Mature Cock', price: 1500, image: '🐓', features: ['Breeding Stock', 'Heavy Weight', 'Flock Leader'], desc: 'Superior genetics for breeding your flock.', recommended: true }
    ],
    eggs: [
        { id: 'e1', title: 'Table Eggs', price: 500, image: '🥚', features: ['Freshly Collected', 'Yellow Yolk', 'Organic'], desc: 'Delicious, nutritious eggs for your table.', recommended: false, unit: ' / Tray' },
        { id: 'e2', title: 'Fertilized Eggs', price: 1000, image: '🐣', features: ['High Hatch Rate', 'Kuroiler Genetics', 'Selected Daily'], desc: 'Ready for incubation. Start your own flock.', recommended: true, unit: ' / Tray' }
    ]
};

export default function ProductShowcase() {
    return (
        <section id="products" className="py-20 px-4 bg-[#FAFAFA]">
            {/* Header */}
            <div className="max-w-7xl mx-auto mb-16 text-center">
                <h2 className="text-4xl font-extrabold text-[#0F172A] mb-4">Our Products</h2>
                <p className="text-[#6B7280] text-lg max-w-2xl mx-auto">Browse our complete range of quality poultry products.</p>
            </div>

            {/* CHICKS SECTION */}
            <div className="max-w-7xl mx-auto mb-20">
                <div className="flex items-center gap-4 mb-8">
                    <div className="h-px bg-slate-200 flex-1"></div>
                    <h3 className="text-2xl font-bold text-[#FF8A00] uppercase tracking-widest">Chicks (Day Old - 1 Month)</h3>
                    <div className="h-px bg-slate-200 flex-1"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {products.chicks.map((product, idx) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>

            {/* MATURE SECTION */}
            <div className="max-w-7xl mx-auto mb-20">
                <div className="flex items-center gap-4 mb-8">
                    <div className="h-px bg-slate-200 flex-1"></div>
                    <h3 className="text-2xl font-bold text-[#FF8A00] uppercase tracking-widest">Mature Chicken</h3>
                    <div className="h-px bg-slate-200 flex-1"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                    {products.mature.map((product, idx) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>

            {/* EGGS SECTION */}
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <div className="h-px bg-slate-200 flex-1"></div>
                    <h3 className="text-2xl font-bold text-[#FF8A00] uppercase tracking-widest">Fresh Eggs</h3>
                    <div className="h-px bg-slate-200 flex-1"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                    {products.eggs.map((product, idx) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function ProductCard({ product }: { product: any }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`relative flex flex-col p-8 transition-all duration-300 bg-white/40 backdrop-blur-md rounded-[24px] shadow-sm group overflow-hidden hover:-translate-y-2 hover:shadow-xl hover:bg-white/60 ${product.recommended ? 'border-2 border-[#FF8A00] ring-4 ring-[#FF8A00]/10' : 'border border-white/50'}`}
        >
            {/* Recommended Badge */}
            {product.recommended && (
                <div className="absolute top-0 right-0 left-0 bg-gradient-to-r from-[#FF8A00] to-[#FF6B00] text-white text-xs font-bold px-4 py-2 text-center uppercase tracking-widest shadow-sm">
                    Most Popular
                </div>
            )}

            <div className="text-6xl mb-6 text-center bg-white/50 w-24 h-24 mx-auto rounded-full flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300 mt-4 backdrop-blur-sm">
                {product.image}
            </div>

            <h3 className="text-xl font-extrabold text-[#0F172A] text-center mb-2">{product.title}</h3>

            <p className="text-center text-[#64748B] text-sm mb-8 px-2 min-h-[40px] leading-relaxed">{product.desc}</p>

            <div className="flex justify-center items-baseline mb-8 space-x-1 border-t border-slate-200/60 pt-6 w-full">
                <span className="text-lg font-bold text-[#0F172A] self-start mt-2">KES</span>
                <span className="text-5xl font-extrabold text-[#0F172A] tracking-tight">{product.price}</span>
                {product.unit && <span className="text-sm font-bold text-slate-400 self-end mb-2">{product.unit}</span>}
            </div>

            <ul className="space-y-4 mb-8">
                {product.features.map((feat: string, i: number) => (
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
                    <MessageCircle className="w-5 h-5" /> Order via WhatsApp
                </a>
            </div>
        </motion.div>
    )
}
