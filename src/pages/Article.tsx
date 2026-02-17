import { useParams, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { topStories, transfers } from "@/data/mockData";
import heroImage from "@/assets/hero-football.jpg";
import { ArrowLeft, Clock, Share2 } from "lucide-react";

const Article = () => {
  const { id } = useParams();
  const story = topStories.find((s) => s.id === Number(id)) || topStories[0];
  const related = topStories.filter((s) => s.id !== story.id).slice(0, 3);

  return (
    <Layout>
      <div className="container py-6">
        <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors mb-5">
          <ArrowLeft className="w-4 h-4" /> Back to news
        </Link>

        <article className="max-w-3xl">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">{story.category}</span>
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="w-3 h-3" /> {story.timestamp}
            </span>
          </div>

          <h1 className="font-display text-2xl md:text-4xl uppercase leading-tight text-foreground mb-4">
            {story.title}
          </h1>

          <p className="text-base text-muted-foreground mb-6 leading-relaxed">{story.summary}</p>

          <div className="rounded-xl overflow-hidden mb-8">
            <img src={heroImage} alt={story.title} className="w-full h-[200px] md:h-[400px] object-cover" />
          </div>

          {/* Article body placeholder */}
          <div className="prose prose-sm max-w-none space-y-4 text-foreground/90 leading-relaxed">
            <p>
              In what was a scintillating display of football at the highest level, the match delivered everything fans could have hoped for and more. From the opening whistle, the intensity was palpable, with both sides committing fully to an attacking brand of play that kept spectators on the edge of their seats.
            </p>
            <p>
              The Nigerian contingent once again proved their worth on the global stage, with standout performances that underlined the depth of talent emerging from West Africa. The combination of pace, power, and technical ability was a reminder of why scouts from Europe's top clubs continue to monitor Nigerian talent closely.
            </p>

            {/* Pull quote */}
            <blockquote className="border-l-4 border-primary pl-4 py-2 my-6 italic text-foreground font-medium">
              "This is just the beginning. Nigerian football is on the rise, and the world is watching."
            </blockquote>

            <p>
              Looking ahead, the implications for both the domestic league and international competitions are significant. With qualification campaigns on the horizon and transfer windows approaching, the landscape of African football continues to evolve at a rapid pace.
            </p>
          </div>

          {/* Share */}
          <div className="flex items-center gap-3 mt-8 pt-6 border-t border-border">
            <button className="flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-muted text-foreground rounded-lg hover:bg-muted/80 transition-colors">
              <Share2 className="w-4 h-4" /> Share
            </button>
          </div>
        </article>

        {/* Related stories */}
        <section className="mt-10 pt-8 border-t border-border">
          <h2 className="font-display text-lg uppercase mb-4">Related Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {related.map((s) => (
              <Link
                key={s.id}
                to={`/article/${s.id}`}
                className="bg-card rounded-lg border border-border p-4 hover:border-primary/20 hover:shadow-sm transition-all"
              >
                <span className="text-[10px] font-bold uppercase tracking-wider text-primary">{s.category}</span>
                <h3 className="text-sm font-semibold mt-1 line-clamp-2 text-foreground">{s.title}</h3>
                <span className="text-[11px] text-muted-foreground mt-2 block">{s.timestamp}</span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Article;
