import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

type NavLink = { to: string; label: string };
type NavDropdown = { label: string; children: NavLink[] };
type NavItem = NavLink | NavDropdown;

function isDropdown(item: NavItem): item is NavDropdown {
  return "children" in item;
}

const navItems: NavItem[] = [
  { to: "/", label: "Home" },
  {
    label: "What's on",
    children: [
      { to: "/services-and-events", label: "Services & Events" },
      { to: "/news", label: "News" },
    ],
  },
  {
    label: "About",
    children: [
      { to: "/about", label: "About" },
      { to: "/church-centre", label: "Church Centre" },
      { to: "/environment", label: "Environment" },
    ],
  },
  { to: "/visit-and-contact", label: "Visit & Contact" },
  { to: "/give", label: "Give" },
  { to: "/resources", label: "Resources" },
];

function pathMatchesDropdown(path: string, item: NavDropdown): boolean {
  return item.children.some((c) => c.to === path || (c.to !== "/" && path.startsWith(c.to + "/")));
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const location = useLocation();

  const closeAll = () => {
    setOpen(false);
    setOpenSubmenu(null);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/98 backdrop-blur-md supports-[backdrop-filter]:bg-background/98">
      <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="font-display text-lg font-semibold tracking-tight text-foreground hover:text-primary transition-colors shrink-0"
        >
          St. Anne's Church, Chingford
        </Link>

        <nav className="hidden md:flex md:items-center md:gap-1">
          {navItems.map((item) => {
            if (isDropdown(item)) {
              const active = pathMatchesDropdown(location.pathname, item);
              return (
                <div
                  key={item.label}
                  className="relative group"
                >
                  <button
                    type="button"
                    className={cn(
                      "flex items-center gap-0.5 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                      active ? "bg-accent text-accent-foreground" : "text-foreground/90"
                    )}
                    aria-expanded={false}
                    aria-haspopup="true"
                    aria-controls={`nav-dropdown-${item.label.replace(/\s+/g, "-")}`}
                    id={`nav-trigger-${item.label.replace(/\s+/g, "-")}`}
                  >
                    {item.label}
                    <ChevronDown className="h-4 w-4 shrink-0 opacity-70" aria-hidden />
                  </button>
                  <div
                    id={`nav-dropdown-${item.label.replace(/\s+/g, "-")}`}
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby={`nav-trigger-${item.label.replace(/\s+/g, "-")}`}
                    className="invisible absolute left-0 top-full z-50 mt-0 min-w-[180px] rounded-lg border border-border/60 bg-background py-1 pt-2 -mt-1 shadow-lg opacity-0 transition-[opacity,visibility] duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100"
                  >
                    {item.children.map((child) => (
                      <Link
                        key={child.to}
                        to={child.to}
                        role="menuitem"
                        className={cn(
                          "block px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                          location.pathname === child.to ? "bg-accent/50 text-accent-foreground" : "text-foreground/90"
                        )}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            }
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                  location.pathname === item.to
                    ? "bg-accent text-accent-foreground"
                    : "text-foreground/90"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:flex md:items-center md:gap-2 shrink-0">
          <Link to="/services-and-events">
            <Button variant="default" size="sm" className="font-semibold">
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
          <nav className="container mx-auto flex flex-col gap-2 px-4 py-4">
            {navItems.map((item) => {
              if (isDropdown(item)) {
                const key = item.label.replace(/\s+/g, "-");
                const expanded = openSubmenu === key;
                return (
                  <div key={item.label}>
                    <button
                      type="button"
                      onClick={() => setOpenSubmenu(expanded ? null : key)}
                      className={cn(
                        "flex w-full min-h-[44px] items-center justify-between rounded-lg px-3 py-3 text-left text-sm font-medium transition-colors hover:bg-accent",
                        pathMatchesDropdown(location.pathname, item) ? "bg-accent" : ""
                      )}
                      aria-expanded={expanded}
                      aria-controls={`mobile-submenu-${key}`}
                    >
                      {item.label}
                      <ChevronRight
                        className={cn("h-4 w-4 shrink-0 transition-transform", expanded && "rotate-90")}
                        aria-hidden
                      />
                    </button>
                    <div
                      id={`mobile-submenu-${key}`}
                      role="region"
                      aria-hidden={!expanded}
                      className={cn("overflow-hidden transition-all", expanded ? "max-h-64 opacity-100" : "max-h-0 opacity-0")}
                    >
                      <div className="flex flex-col gap-0.5 pl-4 pb-2">
                        {item.children.map((child) => (
                          <Link
                            key={child.to}
                            to={child.to}
                            onClick={closeAll}
                            className={cn(
                              "rounded-lg px-3 py-3 min-h-[44px] flex items-center text-sm font-medium transition-colors hover:bg-accent md:py-2.5 md:min-h-0",
                              location.pathname === child.to ? "bg-accent" : "text-foreground/90"
                            )}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={closeAll}
                  className={cn(
                    "flex min-h-[44px] items-center rounded-lg px-3 py-3 text-sm font-medium transition-colors hover:bg-accent",
                    location.pathname === item.to ? "bg-accent" : ""
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link to="/services-and-events" onClick={closeAll} className="mt-2">
              <Button variant="default" size="lg" className="w-full font-semibold">
                Start here
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
