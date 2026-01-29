import { Link } from "react-router-dom";
import { Facebook, Instagram, Youtube } from "lucide-react";

const footerLinks = [
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

const socialLinks = [
  { href: "https://www.facebook.com", label: "Facebook", icon: Facebook },
  { href: "https://www.instagram.com", label: "Instagram", icon: Instagram },
  { href: "https://www.youtube.com", label: "YouTube", icon: Youtube },
];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          <div className="lg:col-span-1">
            <p className="font-display text-base font-semibold text-foreground">
              St. Anne's Church, Chingford
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Attend St. Anne's Online or at 200a Larkshall Road, Chingford E4 6NP.
            </p>
            <p className="mt-4 text-xs text-muted-foreground">
              <Link to="/resources" className="text-link hover:underline">
                Privacy Policy
              </Link>
              {" · "}
              <Link to="/resources" className="text-link hover:underline">
                Terms of Use
              </Link>
              {" · "}
              <Link to="/resources" className="text-link hover:underline">
                Cookie Preferences
              </Link>
            </p>
            <p className="mt-2 text-xs text-muted-foreground">
              © {new Date().getFullYear()} St. Anne's Church, Chingford. All rights reserved.
            </p>
          </div>
          <nav className="flex flex-wrap gap-x-6 gap-y-2 lg:col-span-2 lg:justify-center">
            {footerLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className="text-sm font-medium text-link hover:underline"
              >
                {label}
              </Link>
            ))}
          </nav>
          <div className="flex items-start justify-start gap-3 lg:justify-end">
            {socialLinks.map(({ href, label, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-foreground text-background transition-opacity hover:opacity-90"
                aria-label={label}
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
        <div className="mt-10 border-t border-border pt-8">
          <p className="text-xs text-muted-foreground">
            We are committed to Safeguarding Children, Young People, Vulnerable
            Adults, and Victims of Domestic Abuse.{" "}
            <Link to="/resources" className="text-link hover:underline">
              Parish Safeguarding Policy
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
