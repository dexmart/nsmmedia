import Layout from "@/components/layout/Layout";

const About = () => (
    <Layout>
        <div className="container py-8 md:py-12">
            <h1 className="font-display text-3xl md:text-4xl uppercase mb-6 text-foreground">
                About <span className="text-primary">NSM Media</span>
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    {/* Mission */}
                    <section className="bg-card rounded-xl border border-border p-6">
                        <h2 className="font-display text-xl uppercase text-primary mb-3">Our Mission</h2>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            NSM Media is Nigeria's premier sports media platform, dedicated to delivering real-time sports coverage
                            that connects fans across Nigeria, Africa, and the world. We provide live scores, transfer updates,
                            match analysis, and breaking news from the most exciting leagues and competitions globally.
                        </p>
                    </section>

                    {/* What We Cover */}
                    <section className="bg-card rounded-xl border border-border p-6">
                        <h2 className="font-display text-xl uppercase text-primary mb-3">What We Cover</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {[
                                { title: "Nigerian Football", desc: "NPFL, NNL, Super Eagles, and all domestic competitions." },
                                { title: "African Football", desc: "CAF Champions League, AFCON, and continental events." },
                                { title: "International Leagues", desc: "Premier League, La Liga, Champions League, and more." },
                                { title: "World Cup", desc: "Comprehensive coverage of FIFA World Cup qualifiers and tournaments." },
                            ].map((item) => (
                                <div key={item.title} className="bg-muted/30 rounded-lg p-4">
                                    <h3 className="text-sm font-bold text-foreground mb-1">{item.title}</h3>
                                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Why NSM Media */}
                    <section className="bg-card rounded-xl border border-border p-6">
                        <h2 className="font-display text-xl uppercase text-primary mb-3">Why NSM Media?</h2>
                        <ul className="space-y-3">
                            {[
                                "⚡ Real-time live scores from major leagues worldwide",
                                "📰 Breaking transfer news and rumor tracker",
                                "🌍 Africa-focused coverage you won't find elsewhere",
                                "📊 Comprehensive league tables and standings",
                                "🏆 World Cup, AFCON, and major tournament updates",
                            ].map((point, i) => (
                                <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                                    <span>{point}</span>
                                </li>
                            ))}
                        </ul>
                    </section>
                </div>

                {/* Sidebar */}
                <aside className="space-y-6">
                    <div className="bg-card rounded-xl border border-border p-6 text-center">
                        <img src="/Logonsm.png" alt="NSM Media" className="h-40 w-auto mx-auto mb-4" />
                        <h3 className="font-display text-lg uppercase text-foreground mb-2">NSM Media</h3>
                        <p className="text-xs text-muted-foreground mb-4">Your #1 source for Nigerian & African sports</p>
                        <div className="border-t border-border pt-4 space-y-2">
                            <p className="text-xs text-muted-foreground">📧 contact@nsmmedia.com</p>
                            <p className="text-xs text-muted-foreground">📍 Lagos, Nigeria</p>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl border border-primary/20 p-6">
                        <h3 className="font-display text-sm uppercase text-primary mb-2">Join Our Community</h3>
                        <p className="text-xs text-muted-foreground mb-3">
                            Follow us on social media for instant updates and exclusive content.
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {["Twitter", "Instagram", "Facebook", "YouTube"].map((platform) => (
                                <a
                                    key={platform}
                                    href="#"
                                    className="px-3 py-1.5 text-[10px] font-semibold bg-card rounded-full border border-border hover:border-primary hover:text-primary transition-colors"
                                >
                                    {platform}
                                </a>
                            ))}
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    </Layout>
);

export default About;
