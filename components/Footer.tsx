"use client";

import React from "react";
import Link from "next/link";
import { Phone, Mail, MapPin, Facebook, Instagram, Lock, ShieldCheck } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-slate-900 text-slate-300 pt-24 pb-12 border-t border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">

                    {/* Brand */}
                    <div className="space-y-6">
                        <div className="flex items-center space-x-3">
                            <span className="font-extrabold text-3xl text-white tracking-tight">Kuku<span className="text-orange-500">Connect.</span></span>
                        </div>
                        <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
                            The High-Yield Poultry System. We supply hardened Kuroilers and the scientific routine to ensure your success.
                        </p>
                    </div>

                    {/* Links */}
                    <div>
                        <h3 className="font-bold text-white text-lg mb-6">System Links</h3>
                        <ul className="space-y-4 text-sm font-medium">
                            <li><Link href="#products" className="hover:text-orange-500 transition-colors">Start Your Batch</Link></li>
                            <li><Link href="#vaccination" className="hover:text-orange-500 transition-colors">Immunity Protocol</Link></li>
                            <li><Link href="#care-guide" className="hover:text-orange-500 transition-colors">Success Routine</Link></li>
                            <li><Link href="#gallery" className="hover:text-orange-500 transition-colors">Evidence Gallery</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="font-bold text-white text-lg mb-6">Expert Access</h3>
                        <ul className="space-y-4 text-sm font-medium">
                            <li className="flex items-center gap-3 hover:text-white transition-colors">
                                <Phone className="w-5 h-5 text-orange-500" /> +254 716 883 375
                            </li>
                            <li className="flex items-center gap-3 hover:text-white transition-colors">
                                <Mail className="w-5 h-5 text-orange-500" /> info@kukuconnect.com
                            </li>
                            <li className="flex items-center gap-3 hover:text-white transition-colors">
                                <MapPin className="w-5 h-5 text-orange-500" /> Kitui, Kenya
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter / Socials mock */}
                    <div>
                        <h3 className="font-bold text-white text-lg mb-6">Daily Updates</h3>
                        <p className="text-slate-400 text-sm mb-6">Join our WhatsApp Channel for verified farming tips.</p>
                        <a
                            href="https://whatsapp.com/channel/placeholder"
                            className="inline-flex items-center justify-center px-6 py-3.5 bg-[#25D366] text-white rounded-xl font-bold text-sm hover:bg-[#128C7E] transition-all w-full shadow-lg shadow-green-900/20 hover:shadow-green-900/30 hover:-translate-y-0.5"
                        >
                            Follow Channel
                        </a>

                        <div className="flex gap-4 mt-8">
                            {[
                                { Icon: Mail, href: "mailto:info@kukuconnect.com" },
                                { Icon: Facebook, href: "#" },
                                { Icon: Instagram, href: "#" },
                            ].map(({ Icon, href }, i) => (
                                <a key={i} href={href} className="p-2.5 bg-slate-800 border border-slate-700 rounded-full hover:border-orange-500 hover:text-orange-500 text-slate-400 transition-all duration-300">
                                    <Icon className="w-5 h-5" />
                                </a>
                            ))}
                            <a href="#" className="p-2.5 bg-slate-800 border border-slate-700 rounded-full hover:border-orange-500 hover:text-orange-500 text-slate-400 transition-all duration-300 group">
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

                <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-slate-500">
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
