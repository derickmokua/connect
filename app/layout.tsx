import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

import Providers from "@/components/Providers";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "KukuConnect",
  description: "Your Kuku Plug.",
};



import MobileRedirect from "@/components/MobileRedirect";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${outfit.variable} font-sans antialiased bg-[#FFFCF8] text-slate-800`}>
        <Providers>
          <MobileRedirect />
          {children}
        </Providers>
      </body>
    </html>
  );
}
