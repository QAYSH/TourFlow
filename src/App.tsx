import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/dashboard/Dashboard";
import TourEditor from "./pages/TourEditor";
import Docs from "./pages/Docs";
import About from "./pages/About";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Careers from "./pages/Careers";
import Pricing from "./pages/Pricing";
import Blog from "./pages/Blog";
import Demo from "./pages/Demo";
import Contact from "./pages/Contact";
import Changelog from "./pages/Changelog";
import Security from "./pages/Security";
import Features from "./pages/Features";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Analytics from "./pages/dashboard/analytics";
import EmbedGenerator from "./pages/dashboard/embed";
import SettingsPage from "./pages/dashboard/settings";

const queryClient = new QueryClient();


const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard/Dashboard.tsx" element={<Dashboard />} />
          <Route path="/dashboard/analytics" element={<Analytics />} />
          <Route path="/dashboard/embed" element={<EmbedGenerator />} />
          <Route path="/dashboard/settings" element={<SettingsPage />} />
          <Route path="/dashboard/tours/new" element={<TourEditor />} />
          <Route path="/docs" element={<Docs />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/demo" element={<Demo/>} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/changelog" element={<Changelog />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/security" element={<Security />} />
          <Route path="/features" element={<Features />} />
          <Route path="/login" element={<Login />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
