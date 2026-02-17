import { Link } from "react-router-dom";

const Footer = () => (
    <footer className="bg-header text-header-foreground border-t border-border mt-12">
        <div className="container py-10">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Brand */}
                <div className="md:col-span-1">
                    <Link to="/" className="flex items-center gap-2 mb-3">
                        <img src="/Logonsm.png" alt="NSM Media" className="h-40 w-auto" />
                    </Link>
                    <p className="text-xs text-header-foreground/60 leading-relaxed">
                        Your #1 source for Nigerian, African, and international sports news. Live scores, transfer updates, and breaking football coverage.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h4 className="font-display text-sm uppercase tracking-wider mb-3 text-primary">Quick Links</h4>
                    <ul className="space-y-2">
                        {[
                            { label: "Live Scores", to: "/live" },
                            { label: "Transfers", to: "/transfers" },
                            { label: "Tables", to: "/tables" },
                            { label: "About Us", to: "/about" },
                        ].map((link) => (
                            <li key={link.to}>
                                <Link to={link.to} className="text-xs text-header-foreground/60 hover:text-primary transition-colors">
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Categories */}
                <div>
                    <h4 className="font-display text-sm uppercase tracking-wider mb-3 text-primary">Categories</h4>
                    <ul className="space-y-2">
                        {[
                            { label: "Nigeria Events", to: "/nigeria" },
                            { label: "Africa Events", to: "/africa" },
                            { label: "International", to: "/international" },
                            { label: "World Cup", to: "/" },
                        ].map((link) => (
                            <li key={link.label}>
                                <Link to={link.to} className="text-xs text-header-foreground/60 hover:text-primary transition-colors">
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h4 className="font-display text-sm uppercase tracking-wider mb-3 text-primary">Connect</h4>
                    <ul className="space-y-2">
                        <li>
                            <a href="mailto:contact@nsmmedia.com" className="text-xs text-header-foreground/60 hover:text-primary transition-colors">
                                contact@nsmmedia.com
                            </a>
                        </li>
                        <li>
                            <a href="#" className="text-xs text-header-foreground/60 hover:text-primary transition-colors">Twitter / X</a>
                        </li>
                        <li>
                            <a href="#" className="text-xs text-header-foreground/60 hover:text-primary transition-colors">Instagram</a>
                        </li>
                        <li>
                            <a href="#" className="text-xs text-header-foreground/60 hover:text-primary transition-colors">Facebook</a>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-header-foreground/10 mt-8 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
                <p className="text-[11px] text-header-foreground/40">
                    &copy; {new Date().getFullYear()} NSM Media. All rights reserved.
                </p>
                <p className="text-[11px] text-header-foreground/40">
                    Developed by{" "}
                    <a href="https://234mart.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">234mart.com</a>
                    {" "}&amp;{" "}
                    <a href="https://techtomister.ca" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">techtomister.ca</a>
                </p>
                <div className="flex items-center gap-4">
                    <Link to="/privacy" className="text-[11px] text-header-foreground/40 hover:text-primary transition-colors">Privacy Policy</Link>
                    <Link to="/terms" className="text-[11px] text-header-foreground/40 hover:text-primary transition-colors">Terms of Service</Link>
                </div>
            </div>
        </div>
    </footer>
);

export default Footer;
