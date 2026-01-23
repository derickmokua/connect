
"use client";

import React, { useState } from "react";
import { useCart } from "@/components/context/CartContext";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db, appId } from "@/lib/firebase/client";
import { useRouter } from "next/navigation";
import { Phone, MapPin, Loader2, CheckCircle, TrendingUp, Truck, ShieldCheck } from "lucide-react";
import Link from "next/link";

// Force dynamic rendering to avoid build-time Firebase initialization
export const dynamic = 'force-dynamic';

const getOrdersCollectionPath = () => `/artifacts/${appId}/public/data/orders`;

export default function CheckoutPage() {
    const { cart, cartTotal, clearCart } = useCart();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [orderId, setOrderId] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phoneMain: "",
        phoneAlt: "",
        city: "",
        village: "",
        landmark: "",
    });

    // Helpers
    const getMarketReadyDate = () => {
        const batchItem = cart.find(i => i.title.includes('[BATCH]'));
        let monthsToAdd = 5;
        if (batchItem) {
            if (batchItem.title.includes('2-Weeks')) monthsToAdd = 4.5;
            if (batchItem.title.includes('1-Month')) monthsToAdd = 4;
            if (batchItem.title.includes('Mature')) monthsToAdd = 1;
        }
        const date = new Date();
        date.setMonth(date.getMonth() + Math.floor(monthsToAdd));
        return date.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });
    };

    const hasSuccessKit = cart.some(i => i.title === 'The Success Kit');
    const batchItem = cart.find(i => i.title.includes('[BATCH]'));

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const SHIPPING_COST = 500; // Flat rate standard delivery
    const finalTotal = cartTotal + SHIPPING_COST;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (cart.length === 0) {
            setError("Your cart is empty.");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const orderRef = await addDoc(collection(db, getOrdersCollectionPath()), {
                customer: {
                    name: formData.name,
                    email: formData.email,
                    phoneMain: formData.phoneMain,
                    phoneAlt: formData.phoneAlt,
                    city: formData.city,
                    village: formData.village,
                    landmark: formData.landmark,
                },
                items: cart,
                billing: {
                    subtotal: cartTotal,
                    shipping: SHIPPING_COST,
                    total: finalTotal
                },
                paymentStatus: "Pending (Pay Later)",
                orderStatus: "New",
                createdAt: serverTimestamp(),
            });

            setOrderId(orderRef.id);
            setSuccess(true);
            clearCart();
        } catch (err: any) {
            console.error("Order Error:", err);
            setError("Failed to place order. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <div className="bg-white max-w-lg w-full rounded-3xl shadow-xl p-8 text-center space-y-6 border border-gray-100">
                    <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
                        <CheckCircle className="w-10 h-10" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-extrabold text-[#0F172A] mb-2">Order Received!</h1>
                        <p className="text-slate-500 text-lg">
                            Thank you, <span className="font-semibold text-[#0F172A]">{formData.name}</span>.
                        </p>
                        {orderId && <p className="text-xs text-slate-400 mt-2 uppercase tracking-widest">Order ID: {orderId.slice(0, 8)}</p>}
                    </div>

                    <div className="bg-[#FFFBEB] p-6 rounded-2xl border border-[#FCD34D] text-left">
                        <h3 className="font-bold text-[#92400E] mb-3 flex items-center gap-2">
                            <ShieldCheck className="w-5 h-5" /> Next Steps
                        </h3>
                        <p className="text-[#92400E] text-sm mb-4 leading-relaxed">
                            We have successfully received your order.
                        </p>
                        <div className="bg-white p-4 rounded-xl border border-[#FCD34D]/50 space-y-3">
                            <p className="text-[#0F172A] font-medium text-sm">
                                Our team will contact you shortly via <strong>{formData.phoneMain}</strong> to:
                            </p>
                            <ul className="text-sm text-slate-600 space-y-2 list-disc pl-4">
                                <li>Confirm your order details.</li>
                                <li>Organize payment.</li>
                                <li>Schedule your delivery.</li>
                            </ul>
                            <div className="flex justify-between text-sm border-t border-slate-100 pt-3 mt-2">
                                <span className="text-slate-500 font-bold">Total Due:</span>
                                <span className="font-bold text-[#FF8A00]">KES {finalTotal.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>

                    <p className="text-slate-400 text-sm">
                        Need help? Call us directly from the menu.
                    </p>

                    <Link
                        href="/"
                        className="block w-full py-4 bg-[#0F172A] text-white rounded-xl font-bold hover:bg-[#1E293B] transition shadow-lg"
                    >
                        Return Home
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">

                {/* Batch Business Plan (Left Column) */}
                <div className="order-2 lg:order-1 space-y-8">
                    <div>
                        <h2 className="text-3xl font-extrabold text-[#0F172A]">Order Details</h2>
                        <p className="text-slate-500">Review your items before placing the order.</p>
                    </div>

                    {/* Order Items List */}
                    <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm space-y-6">
                        <h3 className="text-xl font-bold text-[#0F172A] flex items-center gap-2">
                            <span className="w-8 h-8 bg-[#FFF7ED] text-[#FF8A00] rounded-full flex items-center justify-center text-sm font-bold">1</span>
                            Items in Cart
                        </h3>

                        <div className="divide-y divide-gray-50">
                            {cart.map((item) => (
                                <div key={item.id} className="flex items-start justify-between py-4 first:pt-0 last:pb-0">
                                    <div className="flex gap-4">
                                        <div className="w-12 h-12 bg-slate-50 rounded-lg flex items-center justify-center text-xl shrink-0">
                                            {item.image}
                                        </div>
                                        <div>
                                            <p className="font-bold text-[#0F172A] text-sm md:text-base">{item.title}</p>
                                            <p className="text-xs text-slate-500 font-medium mt-1">
                                                Qty: <span className="text-[#0F172A]">{item.quantity}</span>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold text-[#0F172A] text-sm md:text-base">KES {(item.price * item.quantity).toLocaleString()}</p>
                                        <p className="text-[10px] text-slate-400">@ {item.price.toLocaleString()}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Projected Performance (Conditional for Chicks) */}
                    {batchItem && (
                        <div className="bg-[#1A1A1A] text-white rounded-3xl p-8 border border-gray-800 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#D97706]/20 rounded-bl-full"></div>
                            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                                <span className="w-8 h-8 bg-[#D97706] text-white rounded-full flex items-center justify-center text-sm">2</span>
                                Projected Performance
                            </h3>
                            <div className="space-y-4 pl-10 relative z-10">
                                <div className="flex justify-between border-b border-gray-800 pb-2">
                                    <span className="text-gray-400 font-medium">Target Weight</span>
                                    <span className="font-bold text-white">3.5kg in 5 months</span>
                                </div>
                                <div className="flex justify-between border-b border-gray-800 pb-2">
                                    <span className="text-gray-400 font-medium">Target Survival</span>
                                    <span className="font-bold text-green-400">98% (With KukuConnect Routine)</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-400 font-medium">Est. Market Date</span>
                                    <span className="font-bold text-[#D97706]">{getMarketReadyDate()}</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Total Investment */}
                    <div className="bg-[#FFFBEB] rounded-3xl p-8 border border-[#FF8A00]/20 space-y-2">
                        <div className="flex justify-between items-center text-sm text-[#92400E]">
                            <span className="font-medium">Subtotal</span>
                            <span className="font-bold">KES {cartTotal.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm text-[#92400E]">
                            <span className="font-medium">Delivery Fee</span>
                            <span className="font-bold">KES {SHIPPING_COST.toLocaleString()}</span>
                        </div>
                        <div className="border-t border-[#D97706]/20 pt-2 flex justify-between items-center">
                            <span className="text-[#78350F] font-bold text-lg">Total Due</span>
                            <span className="text-3xl font-black text-[#FF8A00]">KES {finalTotal.toLocaleString()}</span>
                        </div>
                    </div>

                </div>

                {/* Secure Checkout Form (Right Column) */}
                <div className="order-1 lg:order-2">
                    <h2 className="text-2xl font-bold text-[#0F172A] mb-6">Secure Checkout</h2>
                    <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 space-y-6">
                        {error && (
                            <div className="p-4 bg-red-50 text-red-700 rounded-xl border border-red-200 text-sm">
                                {error}
                            </div>
                        )}

                        <div className="space-y-4">
                            <h3 className="font-bold text-[#0F172A] flex items-center gap-2 text-sm uppercase tracking-wider">
                                <Truck className="w-5 h-5 text-[#FF8A00]" /> Customer Details
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-slate-500 uppercase">Full Name *</label>
                                    <input required name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#FF8A00] outline-none transition bg-slate-50 focus:bg-white" placeholder="Your Name" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-slate-500 uppercase">Email Address *</label>
                                    <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#FF8A00] outline-none transition bg-slate-50 focus:bg-white" placeholder="john@example.com" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-slate-500 uppercase">Phone (M-Pesa) *</label>
                                    <input required type="tel" name="phoneMain" value={formData.phoneMain} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#FF8A00] outline-none transition bg-slate-50 focus:bg-white" placeholder="07..." />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-slate-500 uppercase">Alt Phone</label>
                                    <input type="tel" name="phoneAlt" value={formData.phoneAlt} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#FF8A00] outline-none transition bg-slate-50 focus:bg-white" placeholder="07..." />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4 pt-4 border-t border-slate-100">
                            <h3 className="font-bold text-[#0F172A] flex items-center gap-2 text-sm uppercase tracking-wider">
                                <MapPin className="w-5 h-5 text-[#FF8A00]" /> Delivery Location
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-slate-500 uppercase">City / Town *</label>
                                    <input required name="city" value={formData.city} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#FF8A00] outline-none transition bg-slate-50 focus:bg-white" placeholder="e.g. Nairobi" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-slate-500 uppercase">Village / Estate *</label>
                                    <input required name="village" value={formData.village} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#FF8A00] outline-none transition bg-slate-50 focus:bg-white" placeholder="e.g. Karen" />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-slate-500 uppercase">Closest Landmark *</label>
                                <input required name="landmark" value={formData.landmark} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#FF8A00] outline-none transition bg-slate-50 focus:bg-white" placeholder="e.g. Near The Chief's Office" />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading || cart.length === 0}
                            className="w-full py-4 bg-[#FF8A00] text-white rounded-full font-bold text-xl hover:bg-[#FF7518] transform transition shadow-lg disabled:opacity-50 flex items-center justify-center gap-2 shadow-[#FF8A00]/20"
                        >
                            {loading ? <Loader2 className="animate-spin" /> : "PLACE ORDER"}
                        </button>
                        <p className="text-center text-xs text-slate-400">
                            Securely encoded. Payment details will be reflected on the next screen.
                        </p>
                    </form>

                    {/* Security Badge */}
                    <div className="mt-8 text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-full text-xs text-slate-500 border border-slate-200">
                            <ShieldCheck className="w-4 h-4 text-green-500" />
                            Secure SSL Encrypted Checkout
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}