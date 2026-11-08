"use client";

import { useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import Navbar from "./Navbar";

export default function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();

  const navigate = useCallback(
    (path, section = null) => {
      if (pathname !== path) router.push(path);
      if (section) {
        window.setTimeout(
          () =>
            document
              .getElementById(section)
              ?.scrollIntoView({ behavior: "auto" }),
          80,
        );
      } else {
        window.scrollTo({ top: 0, behavior: "auto" });
      }
    },
    [pathname, router],
  );

  return <Navbar pathname={pathname} onNavigate={navigate} />;
}
