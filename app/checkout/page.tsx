"use client";

import { useEffect } from "react";

const ORDER_APP_URL =
    process.env.NEXT_PUBLIC_ORDER_URL || "https://app.kukuconnect.co.ke/order";

/**
 * Checkout removed from the marketing site.
 * All orders go through the FMS public form.
 */
export default function CheckoutRedirectPage() {
    useEffect(() => {
        window.location.replace(ORDER_APP_URL);
    }, []);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-4 bg-[#FAFAFA] text-center">
            <p className="text-lg font-bold text-[#0F172A]">Taking you to the order form…</p>
            <a
                href={ORDER_APP_URL}
                className="text-[#C2410C] font-semibold underline underline-offset-2"
            >
                Order chicks on app.kukuconnect.co.ke
            </a>
        </div>
    );
}
