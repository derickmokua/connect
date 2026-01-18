"use client";

import React, { useState, useEffect } from "react";
import { onAuthStateChanged, signInAnonymously } from "firebase/auth";
import { collection, query, onSnapshot } from "firebase/firestore";
import { Users, Shield, Phone, BarChart } from "lucide-react";
import { auth, db, appId } from "@/lib/firebase";

const getPublicCollectionPath = (collectionName: string) =>
    `/artifacts/${appId}/public/data/${collectionName}`;
const getLeadsCollectionPath = () =>
    `/artifacts/${appId}/public/data/leads`;

export default function AdminDashboard() {
    const [isAuthReady, setIsAuthReady] = useState(false);
    const [userId, setUserId] = useState<string | null>(null);
    const [leads, setLeads] = useState<any[]>([]);
    const [products, setProducts] = useState<any[]>([]);

    // 🔐 AUTH
    useEffect(() => {
        const firebaseAuth = auth; // fully typed Auth

        const unsubscribe = onAuthStateChanged(firebaseAuth, async (user) => {
            if (user) {
                setUserId(user.uid);
            } else {
                try {
                    await signInAnonymously(firebaseAuth);
                } catch (error) {
                    console.error("Authentication failed:", error);
                }
            }
            setIsAuthReady(true);
        });

        return () => unsubscribe();
    }, []);

    // 📊 DATA
    useEffect(() => {
        if (!isAuthReady) return;

        const leadsQuery = query(collection(db, getLeadsCollectionPath()));
        const unsubscribeLeads = onSnapshot(leadsQuery, (snapshot) => {
            const fetchedLeads = snapshot.docs.map((d) => ({
                id: d.id,
                ...d.data(),
            })) as any[];
            setLeads(
                fetchedLeads.sort(
                    (a, b) =>
                        b.createdAt?.toDate()?.getTime() -
                        a.createdAt?.toDate()?.getTime()
                )
            );
        });

        const productsQuery = query(
            collection(db, getPublicCollectionPath("products"))
        );
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

    if (!isAuthReady) {
        return (
            <div className="text-center p-12 text-gray-500">
                Loading authentication status...
            </div>
        );
    }

    if (!userId) {
        return (
            <div className="text-center p-12 text-red-600 font-bold">
                Access Denied. Authentication required.
            </div>
        );
    }

    const totalChicks = products.reduce(
        (acc, p) => (p.age !== "Full-grown" ? acc + (p.stock || 0) : acc),
        0
    );

    return (
        <section className="py-20 px-4 bg-white min-h-screen">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-extrabold flex items-center mb-8">
                    <BarChart className="w-8 h-8 mr-3 text-amber-500" />
                    Admin Dashboard
                </h1>

                <p className="text-sm text-gray-500 mb-6">User ID: {userId}</p>

                {/* ✅ FIXED TAILWIND */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    <StatCard title="Total Leads" value={leads.length} icon={<Users />} />
                    <StatCard
                        title="Live Stock (Chicks)"
                        value={totalChicks.toLocaleString("en-KE")}
                        icon={<Shield />}
                    />
                    <StatCard title="WhatsApp / Call" value="Active" icon={<Phone />} />
                </div>
            </div>
        </section>
    );
}

const StatCard = ({ title, value, icon }: any) => (
    <div className="p-6 rounded-2xl shadow-lg flex items-center justify-between bg-amber-100">
        <div>
            <p className="text-sm text-gray-600">{title}</p>
            <p className="text-3xl font-bold">{value}</p>
        </div>
        <div className="p-3 rounded-full bg-amber-500 text-white">
            {React.cloneElement(icon, { className: "w-6 h-6" })}
        </div>
    </div>
);
