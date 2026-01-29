import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/services-and-events", label: "Services & Events" },
  { to: "/news", label: "News" },
  { to: "/give", label: "Give" },
  { to: "/church-centre", label: "Church Centre" },
  { to: "/environment", label: "Environment" },
  { to: "/about", label: "About" },
  { to: "/visit-and-contact", label: "Visit & Contact" },
  { to: "/resources", label: "Resources" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background backdrop-blur-md supports-[backdrop-filter]:bg-background/95">
      <div className="container mx-auto flex h-16 items-center justify-between gap-4 px-4">
        <Link
          to="/"
          className="font-display text-lg font-semibold tracking-tight text-foreground hover:text-primary transition-colors shrink-0"
        >
          St. Anne's Church, Chingford
        </Link>

        <nav className="hidden md:flex md:items-center md:gap-1">
          {navItems.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={cn(
                "rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                location.pathname === to
                  ? "bg-accent text-accent-foreground"
                  : "text-foreground/90"
              )}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex md:items-center md:gap-2 shrink-0">
          <Link to="/visit-and-contact">
            <Button variant="warm" size="sm" className="font-semibold">
              Start here
            </Button>
          </Link>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="md:hidden shrink-0"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {open && (
        <div className="border-t border-border/40 bg-background md:hidden">
          <nav className="container mx-auto flex flex-col gap-1 px-4 py-4">
            {navItems.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setOpen(false)}
              className={cn(
                "rounded-lg px-3 py-3 text-sm font-medium transition-colors hover:bg-accent",
                location.pathname === to ? "bg-accent" : ""
              )}
            >
              {label}
            </Link>
            ))}
            <Link to="/visit-and-contact" onClick={() => setOpen(false)} className="mt-2">
              <Button variant="warm" className="w-full font-semibold">Start here</Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
