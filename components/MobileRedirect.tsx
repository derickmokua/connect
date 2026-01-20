"use client";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function MobileRedirect() {
  const pathname = usePathname();
  const router = useRouter();
  useEffect(() => {
    const isMobile = typeof window !== "undefined" && /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (isMobile && pathname !== "/") {
      router.replace("/");
    }
  }, [pathname, router]);
  return null;
}
