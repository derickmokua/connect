"use client";

import React from "react";
import { CartProvider } from "./context/CartContext";
import { ChatProvider } from "./context/ChatContext";
import CartDrawer from "./CartDrawer";
import { Toaster } from "react-hot-toast"; // Proactive: In case we need it, but actually I'll stick to just Cart for now.

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ChatProvider>
            <CartProvider>
                {children}
                <CartDrawer />
            </CartProvider>
        </ChatProvider>
    );
}
