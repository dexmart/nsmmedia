import Layout from "@/components/layout/Layout";

const Privacy = () => (
    <Layout>
        <div className="container py-8 md:py-12 max-w-3xl">
            <h1 className="font-display text-3xl md:text-4xl uppercase mb-6 text-foreground">
                Privacy <span className="text-primary">Policy</span>
            </h1>
            <p className="text-xs text-muted-foreground mb-8">Last updated: February 2026</p>

            <div className="space-y-8">
                <section className="bg-card rounded-xl border border-border p-6">
                    <h2 className="font-display text-lg uppercase text-primary mb-3">1. Introduction</h2>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        NSM Media ("we", "us", or "our") operates the NSM Media website. This Privacy Policy explains how we collect,
                        use, disclose, and safeguard your information when you visit our website. Please read this policy carefully.
                        By accessing or using the site, you agree to this Privacy Policy.
                    </p>
                </section>

                <section className="bg-card rounded-xl border border-border p-6">
                    <h2 className="font-display text-lg uppercase text-primary mb-3">2. Information We Collect</h2>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                        <li><strong className="text-foreground">Usage Data:</strong> We automatically collect information about how you access and use the website, including your IP address, browser type, pages visited, and time spent on pages.</li>
                        <li><strong className="text-foreground">Cookies:</strong> We use cookies and similar tracking technologies to enhance your browsing experience and analyze site traffic.</li>
                        <li><strong className="text-foreground">Third-Party Data:</strong> We integrate third-party services (news APIs, sports data providers) that may collect their own data subject to their respective privacy policies.</li>
                    </ul>
                </section>

                <section className="bg-card rounded-xl border border-border p-6">
                    <h2 className="font-display text-lg uppercase text-primary mb-3">3. How We Use Your Information</h2>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• To provide and maintain our sports news and live scores service</li>
                        <li>• To improve, personalize, and expand our website</li>
                        <li>• To understand and analyze usage trends and preferences</li>
                        <li>• To detect, prevent, and address technical issues</li>
                        <li>• To comply with legal obligations</li>
                    </ul>
                </section>

                <section className="bg-card rounded-xl border border-border p-6">
                    <h2 className="font-display text-lg uppercase text-primary mb-3">4. Data Sharing & Third Parties</h2>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        We do not sell your personal information. We may share anonymized, aggregated data with analytics partners.
                        Our website integrates content from third-party sports data and news providers whose own privacy policies govern
                        their data practices.
                    </p>
                </section>

                <section className="bg-card rounded-xl border border-border p-6">
                    <h2 className="font-display text-lg uppercase text-primary mb-3">5. Data Security</h2>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        We implement reasonable security measures to protect your information. However, no method of transmission over
                        the Internet is 100% secure, and we cannot guarantee absolute security.
                    </p>
                </section>

                <section className="bg-card rounded-xl border border-border p-6">
                    <h2 className="font-display text-lg uppercase text-primary mb-3">6. Your Rights</h2>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        You may request access to, correction of, or deletion of your personal data by contacting us at
                        contact@nsmmedia.com. You can disable cookies through your browser settings at any time.
                    </p>
                </section>

                <section className="bg-card rounded-xl border border-border p-6">
                    <h2 className="font-display text-lg uppercase text-primary mb-3">7. Contact Us</h2>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        If you have any questions about this Privacy Policy, please contact us at{" "}
                        <a href="mailto:contact@nsmmedia.com" className="text-primary hover:underline">contact@nsmmedia.com</a>.
                    </p>
                </section>
            </div>
        </div>
    </Layout>
);

export default Privacy;
