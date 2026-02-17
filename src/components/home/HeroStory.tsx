
import { useNews } from "@/hooks/useNews";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-football.jpg";

const HeroStory = () => {
  const { data: articles, isLoading } = useNews("football breaking");
  const story = articles && articles.length > 0 ? articles[0] : null;

  if (isLoading) {
    return (
      <div className="relative rounded-xl overflow-hidden bg-secondary h-[240px] md:h-[380px] animate-pulse">
        <div className="absolute inset-0 bg-muted" />
      </div>
    );
  }

  if (!story) return null;

  return (
    <Link to={story.link} target="_blank" className="block group">
      <div className="relative rounded-xl overflow-hidden bg-secondary">
        <img
          src={story.image_url || heroImage}
          alt={story.title}
          className="w-full h-[240px] md:h-[380px] object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
          <span className="inline-block bg-live text-live-foreground text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded mb-2">
            Breaking
          </span>
          <span className="block text-xs font-semibold text-primary mb-1 uppercase">{story.source_id}</span>
          <h2 className="font-display text-xl md:text-3xl text-secondary-foreground leading-tight mb-2 group-hover:text-primary transition-colors line-clamp-2">
            {story.title}
          </h2>
          <p className="text-sm text-secondary-foreground/70 line-clamp-2 hidden md:block">{story.description}</p>
          <span className="text-[11px] text-secondary-foreground/50 mt-2 block">{new Date(story.pubDate).toLocaleString()}</span>
        </div>
      </div>
    </Link>
  );
};

export default HeroStory;
