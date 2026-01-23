"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ArrowRight, ArrowLeft, ShoppingCart, Info, Minus, Plus } from "lucide-react";
import { useCart } from "./context/CartContext";

type ProductType = "chick" | "mature" | "egg";

interface ProductStage {
    id: string;
    label: string;
    price: number;
    desc: string;
    features: string[];
    type: ProductType;
    unit?: string;
    popular?: boolean;
}

const productCategories: Record<string, ProductStage[]> = {
    chicks: [
        { id: "c1", label: "Day Old", price: 110, type: "chick", desc: "Freshly hatched. Needs 24/7 heat.", features: ["Cheapest Entry", "Requires Brooder"] },
        { id: "c2", label: "1 Week Old", price: 130, type: "chick", desc: "Past critical start.", features: ["1st Gumboro Done", "Active & Alert"] },
        { id: "c3", label: "2 Weeks Old", price: 160, type: "chick", desc: "Growing fast, less heat needed.", features: ["Gumboro Vaccinated", "Strong Immunity"] },
        { id: "c4", label: "3 Weeks Old", price: 190, type: "chick", desc: "Feathering well.", features: ["Newcastle Vaccinated", "Active Foraging"] },
        { id: "c5", label: "4 Weeks Old", price: 250, type: "chick", desc: "Hardened and ready for coop.", features: ["No Heat Needed", "Free-Range Ready"], popular: true },
    ],
    mature: [
        { id: "m1", label: "Mature Hen", price: 1000, type: "mature", desc: "Ready to lay or eat.", features: ["Ready to Lay", "Great Meat"] },
        { id: "m2", label: "Mature Cock", price: 1500, type: "mature", desc: "Flock leader.", features: ["Breeding Stock", "Heavy Weight"] },
    ],
    eggs: [
        { id: "e1", label: "Table Eggs", price: 500, type: "egg", desc: "Fresh for consumption.", features: ["Yellow Yolk", "Organic"], unit: "Tray" },
        { id: "e2", label: "Fertilized Eggs", price: 1000, type: "egg", desc: "Ready for incubation.", features: ["High Hatch Rate", "pure Kuroiler"], unit: "Tray" },
    ]
};

