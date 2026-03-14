"use client";

import React from "react";
import { CartProvider } from "./context/CartContext";
import { ChatProvider } from "./context/ChatContext";
import CartDrawer from "./CartDrawer";
import { Toaster } from "react-hot-toast"; // Proactive: In case we need it, but actually I'll stick to just Cart for now.
import { LazyMotion, domAnimation } from "framer-motion";

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <LazyMotion features={domAnimation}>
            <ChatProvider>
                <CartProvider>
                    {children}
                    <CartDrawer />
                </CartProvider>
            </ChatProvider>
        </LazyMotion>
    );
}
