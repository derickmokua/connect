"use client";

import React from "react";
import Link from "next/link";
import { Phone, Mail, MapPin, Facebook, Instagram, Lock, ShieldCheck } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-[#0F172A] text-slate-300 pt-24 pb-12 border-t border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">

                    {/* Brand */}
                    <div className="space-y-6">
                        <div className="flex items-center space-x-3">
                            <span className="font-extrabold text-3xl text-white tracking-tight">Kuku<span className="text-[#FF8A00]">Connect.</span></span>
                        </div>
                        <p className="text-slate-400 text-sm leading-relaxed max-w-xs font-medium">
                            The High-Yield Poultry System. We supply hardened Kuroilers and the scientific routine to ensure your success.
                        </p>
                    </div>

                    {/* Links */}
                    <div>
                        <h3 className="font-bold text-white text-lg mb-6">System Links</h3>
                        <ul className="space-y-4 text-sm font-medium">
                            <li><Link href="#products" className="hover:text-[#FF8A00] transition-colors">Start Your Batch</Link></li>
                            <li><Link href="#vaccination" className="hover:text-[#FF8A00] transition-colors">Immunity Protocol</Link></li>
                            <li><Link href="#care-guide" className="hover:text-[#FF8A00] transition-colors">Success Routine</Link></li>
                            <li><Link href="#gallery" className="hover:text-[#FF8A00] transition-colors">Evidence Gallery</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="font-bold text-white text-lg mb-6">Expert Access</h3>
                        <ul className="space-y-4 text-sm font-medium">
                            <li className="flex items-center gap-3 hover:text-white transition-colors">
                                <Phone className="w-5 h-5 text-[#FF8A00]" /> +254 716 883 375
                            </li>
                            <li className="flex items-center gap-3 hover:text-white transition-colors">
                                <Mail className="w-5 h-5 text-[#FF8A00]" /> info@kukuconnect.com
                            </li>
                            <li className="flex items-center gap-3 hover:text-white transition-colors">
                                <MapPin className="w-5 h-5 text-[#FF8A00]" /> Kitui, Kenya
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter / Socials mock */}
                    <div>
                        <h3 className="font-bold text-white text-lg mb-6">Daily Updates</h3>
                        <p className="text-slate-400 text-sm mb-6 font-medium">Join our WhatsApp Channel for verified farming tips.</p>
                        <a
                            href="https://whatsapp.com/channel/placeholder"
                            className="inline-flex items-center justify-center px-6 py-3.5 bg-[#4CAF50] text-white rounded-xl font-bold text-sm hover:bg-[#388E3C] transition-all w-full shadow-lg shadow-[#4CAF50]/20 hover:shadow-[#4CAF50]/30 hover:-translate-y-0.5"
                        >
                            Follow Channel
                        </a>

                        <div className="flex gap-4 mt-8">
                            {[
                                { Icon: Mail, href: "mailto:info@kukuconnect.com" },
                                { Icon: Facebook, href: "#" },
                                { Icon: Instagram, href: "#" },
                            ].map(({ Icon, href }, i) => (
                                <a key={i} href={href} className="p-2.5 bg-[#162B4D] border border-[#2A456B] rounded-full hover:border-[#FF8A00] hover:text-[#FF8A00] text-slate-400 transition-all duration-300">
                                    <Icon className="w-5 h-5" />
                                </a>
                            ))}
                            <a href="#" className="p-2.5 bg-[#162B4D] border border-[#2A456B] rounded-full hover:border-[#FF8A00] hover:text-[#FF8A00] text-slate-400 transition-all duration-300 group">
                                <svg
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                    className="w-5 h-5 fill-current"
                                >
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-[#1E3A5F] pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-bold text-slate-500">
                    <p>© {new Date().getFullYear()} KukuConnect. All rights reserved.</p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-slate-300 transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
