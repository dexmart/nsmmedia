import Layout from "@/components/layout/Layout";

const Terms = () => (
    <Layout>
        <div className="container py-8 md:py-12 max-w-3xl">
            <h1 className="font-display text-3xl md:text-4xl uppercase mb-6 text-foreground">
                Terms of <span className="text-primary">Service</span>
            </h1>
            <p className="text-xs text-muted-foreground mb-8">Last updated: February 2026</p>

            <div className="space-y-8">
                <section className="bg-card rounded-xl border border-border p-6">
                    <h2 className="font-display text-lg uppercase text-primary mb-3">1. Acceptance of Terms</h2>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        By accessing and using the NSM Media website, you accept and agree to be bound by these Terms of Service.
                        If you do not agree with any part of these terms, you must not use our website.
                    </p>
                </section>

                <section className="bg-card rounded-xl border border-border p-6">
                    <h2 className="font-display text-lg uppercase text-primary mb-3">2. Description of Service</h2>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        NSM Media provides sports news, live scores, transfer updates, league tables, and event coverage
                        focused on Nigerian, African, and international football. Content is sourced from third-party data providers
                        and our editorial team.
                    </p>
                </section>

                <section className="bg-card rounded-xl border border-border p-6">
                    <h2 className="font-display text-lg uppercase text-primary mb-3">3. Use of Content</h2>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• All content on NSM Media is provided for informational and entertainment purposes only</li>
                        <li>• You may not reproduce, distribute, or republish any content without prior written consent</li>
                        <li>• Live scores and statistics are provided on a best-effort basis and may experience delays</li>
                        <li>• News articles sourced from third parties are subject to their respective copyright terms</li>
                    </ul>
                </section>

                <section className="bg-card rounded-xl border border-border p-6">
                    <h2 className="font-display text-lg uppercase text-primary mb-3">4. Accuracy of Information</h2>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        While we strive to provide accurate and up-to-date sports information, NSM Media makes no warranties
                        regarding the accuracy, completeness, or reliability of any content. Live scores, match data, and transfer
                        news may be subject to delays or inaccuracies from our data providers.
                    </p>
                </section>

                <section className="bg-card rounded-xl border border-border p-6">
                    <h2 className="font-display text-lg uppercase text-primary mb-3">5. User Conduct</h2>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Do not use automated systems to scrape or extract data from our website</li>
                        <li>• Do not attempt to interfere with or disrupt the website's functionality</li>
                        <li>• Do not use the website for any unlawful or unauthorized purpose</li>
                        <li>• Do not impersonate NSM Media or its representatives</li>
                    </ul>
                </section>

                <section className="bg-card rounded-xl border border-border p-6">
                    <h2 className="font-display text-lg uppercase text-primary mb-3">6. Third-Party Links</h2>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        Our website may contain links to third-party websites or news sources. We are not responsible for the
                        content, privacy practices, or availability of these external sites.
                    </p>
                </section>

                <section className="bg-card rounded-xl border border-border p-6">
                    <h2 className="font-display text-lg uppercase text-primary mb-3">7. Limitation of Liability</h2>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        NSM Media shall not be liable for any indirect, incidental, or consequential damages arising from
                        your use of the website. This includes but is not limited to reliance on live scores, match predictions,
                        or transfer news for betting or other financial decisions.
                    </p>
                </section>

                <section className="bg-card rounded-xl border border-border p-6">
                    <h2 className="font-display text-lg uppercase text-primary mb-3">8. Modifications</h2>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately
                        upon posting. Your continued use of the website constitutes acceptance of the updated terms.
                    </p>
                </section>

                <section className="bg-card rounded-xl border border-border p-6">
                    <h2 className="font-display text-lg uppercase text-primary mb-3">9. Contact</h2>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        For questions about these Terms, contact us at{" "}
                        <a href="mailto:contact@nsmmedia.com" className="text-primary hover:underline">contact@nsmmedia.com</a>.
                    </p>
                </section>
            </div>
        </div>
    </Layout>
);

export default Terms;
