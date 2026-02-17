import Layout from "@/components/layout/Layout";
import LiveScoresStrip from "@/components/home/LiveScoresStrip";
import HeroStory from "@/components/home/HeroStory";
import NewsFeed from "@/components/home/NewsFeed";
import PLTableWidget from "@/components/home/PLTableWidget";
import TransferTicker from "@/components/home/TransferTicker";
import TrendingWidget from "@/components/home/TrendingWidget";

const Index = () => (
  <Layout>
    <LiveScoresStrip />
    <div className="container mt-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main feed */}
        <div className="lg:col-span-2 space-y-6">
          <HeroStory />
          <NewsFeed />
        </div>

        {/* Sidebar */}
        <aside className="space-y-5">
          <PLTableWidget />
          <TransferTicker />
          <TrendingWidget />
        </aside>
      </div>
    </div>
  </Layout>
);

export default Index;
