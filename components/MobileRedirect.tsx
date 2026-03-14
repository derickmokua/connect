"use client";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function MobileRedirect() {
  const pathname = usePathname();
  const router = useRouter();
  useEffect(() => {
    const isMobile = typeof window !== "undefined" && /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (isMobile) {
      if (pathname !== "/") {
        router.replace("/");
      }
      if (window.location.hash) {
        history.replaceState(null, '', window.location.pathname + window.location.search);
      }
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, [pathname, router]);
  return null;
}
