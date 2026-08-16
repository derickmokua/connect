"use client";

import React from "react";
import { ChatProvider } from "./context/ChatContext";
import { LazyMotion, domAnimation } from "framer-motion";

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <LazyMotion features={domAnimation}>
            <ChatProvider>{children}</ChatProvider>
        </LazyMotion>
    );
}
