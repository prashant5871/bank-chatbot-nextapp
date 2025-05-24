"use client";

import Image from "next/image";
import { ChatButton } from "@/components/chat/ChatButton";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight,
  Lock, 
  Shield, 
  TrendingUp 
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { toast } from "sonner";

export function Hero() {
  const handleLoginClick = () => {
    toast("Login functionality", {
      description: "This is a demo - no actual login functionality is implemented",
    });
  };

  return (
    <div className="relative overflow-hidden">
      <div 
        className="absolute inset-0 z-0 bg-gradient-to-b from-primary/5 to-background"
        aria-hidden="true"
      />
      
      <div className="container relative z-10 mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <Badge variant="outline" className="px-3 py-1 border-primary/20 text-primary/80">
              Banking for the digital age
            </Badge>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Banking that puts <span className="text-primary">you first</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground">
              Secure, simple, and smart banking solutions designed around your needs, not ours.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-2">
              <Button size="lg" className="gap-2 group">
                Open an Account
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              
              <ChatButton 
                variant="outline" 
                className="border-primary/20 hover:bg-primary/5"
              />
            </div>
            
            <div className="flex flex-wrap gap-6 pt-4">
              <div className="flex items-center gap-2">
                <Lock className="h-5 w-5 text-primary/70" />
                <span className="text-sm font-medium">Secure Banking</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary/70" />
                <span className="text-sm font-medium">FDIC Insured</span>
              </div>
              
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary/70" />
                <span className="text-sm font-medium">High-Yield Accounts</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-[4/3] relative rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="https://images.pexels.com/photos/6347729/pexels-photo-6347729.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Banking app on smartphone"
                fill
                className="object-cover"
                priority
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
              
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="bg-card/80 backdrop-blur-sm p-4 rounded-lg border shadow-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium">Your Finances, Simplified</h3>
                    <Button size="sm" variant="ghost" onClick={handleLoginClick}>Login</Button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Take control with our intuitive mobile and online banking
                  </p>
                </div>
              </div>
            </div>
            
            <div className="absolute -right-12 -bottom-12 w-24 h-24 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute -left-12 -top-12 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
          </motion.div>
        </div>
      </div>
    </div>
  );
}