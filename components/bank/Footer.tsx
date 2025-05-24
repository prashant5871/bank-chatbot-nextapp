import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Globe,
} from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-muted py-12 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">SecureBank</h3>
            <p className="text-sm text-muted-foreground">
              Your trusted financial partner for a secure future.
            </p>
            <div className="flex gap-4">
              <Button variant="ghost" size="icon" asChild>
                <Link href="#" aria-label="Facebook">
                  <Facebook className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href="#" aria-label="Twitter">
                  <Twitter className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href="#" aria-label="Instagram">
                  <Instagram className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href="#" aria-label="LinkedIn">
                  <Linkedin className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href="#" aria-label="YouTube">
                  <Youtube className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-4">Products</h4>
            <ul className="space-y-2">
              {["Checking", "Savings", "Credit Cards", "Loans", "Mortgages", "Investments"].map(
                (item) => (
                  <li key={item}>
                    <Button variant="link" className="p-0 h-auto text-muted-foreground" asChild>
                      <Link href="#">{item}</Link>
                    </Button>
                  </li>
                )
              )}
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-4">Resources</h4>
            <ul className="space-y-2">
              {["Help Center", "Security", "Financial Education", "Calculators", "Banking Guides", "Mobile App"].map(
                (item) => (
                  <li key={item}>
                    <Button variant="link" className="p-0 h-auto text-muted-foreground" asChild>
                      <Link href="#">{item}</Link>
                    </Button>
                  </li>
                )
              )}
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-4">Company</h4>
            <ul className="space-y-2">
              {["About Us", "Careers", "Press", "Sustainability", "Accessibility", "Terms", "Privacy"].map(
                (item) => (
                  <li key={item}>
                    <Button variant="link" className="p-0 h-auto text-muted-foreground" asChild>
                      <Link href="#">{item}</Link>
                    </Button>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © 2025 SecureBank. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="text-xs">
              <Globe className="h-3 w-3 mr-1" /> English
            </Button>
            <Button variant="ghost" size="sm" className="text-xs" asChild>
              <Link href="#">Locations</Link>
            </Button>
            <Button variant="ghost" size="sm" className="text-xs" asChild>
              <Link href="#">Accessibility</Link>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}