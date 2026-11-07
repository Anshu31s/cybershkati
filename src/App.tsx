"use client";

import React, { useCallback, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { MotionConfig } from "motion/react";
import { RegistrationProvider } from "./context/RegistrationContext";
import WinterInternshipPage from "./views/WinterInternshipPage";
import SummerInternshipPage from "./views/SummerInternshipPage";
import ProgramsHomePage from "./views/ProgramsHomePage";
import RegistrationPage from "./views/RegistrationPage";
import AdminPage from "./views/AdminPage";
import AboutPage from "./components/AboutPage";
import ContactPage from "./components/ContactPage";
import ScrollReveal from "./components/ScrollReveal";
import {
  SUMMER_INTERNSHIP_PATH,
  WINTER_INTERNSHIP_PATH,
  REGISTER_PATH,
} from "./routes";

export default function App({ page = "home" }) {
  const pathname = usePathname();
  const router = useRouter();
  const isWinterPage = page === "winter";
  const isSummerPage = page === "summer";
  const isRegisterPage = page === "register";
  const isAdminPage = page === "admin";
  const isAboutPage = page === "about";
  const isContactPage = page === "contact";
  const isHomePage = page === "home";

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

  const openRegistrationPage = useCallback(
    () => navigate(REGISTER_PATH),
    [navigate],
  );
  const footerAction = isWinterPage
    ? openRegistrationPage
    : isSummerPage
      ? () => navigate(WINTER_INTERNSHIP_PATH)
      : null;

  useEffect(() => {
    if (window.location.hash) {
      const section = window.location.hash.slice(1);
      window.setTimeout(
        () =>
          document
            .getElementById(section)
            ?.scrollIntoView({ behavior: "auto" }),
        100,
      );
    }
  }, []);

  return (
    <RegistrationProvider>
      <MotionConfig reducedMotion="user">
        <div
          className={`${isHomePage || isRegisterPage || isWinterPage || isAboutPage || isContactPage ? "premium-dark bg-[#040711]" : "premium-light bg-[#f8fafc]"} ${isHomePage || isWinterPage ? "" : ""} relative flex min-h-screen flex-col text-slate-100 selection:bg-cyan-500 selection:text-black `}
        >
          {!isAdminPage && <Navbar pathname={pathname} onNavigate={navigate} />}
          {isAdminPage ? (
            <AdminPage />
          ) : isRegisterPage ? (
            <RegistrationPage onNavigate={navigate} />
          ) : isAboutPage ? (
            <AboutPage
              onOpenRegister={openRegistrationPage}
              onNavigate={(path, section) =>
                navigate(path === "home" ? "/" : path, section)
              }
            />
          ) : isContactPage ? (
            <ContactPage />
          ) : isSummerPage ? (
            <SummerInternshipPage onBackHome={() => navigate("/")} />
          ) : isWinterPage ? (
            <WinterInternshipPage onOpenRegister={openRegistrationPage} />
          ) : (
            <ProgramsHomePage
              onNavigate={navigate}
              onOpenRegister={openRegistrationPage}
            />
          )}
          {!isAdminPage && (
            <ScrollReveal>
              <Footer
                onOpenRegister={isRegisterPage ? null : footerAction}
                actionLabel={isSummerPage ? "Explore Winter Internship" : null}
                programContext={
                  isWinterPage ? "winter" : isSummerPage ? "summer" : "general"
                }
              />
            </ScrollReveal>
          )}
        </div>
      </MotionConfig>
    </RegistrationProvider>
  );
}
