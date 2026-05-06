import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { Story } from "@/components/site/Story";
import { Location } from "@/components/site/Location";
import { Amenities } from "@/components/site/Amenities";
import { Nature } from "@/components/site/Nature";
import { MasterPlan } from "@/components/site/MasterPlan";
import { Pricing } from "@/components/site/Pricing";
import { Developer } from "@/components/site/Developer";
import { FAQ } from "@/components/site/FAQ";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";
import { FloatingActions } from "@/components/site/FloatingActions";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-emerald-black text-mist">
      <Navbar />
      <main>
        <Hero />
        <Story />
        <Location />
        <Amenities />
        <Nature />
        <MasterPlan />
        <Pricing />
        <Developer />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <FloatingActions />
    </div>
  );
}
