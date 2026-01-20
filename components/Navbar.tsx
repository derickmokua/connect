"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X, Phone } from "lucide-react";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const links = [
        { name: "Home", to: "home" },
        { name: "Products", to: "products" },
        { name: "About us", to: "about" },
        { name: "How it works", to: "how-it-works" },
        { name: "Reviews", to: "reviews" },
        { name: "Gallery", to: "gallery" },
        { name: "Contact", to: "contact" },
    ];

    return (
        <nav className="fixed top-0 w-full bg-[#FAFAFA]/90 backdrop-blur-md z-50 border-b border-slate-200 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">

                    {/* Logo - Text Only */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <span className="font-[family-name:var(--font-outfit)] font-extrabold text-2xl md:text-3xl tracking-tight flex flex-col justify-center h-full pt-1 transition-transform duration-300 group-hover:scale-105">
                            <span className="text-[#FF8A00]">Kuku<span className="text-[#0F172A]">Connect.</span></span>
                        </span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden lg:flex items-center space-x-1">
                        {links.map((link) => (
                            <a
                                key={link.name}
                                href={`#${link.to}`}
                                className="text-[#0F172A] hover:text-[#FF8A00] text-sm font-bold px-4 py-2 rounded-full transition-all cursor-pointer hover:bg-slate-100"
                            >
                                {link.name}
                            </a>
                        ))}
                    </div>

                    {/* Call Us Button (Desktop) */}
                    <div className="hidden lg:flex items-center ml-4">
                        <a
                            href="tel:+254716883375"
                            className="flex items-center gap-2 bg-[#FF8A00] hover:bg-[#FF8C00] text-white px-6 py-2.5 rounded-full text-sm font-bold transition-all shadow-md hover:shadow-lg hover:shadow-[#FF8A00]/20 hover:-translate-y-0.5"
                        >
                            <Phone size={16} className="text-white" />
                            <span>Call Us</span>
                        </a>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="flex items-center lg:hidden gap-4">
                        <a
                            href="tel:+254716883375"
                            className="flex items-center justify-center w-10 h-10 bg-[#FF8A00]/10 rounded-full text-[#FF8A00] hover:bg-[#FF8A00] hover:text-white transition-all"
                        >
                            <Phone size={20} />
                        </a>
                        <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-[#0A2540] hover:bg-slate-100 rounded-full transition">
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="lg:hidden bg-white border-t border-slate-200 absolute w-full shadow-xl">
                    <div className="px-4 py-6 space-y-4">
                        {links.map((link) => (
                            <a
                                key={link.name}
                                href={`#${link.to}`}
                                onClick={() => setIsOpen(false)}
                                className="block text-[#0A2540] hover:text-[#FF8A00] font-bold text-lg px-4 py-3 hover:bg-slate-50 rounded-xl transition"
                            >
                                {link.name}
                            </a>
                        ))}
                        <a
                            href="tel:+254716883375"
                            className="flex items-center justify-center gap-2 w-full bg-[#FF8A00] text-white font-bold text-lg px-4 py-3 rounded-full hover:bg-[#FF8C00] transition mt-4 shadow-lg shadow-[#FF8A00]/20"
                        >
                            <Phone size={20} className="text-white" />
                            <span>Call Us: +254 716 883 375</span>
                        </a>
                    </div>
                </div>
            )}
        </nav>
    );
}
