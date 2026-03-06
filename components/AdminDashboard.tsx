"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { onAuthStateChanged, signInAnonymously } from "firebase/auth";
import { collection, query, onSnapshot, doc, updateDoc } from "firebase/firestore";
import { Users, Shield, Phone, BarChart, Save, CheckCircle } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { auth, db, appId } from "@/lib/firebase/client";

const getPublicCollectionPath = (collectionName: string) =>
    `/artifacts/${appId}/public/data/${collectionName}`;
const getLeadsCollectionPath = () =>
    `/artifacts/${appId}/public/data/leads`;

export default function AdminDashboard() {
    const [isAuthReady, setIsAuthReady] = useState(false);
    const [userId, setUserId] = useState<string | null>(null);
    const [leads, setLeads] = useState<any[]>([]);
    const [products, setProducts] = useState<any[]>([]);
    const [editingStocks, setEditingStocks] = useState<{ [key: string]: number }>({});

    // Ref to prevent notification on mount
    const initialLoadLeads = useRef(true);

    // 1. Authentication effect with fix for Type Error
    useEffect(() => {
        // Shadowing 'auth' to a local variable helps TypeScript narrowing
        const firebaseAuth = auth;

        if (!firebaseAuth) {
            console.error("Firebase Auth not initialized");
            return;
        }

        const unsubscribe = onAuthStateChanged(firebaseAuth, async (user) => {
            if (user) {
                setUserId(user.uid);
            } else {
                try {
                    // Fix: Explicitly using the local checked variable
                    await signInAnonymously(firebaseAuth);
                } catch (error) {
                    console.error("Anonymous sign-in failed:", error);
                }
            }
            setIsAuthReady(true);
        });

        return () => unsubscribe();
    }, []);

    // 2. Data fetching effect
    useEffect(() => {
        if (!isAuthReady || !db) return;

        // Fetch Leads
        const leadsQuery = query(collection(db, getLeadsCollectionPath()));
        const unsubscribeLeads = onSnapshot(
            leadsQuery,
            (snapshot) => {
                const fetchedLeads = snapshot.docs.map((d) => ({
                    id: d.id,
                    ...d.data(),
                }));

                // Real-time notifications for new leads
                if (!initialLoadLeads.current) {
                    const newLeads = snapshot.docChanges().filter(change => change.type === "added");
                    if (newLeads.length > 0) {
                        toast.success(`${newLeads.length} new lead(s) arrived!`, {
                            icon: "🔔",
                            style: { borderRadius: '10px', background: '#333', color: '#fff' }
                        });
                        try {
                            const audio = new Audio("https://www.soundjay.com/buttons/sounds/button-10.mp3");
                            audio.play().catch(e => console.log('Audio playback prevented by browser policies.'));
                        } catch (e) { }
                    }
                } else {
                    initialLoadLeads.current = false;
                }

                setLeads(fetchedLeads);
            },
            (error) => {
                console.error("Error fetching leads:", error);
            }
        );

        // Fetch Products
        const productsQuery = query(collection(db, getPublicCollectionPath("products")));
        const unsubscribeProducts = onSnapshot(productsQuery, (snapshot) => {
            const fetchedProducts = snapshot.docs.map((d) => ({
                id: d.id,
                ...d.data(),
            }));
            setProducts(fetchedProducts);
        });

        return () => {
            unsubscribeLeads();
            unsubscribeProducts();
        };
    }, [isAuthReady]);

    // 3. Optimized Calculations
    const sortedLeads = useMemo(() => {
        return [...leads].sort((a, b) => {
            const timeA = a.createdAt?.toDate?.()?.getTime() || 0;
            const timeB = b.createdAt?.toDate?.()?.getTime() || 0;
            return timeB - timeA;
        });
    }, [leads]);

    const totalChicks = useMemo(() => {
        return products.reduce(
            (acc, p) => (p.age !== "Full-grown" ? acc + (Number(p.stock) || 0) : acc),
            0
        );
    }, [products]);

    // 4. Action Handlers
    const toggleContacted = async (leadId: string, currentStatus: boolean) => {
        try {
            if (!db) return;
            const leadRef = doc(db, getLeadsCollectionPath(), leadId);
            await updateDoc(leadRef, { contacted: !currentStatus });
            toast.success(`Lead marked as ${!currentStatus ? 'contacted' : 'waiting'}.`);
        } catch (error) {
            toast.error("Failed to update lead status.");
            console.error("Error updating lead:", error);
        }
    };

    const handleStockUpdate = async (productId: string, newStock: number | string) => {
        const stockNum = typeof newStock === 'string' ? parseInt(newStock, 10) : newStock;
        if (isNaN(stockNum)) return;

        try {
            if (!db) return;
            const productRef = doc(db, getPublicCollectionPath("products"), productId);
            await updateDoc(productRef, { stock: stockNum });
            toast.success("Stock updated successfully.");
        } catch (error) {
            toast.error("Failed to update stock.");
            console.error("Error updating stock:", error);
        }
    };

    // 5. Render States
    if (!isAuthReady) {
        return (
            <div className="flex items-center justify-center min-h-screen text-gray-500 bg-white">
                <div className="animate-pulse">Loading authentication status...</div>
            </div>
        );
    }

    if (!userId) {
        return (
            <div className="flex items-center justify-center min-h-screen text-red-600 font-bold bg-white">
                Access Denied. Authentication required.
            </div>
        );
    }

    return (
        <section className="py-20 px-4 bg-gray-50 min-h-screen">
            <Toaster position="top-right" />
            <div className="max-w-7xl mx-auto">
                <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <h1 className="text-4xl font-extrabold text-gray-900 flex items-center">
                        <BarChart className="w-8 h-8 mr-3 text-amber-500" />
                        Admin Dashboard
                    </h1>
                    <a href="/" className="px-4 py-2 bg-white border border-amber-500 text-amber-500 rounded-lg hover:bg-amber-50 transition-colors text-center font-medium">
                        Return to Home
                    </a>
                </div>

                <div className="bg-amber-50 border border-amber-100 rounded-lg p-3 mb-6 flex justify-between items-center">
                    <p className="text-xs text-amber-800 font-mono">Session ID: {userId}</p>
                    <span className="flex h-3 w-3 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    <StatCard
                        title="Total Leads"
                        value={leads.length}
                        icon={<Users />}
                        color="bg-white"
                    />
                    <StatCard
                        title="Live Stock (Chicks)"
                        value={totalChicks.toLocaleString("en-KE")}
                        icon={<Shield />}
                        color="bg-white"
                    />
                    <StatCard
                        title="System Status"
                        value="Active"
                        icon={<Phone />}
                        color="bg-white"
                    />
                </div>

                {/* Stock Editor Block */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-10 p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                        Live Stock Editor
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {products.map(product => {
                            const currentVal = editingStocks[product.id] !== undefined ? editingStocks[product.id] : (product.stock || 0);
                            return (
                                <div key={product.id} className="p-4 border border-gray-100 bg-gray-50 rounded-lg flex flex-col transition-all hover:bg-white hover:border-amber-200">
                                    <div className="font-semibold text-gray-900 mb-2 truncate" title={product.name}>{product.name} ({product.age || "Unknown Age"})</div>
                                    <div className="flex items-center mt-auto">
                                        <input
                                            type="number"
                                            className="border border-gray-300 rounded-lg p-2.5 text-sm w-full outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 mr-2 bg-white"
                                            value={currentVal}
                                            onChange={(e) => setEditingStocks({ ...editingStocks, [product.id]: parseInt(e.target.value) || 0 })}
                                        />
                                        <button
                                            onClick={() => handleStockUpdate(product.id, currentVal)}
                                            className="bg-gray-900 hover:bg-amber-500 text-white rounded-lg p-2.5 flex items-center shadow-sm transition-all flex-shrink-0"
                                            title="Save Stock"
                                        >
                                            <Save className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                        <h2 className="text-xl font-bold text-gray-900">
                            Recent Inquiries
                        </h2>
                        <span className="bg-amber-100 text-amber-700 text-xs font-bold px-3 py-1 rounded-full">
                            {leads.length} TOTAL
                        </span>
                    </div>

                    <div className="overflow-x-auto">
                        {sortedLeads.length === 0 ? (
                            <div className="p-10 text-center text-gray-400">No recent leads found.</div>
                        ) : (
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-white">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Time</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Contact</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Product/Qty</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-100">
                                    {sortedLeads.slice(0, 50).map((lead) => (
                                        <tr key={lead.id} className={`transition-colors ${lead.contacted ? 'bg-gray-50' : 'hover:bg-amber-50/30'}`}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                {lead.createdAt?.toDate ? (
                                                    <div className="flex flex-col">
                                                        <span className="font-medium text-gray-900">{lead.createdAt.toDate().toLocaleDateString('en-KE')}</span>
                                                        <span className="text-xs text-gray-500 mt-1">{lead.createdAt.toDate().toLocaleTimeString('en-KE', { hour: '2-digit', minute: '2-digit' })}</span>
                                                    </div>
                                                ) : "Processing..."}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                <div className="font-bold text-gray-900 text-base">{lead.name}</div>
                                                <div className="text-gray-500 mt-1">{lead.phone}</div>
                                                {lead.source && (
                                                    <span className="inline-block mt-2 px-2 py-0.5 text-[10px] font-bold tracking-wider bg-gray-100 text-gray-500 rounded uppercase">
                                                        {lead.source}
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                                <div className="font-medium px-2 py-1 bg-amber-100/50 text-amber-800 rounded inline-block">
                                                    {lead.productName}
                                                </div>
                                                <div className="mt-2 text-gray-600 font-medium">
                                                    Qty: <span className="bg-gray-100 px-2 py-0.5 rounded">{lead.quantity || "1"}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <button
                                                    onClick={() => toggleContacted(lead.id, lead.contacted)}
                                                    className={`px-3 py-1.5 text-xs font-bold rounded-full transition-all flex items-center shadow-sm border ${lead.contacted
                                                            ? 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100'
                                                            : 'bg-white text-amber-600 border-amber-200 hover:bg-amber-50'
                                                        }`}
                                                >
                                                    <CheckCircle className={`w-4 h-4 mr-1.5 ${lead.contacted ? 'text-green-500' : 'text-amber-400'}`} />
                                                    {lead.contacted ? 'Contacted' : 'Mark Contacted'}
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

const StatCard = ({ title, value, icon, color }: any) => (
    <div className={`p-6 rounded-2xl border border-gray-100 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] flex items-center justify-between transition-all hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] ${color}`}>
        <div>
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-1">{title}</p>
            <p className="text-4xl font-black text-gray-900 tracking-tight">{value}</p>
        </div>
        <div className="p-4 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 text-white shadow-lg shadow-amber-500/30">
            {React.cloneElement(icon, { className: "w-7 h-7" })}
        </div>
    </div>
);