"use client";

import SmoothScroll, { useRevealOnScroll } from "@/components/Motion";
import { ContactProvider } from "@/components/ContactModal";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TrustStrip from "@/components/TrustStrip";
import Stages from "@/components/Stages";
import WhatWeBuild from "@/components/WhatWeBuild";
import HowWeWork from "@/components/HowWeWork";
import Projects from "@/components/Projects";
import Details from "@/components/Details";
import Reviews from "@/components/Reviews";
import MapSection from "@/components/MapSection";
import ContactCta from "@/components/ContactCta";
import Footer from "@/components/Footer";

export default function Home() {
  useRevealOnScroll();

  return (
    <ContactProvider>
      <SmoothScroll />
      <Header />
      <main>
        <Hero />
        <TrustStrip />
        <Stages />
        <WhatWeBuild />
        <HowWeWork />
        <Projects />
        <Details />
        <Reviews />
        <MapSection />
        <ContactCta />
      </main>
      <Footer />
    </ContactProvider>
  );
}