export default function GrowthTimeline() {
    const { addToCart, setIsCartOpen } = useCart();
    const [step, setStep] = useState(1);
    const [activeCategory, setActiveCategory] = useState<"chicks" | "mature" | "eggs">("chicks");

    // Wizard State (Chicks)
    const [selectedChickStage, setSelectedChickStage] = useState<ProductStage>(productCategories.chicks[0]);
    const [chickQuantity, setChickQuantity] = useState(50);
    const [protocols, setProtocols] = useState({ starterPack: false, bioShield: false });

    const handleNext = () => setStep((prev) => Math.min(prev + 1, 4));
    const handleBack = () => setStep((prev) => Math.max(prev - 1, 1));

    const handleAddChickToCart = () => {
        addToCart({
            id: selectedChickStage.id,
            title: `[BATCH] ${selectedChickStage.label}`,
            price: selectedChickStage.price,
            image: "🐣",
            quantity: chickQuantity
        });

        if (protocols.starterPack) {
            addToCart({ id: `kit-feed-${selectedChickStage.id}`, title: `[KIT] Starter Feed Pack`, price: 850, image: "📦", quantity: 1 });
        }
        if (protocols.bioShield) {
            addToCart({ id: `kit-bio-${selectedChickStage.id}`, title: `[KIT] Bio-Shield Vaccine Kit`, price: 1500, image: "💉", quantity: 1 });
        }
        setIsCartOpen(true);
    };

    return (
        <section id="products" className="py-24 px-4 bg-[#FAFAFA] border-t border-slate-200">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-extrabold text-[#0F172A] mb-2">Start Your Batch</h2>
                    <p className="text-[#6B7280] text-sm md:text-lg font-medium">Select a category to begin.</p>
                </div>

                {/* Category Tabs */}
                <div className="flex justify-center mb-8 md:mb-12 space-x-2 md:space-x-4">
                    {(["chicks", "mature", "eggs"] as const).map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-4 md:px-8 py-2 md:py-3 rounded-full font-bold text-xs md:text-base capitalize transition-all duration-300 shadow-sm
                                ${activeCategory === cat
                                    ? "bg-[#FF8A00] text-white shadow-[#FF8A00]/25 shadow-lg scale-105"
                                    : "bg-white text-slate-500 hover:bg-slate-50 border border-slate-200"}`}
                        >
                            {cat === "mature" ? "Mature" : cat}
                        </button>
                    ))}
                </div>

                {/* RENDER CONTENT BASED ON CATEGORY */}
                <div className="bg-white/40 backdrop-blur-md rounded-[2.5rem] shadow-xl border border-white/50 overflow-hidden min-h-[500px]">

                    {/* OPTION 1: CHICKS WIZARD */}
                    {activeCategory === "chicks" && (
                        <div className="p-6 md:p-12">
                            {/* Wizard Progress */}
                            <div className="flex justify-center mb-8 md:mb-12">
                                <div className="hidden md:flex items-center gap-4">
                                    {["Choose Age", "Quantity", "Add-ons", "Summary"].map((label, idx) => (
                                        <div key={idx} className={`items-center gap-2 flex ${step > idx ? "text-[#FF8A00]" : "text-slate-600"}`}>
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm border-2 
                                                ${step > idx ? "bg-[#FF8A00] text-white border-[#FF8A00]" :
                                                    step === idx + 1 ? "border-[#FF8A00] text-[#FF8A00]" : "border-slate-300 text-slate-400"}`}>
                                                {idx + 1}
                                            </div>
                                            <span className="font-semibold text-sm">{label}</span>
                                            {idx < 3 && <div className="w-8 h-0.5 bg-slate-200" />}
                                        </div>
                                    ))}
                                </div>
                                <div className="md:hidden bg-[#FF8A00]/10 px-4 py-2 rounded-full border border-[#FF8A00]/20">
                                    <span className="text-[#FF8A00] font-bold text-sm">Step {step} of 4</span>
                                </div>
                            </div>

                            <AnimatePresence mode="wait">
                                {/* STEP 1: CHOSE AGE */}
                                {step === 1 && (
                                    <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                                        <h3 className="text-2xl font-bold text-[#1F2937] text-center md:text-left">Step 1: Choose Chick Age</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {productCategories.chicks.map((stage) => (
                                                <button
                                                    key={stage.id}
                                                    onClick={() => setSelectedChickStage(stage)}
                                                    className={`p-6 rounded-[24px] border-2 text-left transition-all hover:shadow-xl relative overflow-hidden group backdrop-blur-md shadow-sm
                                                    ${selectedChickStage.id === stage.id
                                                            ? "border-[#FF8A00] bg-[#FF8A00]/5 ring-1 ring-[#FF8A00]/20"
                                                            : stage.popular
                                                                ? "border-[#FF8A00]/60 bg-white/70 shadow-md ring-1 ring-[#FF8A00]/30"
                                                                : "border-slate-200 bg-white/60 hover:border-[#FF8A00]/50 hover:bg-white/80"
                                                        }`}
                                                >
                                                    {stage.popular && (
                                                        <div className="absolute top-0 right-0 bg-gradient-to-bl from-[#FF8A00] to-[#FF6200] text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl shadow-sm z-10">
                                                            MOST POPULAR
                                                        </div>
                                                    )}

                                                    <div className="flex justify-between items-start mb-2 mt-1">
                                                        <span className={`font-bold text-lg ${stage.popular ? "text-[#0F172A]" : "text-[#1F2937]"}`}>{stage.label}</span>
                                                        <span className="font-bold text-[#FF8A00]">KES {stage.price}</span>
                                                    </div>
                                                    <p className="text-slate-400 mb-4 font-medium text-sm">{stage.desc}</p>
                                                    <div className="space-y-1">
                                                        {stage.features.map(f => (
                                                            <div key={f} className="flex items-center gap-2 text-sm text-slate-500">
                                                                <Check className={`w-4 h-4 ${stage.popular ? "text-[#FF8A00]" : "text-[#10B981]"}`} /> {f}
                                                            </div>
                                                        ))}
                                                    </div>
                                                    {selectedChickStage.id === stage.id && !stage.popular && (
                                                        <div className="absolute top-0 right-0 p-2 bg-[#FF8A00] text-white rounded-bl-2xl shadow-sm">
                                                            <Check className="w-4 h-4" />
                                                        </div>
                                                    )}
                                                </button>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}

                                {/* STEP 2: QUANTITY */}
                                {step === 2 && (
                                    <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                                        <h3 className="text-2xl font-bold text-[#0F172A] text-center md:text-left">Step 2: How many chicks?</h3>
                                        <div className="bg-white/50 backdrop-blur-sm p-10 rounded-[2rem] border border-white/60 text-center shadow-inner max-w-2xl mx-auto">
                                            <div className="text-7xl font-extrabold text-[#FF8A00] mb-6">{chickQuantity}</div>
                                            <input
                                                type="range"
                                                min={10}
                                                max={500}
                                                step={10}
                                                value={chickQuantity}
                                                onChange={(e) => setChickQuantity(parseInt(e.target.value))}
                                                className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#FF8A00]"
                                            />
                                            <p className="text-slate-400 mt-6 font-medium">Slide to adjust (Min 10 Birds)</p>
                                        </div>
                                        <div className="p-6 bg-[#0F172A] rounded-[2rem] shadow-lg border border-slate-700 text-center text-white max-w-2xl mx-auto">
                                            <p className="text-sm font-bold text-slate-400 uppercase tracking-wide mb-1">Total Bird Cost</p>
                                            <p className="text-3xl font-extrabold">KES {(selectedChickStage.price * chickQuantity).toLocaleString()}</p>
                                        </div>
                                    </motion.div>
                                )}

                                {/* STEP 3: SUCCESS KITS */}
                                {step === 3 && (
                                    <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                                        <h3 className="text-2xl font-bold text-[#1F2937] text-center md:text-left">Step 3: Add Success Kits</h3>
                                        <p className="text-slate-400 text-center md:text-left">Optional add-ons to ensure your batch survives and grows.</p>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div
                                                onClick={() => setProtocols(p => ({ ...p, starterPack: !p.starterPack }))}
                                                className={`p-6 rounded-[24px] border-2 cursor-pointer transition-all flex flex-col md:flex-row items-center gap-6 backdrop-blur-md shadow-sm hover:shadow-xl
                                                ${protocols.starterPack ? "border-[#FF8A00] bg-[#FF8A00]/5 ring-1 ring-[#FF8A00]/20" : "border-slate-200 bg-white/60 hover:border-[#FF8A00]/50 hover:bg-white/80"}`}
                                            >
                                                <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center shrink-0 text-2xl
                                                    ${protocols.starterPack ? "border-[#FF8A00] bg-[#FF8A00] text-white" : "border-slate-300 bg-white"}`}>
                                                    {protocols.starterPack ? <Check className="w-6 h-6" /> : "📦"}
                                                </div>
                                                <div className="flex-1 text-center md:text-left">
                                                    <h4 className="font-bold text-[#0F172A] text-lg">Starter Feed Pack</h4>
                                                    <p className="text-slate-500 text-sm">High-protein Start feed for Week 1.</p>
                                                </div>
                                                <div className="font-bold text-[#FF8A00] text-lg whitespace-nowrap">+ 850 KES</div>
                                            </div>

                                            <div
                                                onClick={() => setProtocols(p => ({ ...p, bioShield: !p.bioShield }))}
                                                className={`p-6 rounded-[24px] border-2 cursor-pointer transition-all flex flex-col md:flex-row items-center gap-6 backdrop-blur-md shadow-sm hover:shadow-xl
                                                ${protocols.bioShield ? "border-[#FF8A00] bg-[#FF8A00]/5 ring-1 ring-[#FF8A00]/20" : "border-slate-200 bg-white/60 hover:border-[#FF8A00]/50 hover:bg-white/80"}`}
                                            >
                                                <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center shrink-0 text-2xl
                                                    ${protocols.bioShield ? "border-[#FF8A00] bg-[#FF8A00] text-white" : "border-slate-300 bg-white"}`}>
                                                    {protocols.bioShield ? <Check className="w-6 h-6" /> : "💉"}
                                                </div>
                                                <div className="flex-1 text-center md:text-left">
                                                    <h4 className="font-bold text-[#0F172A] text-lg">Bio-Shield Vaccine Kit</h4>
                                                    <p className="text-slate-500 text-sm">Gumboro & Newcastle vaccines.</p>
                                                </div>
                                                <div className="font-bold text-[#FF8A00] text-lg whitespace-nowrap">+ 1,500 KES</div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {/* STEP 4: SUMMARY */}
                                {step === 4 && (
                                    <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                                        <h3 className="text-2xl font-bold text-[#1F2937] text-center md:text-left">Step 4: Confirm Batch</h3>

                                        <div className="bg-[#0F172A] text-white rounded-[24px] p-8 space-y-4 font-mono text-sm relative overflow-hidden border border-slate-700 shadow-xl max-w-2xl mx-auto">
                                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FF8A00] to-[#FF6B00]"></div>

                                            <div className="flex justify-between items-center border-b border-slate-700 pb-3">
                                                <span className="text-slate-400">BATCH PROFILE</span>
                                                <span className="font-bold text-[#FF8A00]">{selectedChickStage.label.toUpperCase()}</span>
                                            </div>
                                            <div className="flex justify-between items-center border-b border-slate-700 pb-3">
                                                <span className="text-slate-400">QUANTITY</span>
                                                <span className="font-bold">{chickQuantity} BIRDS</span>
                                            </div>
                                            <div className="flex justify-between items-center border-b border-slate-700 pb-3">
                                                <span className="text-slate-400">SUCCESS KIT</span>
                                                <span className="text-right">
                                                    {protocols.starterPack ? "FEED LOADED" : "NO FEED"}<br />
                                                    {protocols.bioShield ? "VACCINES LOADED" : "NO VACCINES"}
                                                </span>
                                            </div>
                                            <div className="flex justify-between items-center pt-2">
                                                <span className="text-slate-400 text-lg">TOTAL INVESTMENT</span>
                                                <span className="font-bold text-2xl text-[#FF8A00]">KES {((selectedChickStage.price * chickQuantity) + (protocols.starterPack ? 850 : 0) + (protocols.bioShield ? 1500 : 0)).toLocaleString()}</span>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Wizard Footer */}
                            <div className="mt-8 md:mt-12 flex justify-between items-center border-t border-slate-200 pt-6 md:pt-8">
                                <button
                                    onClick={handleBack}
                                    disabled={step === 1}
                                    className={`flex items-center gap-2 font-bold px-4 md:px-6 py-2 md:py-3 text-sm md:text-base rounded-full transition ${step === 1 ? "text-slate-400 cursor-not-allowed" : "text-slate-500 hover:bg-slate-100"}`}
                                >
                                    <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" /> Back
                                </button>

                                {step < 4 ? (
                                    <button
                                        onClick={handleNext}
                                        className="flex items-center gap-2 bg-[#FF8A00] text-white px-6 md:px-8 py-2 md:py-3 text-sm md:text-base rounded-full font-bold hover:shadow-lg hover:shadow-[#FF8A00]/20 transition transform hover:-translate-y-0.5"
                                    >
                                        Continue <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                                    </button>
                                ) : (
                                    <button
                                        onClick={handleAddChickToCart}
                                        className="flex items-center gap-2 bg-[#FF8A00] text-white px-6 md:px-8 py-2 md:py-3 text-sm md:text-base rounded-full font-bold hover:bg-[#ff7b00] transition shadow-lg shadow-[#FF8A00]/20 transform hover:-translate-y-0.5"
                                    >
                                        <ShoppingCart className="w-4 h-4 md:w-5 md:h-5" /> Add to Cart
                                    </button>
                                )}
                            </div>
                        </div>
                    )}

                    {/* OPTION 2: MATURE & EGGS (SIMPLE GRID) */}
                    {activeCategory !== "chicks" && (
                        <div className="p-6 md:p-12">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto"
                            >
                                {productCategories[activeCategory].map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </motion.div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}

function ProductCard({ product }: { product: ProductStage }) {
    const { addToCart, setIsCartOpen } = useCart();
    const [qty, setQty] = useState(1);

    const handleAdd = () => {
        addToCart({
            id: product.id,
            title: `[ORDER] ${product.label}`,
            price: product.price,
            image: product.type === "egg" ? "🥚" : "🐔",
            quantity: qty
        });
        setIsCartOpen(true);
    };

    return (
        <div className="bg-white border-2 border-slate-100 p-6 rounded-[24px] hover:border-[#FF8A00]/30 hover:shadow-xl transition-all duration-300 group">
            <div className="flex justify-between items-start mb-4">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-3xl shadow-inner">
                    {product.type === "egg" ? "🥚" : "🐔"}
                </div>
                <div className="text-right">
                    <div className="font-extrabold text-2xl text-[#0F172A]">KES {product.price.toLocaleString()}</div>
                    {product.unit && <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">{product.unit}</div>}
                </div>
            </div>

            <h3 className="font-bold text-xl text-[#0F172A] mb-2">{product.label}</h3>
            <p className="text-slate-500 text-sm mb-6 min-h-[40px]">{product.desc}</p>

            <div className="space-y-2 mb-6">
                {product.features.map((f, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs font-bold text-slate-400">
                        <Check className="w-4 h-4 text-[#22C55E]" /> {f}
                    </div>
                ))}
            </div>

            <div className="flex items-center gap-4 pt-6 border-t border-slate-100">
                <div className="flex items-center bg-slate-100 rounded-full px-4 py-2 gap-4">
                    <button onClick={() => setQty(Math.max(1, qty - 1))} className="hover:text-[#FF8A00] transition"><Minus className="w-4 h-4" /></button>
                    <span className="font-bold text-[#0F172A] w-4 text-center">{qty}</span>
                    <button onClick={() => setQty(qty + 1)} className="hover:text-[#FF8A00] transition"><Plus className="w-4 h-4" /></button>
                </div>
                <button
                    onClick={handleAdd}
                    className="flex-1 bg-[#0F172A] text-white py-2 md:py-3 rounded-full font-bold hover:bg-[#FF8A00] hover:shadow-lg hover:shadow-[#FF8A00]/20 transition-all flex items-center justify-center gap-2 text-sm md:text-base"
                >
                    <ShoppingCart className="w-4 h-4" /> Add
                </button>
            </div>
        </div>
    )
}
