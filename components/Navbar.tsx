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
        <nav className="fixed top-0 w-full bg-[#FFFCF8]/90 backdrop-blur-md z-50 border-b border-gray-100 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">

                    {/* Logo - Text Only */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <span className="font-[family-name:var(--font-outfit)] font-extrabold text-2xl md:text-3xl text-slate-900 tracking-tight flex flex-col justify-center h-full pt-1 transition-transform duration-300 group-hover:scale-105">
                            <span>Kuku<span className="text-orange-500">Connect.</span></span>
                        </span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden lg:flex items-center space-x-2 bg-white/50 p-1.5 rounded-full border border-gray-100 shadow-sm">
                        {links.map((link) => (
                            <a
                                key={link.name}
                                href={`#${link.to}`}
                                className="text-slate-600 hover:text-orange-600 text-sm font-medium hover:bg-orange-50 px-4 py-2.5 rounded-full transition-all cursor-pointer"
                            >
                                {link.name}
                            </a>
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="flex items-center lg:hidden">
                        <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-slate-800 hover:bg-gray-100 rounded-full transition">
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="lg:hidden bg-[#FFFCF8] border-t border-gray-100 absolute w-full shadow-xl">
                    <div className="px-4 py-6 space-y-4">
                        {links.map((link) => (
                            <a
                                key={link.name}
                                href={`#${link.to}`}
                                onClick={() => setIsOpen(false)}
                                className="block text-slate-800 hover:text-orange-600 font-medium text-lg px-2 py-2 hover:bg-orange-50 rounded-lg transition"
                            >
                                {link.name}
                            </a>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
}
