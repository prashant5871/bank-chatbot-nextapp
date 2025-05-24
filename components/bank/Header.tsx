"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Menu, X, Landmark } from "lucide-react";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { toast } from "sonner";

interface NavLinkProps {
  href: string;
  label: string;
  isMobile?: boolean;
}

function NavLink({ href, label, isMobile = false }: NavLinkProps) {
  return (
    <Button
      variant="ghost"
      size={isMobile ? "default" : "sm"}
      className={cn(
        "transition-colors",
        isMobile && "w-full justify-start px-2"
      )}
      asChild
    >
      <Link href={href}>{label}</Link>
    </Button>
  );
}

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Track scroll position to change header styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  const handleLogin = () => {
    toast("Login functionality", {
      description: "This is a demo - no actual login functionality is implemented",
    });
  };
  
  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled 
          ? "bg-background/80 backdrop-blur-md border-b shadow-sm" 
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        {/* Logo */}
        <Link 
          href="/" 
          className="flex items-center gap-2 font-semibold text-lg"
        >
          <Landmark className="h-5 w-5" />
          <span>SecureBank</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          <NavLink href="#" label="Personal" />
          <NavLink href="#" label="Business" />
          <NavLink href="#" label="Investments" />
          <NavLink href="#" label="Mortgages" />
          <NavLink href="#" label="About Us" />
          <NavLink href="#" label="Help" />
        </nav>
        
        {/* Right side actions */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          
          <Button 
            variant="outline" 
            size="sm" 
            className="hidden md:inline-flex"
            onClick={handleLogin}
          >
            Log In
          </Button>
          
          <Button 
            className="hidden md:inline-flex"
            onClick={handleLogin}
          >
            Open Account
          </Button>
          
          {/* Mobile menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col gap-6 h-full">
                <div className="flex items-center justify-between">
                  <Link 
                    href="/" 
                    className="flex items-center gap-2 font-semibold"
                  >
                    <Landmark className="h-5 w-5" />
                    <span>SecureBank</span>
                  </Link>
                </div>
                
                <nav className="flex flex-col gap-1">
                  <NavLink href="#" label="Personal" isMobile />
                  <NavLink href="#" label="Business" isMobile />
                  <NavLink href="#" label="Investments" isMobile />
                  <NavLink href="#" label="Mortgages" isMobile />
                  <NavLink href="#" label="About Us" isMobile />
                  <NavLink href="#" label="Help" isMobile />
                </nav>
                
                <div className="flex flex-col gap-2 mt-auto">
                  <Button variant="outline" onClick={handleLogin}>
                    Log In
                  </Button>
                  <Button onClick={handleLogin}>
                    Open Account
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}