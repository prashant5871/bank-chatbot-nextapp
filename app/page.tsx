"use client";

import {Footer} from "@/components/bank/Footer";
import {Header} from "@/components/bank/Header";
import {Hero} from "@/components/bank/Hero";
import {ChatInterface} from "@/components/chat/ChatInterface";
import { useEffect } from "react";

export default function Home() {
  // Import framer-motion dynamically to prevent SSR issues
  useEffect(() => {
    import("framer-motion");
  }, []);

  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex-1">
        
        <section className="pt-16">
          <Hero />
        </section>
      </div>
      
      <Footer />
      
      
      <ChatInterface />
    </main>
  );
}