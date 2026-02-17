import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import LiveScores from "./pages/LiveScores";
import Tables from "./pages/Tables";
import Transfers from "./pages/Transfers";
import Article from "./pages/Article";
import About from "./pages/About";
import NigeriaEvents from "./pages/NigeriaEvents";
import AfricaEvents from "./pages/AfricaEvents";
import InternationalEvents from "./pages/InternationalEvents";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminArticleForm from "./pages/admin/AdminArticleForm";
import AdminArticleView from "./pages/AdminArticleView";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/live" element={<LiveScores />} />
          <Route path="/tables" element={<Tables />} />
          <Route path="/transfers" element={<Transfers />} />
          <Route path="/article/:id" element={<Article />} />
          <Route path="/story/:id" element={<AdminArticleView />} />
          <Route path="/about" element={<About />} />
          <Route path="/nigeria" element={<NigeriaEvents />} />
          <Route path="/africa" element={<AfricaEvents />} />
          <Route path="/international" element={<InternationalEvents />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/new" element={<AdminArticleForm />} />
          <Route path="/admin/edit/:id" element={<AdminArticleForm />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
