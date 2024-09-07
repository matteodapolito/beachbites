"use client";
import { FAQ } from "./components/FAQ";
import { Hero } from "./components/Hero";
import { HowItWorks } from "./components/HowItWorks";
import { Navbar } from "./components/Navbar";
import { Pricing } from "./components/Pricing";
import { Services } from "./components/Services";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <HowItWorks />
      <Services />
      <Pricing />
      <FAQ />
    </>
  );
}
