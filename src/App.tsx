import React from "react";
import { AmbientLights } from "./components/AmbientLights";
import { CustomCursor } from "./components/CustomCursor";
import { Nav } from "./components/Nav";
import { AgentsSection } from "./sections/AgentsSection";
import { CtaSection } from "./sections/CtaSection";
import { DistributionsSection } from "./sections/DistributionsSection";
import { Footer } from "./sections/Footer";
import { Hero } from "./sections/Hero";
import { ManifestoSection } from "./sections/ManifestoSection";
import { MemorySection } from "./sections/MemorySection";
import { TerminalSection } from "./sections/TerminalSection";
import { WorkflowSection } from "./sections/WorkflowSection";

const App: React.FC = () => (
  <div id="top" className="relative">
    <CustomCursor />
    <AmbientLights />

    <div className="relative z-10">
      <Nav />
      <Hero />
      <ManifestoSection />
      <WorkflowSection />
      <AgentsSection />
      <DistributionsSection />
      <TerminalSection />
      <MemorySection />
      <CtaSection />
      <Footer />
    </div>
  </div>
);

export default App;
