import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { label: "News", to: "/" },
  { label: "Live Scores", to: "/live" },
  { label: "Transfers", to: "/transfers" },
  { label: "Tables", to: "/tables" },
];

const subNavLinks = [
  { label: "About Us", to: "/about" },
  { label: "Nigeria Events", to: "/nigeria" },
  { label: "Africa Events", to: "/africa" },
  { label: "International", to: "/international" },
];

const Header = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50">
      {/* Announcement Bar */}
      <div className="bg-primary text-primary-foreground text-center py-1.5 text-[11px] font-semibold tracking-wide uppercase">
        🏆 Your #1 Source for Nigerian & African Sports — Live Scores, Transfers & Breaking News
      </div>

      {/* Main nav */}
      <div className="bg-header text-header-foreground">
        <div className="container flex items-center justify-between h-[72px]">
          <Link to="/" className="flex items-center">
            <img src="/Logonsm.png" alt="NSM Media" className="h-[14rem] w-auto" />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-3 py-2 text-sm font-semibold rounded-md transition-colors ${location.pathname === link.to
                  ? "bg-primary/15 text-primary"
                  : "text-header-foreground/70 hover:text-header-foreground hover:bg-header-foreground/5"
                  }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile menu toggle only */}
          <button
            className="p-2 rounded-md text-header-foreground/70 hover:text-header-foreground md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden border-t border-header-foreground/10 pb-3 px-4 animate-slide-up">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2.5 text-sm font-semibold rounded-md ${location.pathname === link.to ? "text-primary" : "text-header-foreground/70"
                  }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="border-t border-header-foreground/10 mt-2 pt-2">
              {subNavLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-3 py-2.5 text-sm font-semibold rounded-md ${location.pathname === link.to ? "text-primary" : "text-header-foreground/70"
                    }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </div>

      {/* Sub-nav */}
      <div className="bg-header border-t border-header-foreground/10">
        <div className="container">
          <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide py-2">
            {subNavLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-3 py-1.5 text-xs font-semibold rounded-full whitespace-nowrap transition-colors ${location.pathname === link.to
                    ? "bg-primary text-primary-foreground"
                    : "text-header-foreground/50 hover:text-header-foreground/80 hover:bg-header-foreground/5"
                  }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
