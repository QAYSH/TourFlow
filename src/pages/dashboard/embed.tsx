// src/pages/dashboard/embed.tsx
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { 
  Code2, 
  Copy, 
  Download, 
  Eye,
  Play,
  Sparkles,
  Menu,
  X,
  Home,
  Layers,
  BarChart3,
  Settings,
  CheckCircle2,
  Zap,
  Smartphone,
  Globe,
  ChevronRight,
  ChevronDown,
  RefreshCw,
  QrCode,
  ExternalLink,
  Shield,
  Rocket
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import CustomizerPanel from "@/components/embed/CustomizerPanel";
import PreviewWindow from "@/components/embed/PreviewWindow";
import CodePreview from "@/components/embed/CodePreview";
import InstallationTabs from "@/components/embed/InstallationTabs";
import AdvancedSettings from "@/components/embed/AdvancedSettings";
import IntegrationStatus from "@/components/embed/IntegrationStatus";
import { EmbedConfig } from "@/components/embed/types";
import { defaultConfig } from "@/lib/embed/defaultConfig";
import { mockTours } from "@/lib/embed/mockTours";

const sidebarLinks = [
  { icon: Home, label: "Overview", href: "/dashboard/Dashboard.tsx" },
  { icon: Layers, label: "Tours", href: "/dashboard/Dashboard.tsx" },
  { icon: BarChart3, label: "Analytics", href: "/dashboard/analytics" },
  { icon: Code2, label: "Embed", href: "/dashboard/embed" },
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
];

export default function EmbedGenerator() {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [config, setConfig] = useState<EmbedConfig>({
    ...defaultConfig,
    tourId: mockTours[0]?.id || "",
    name: `Embed Config - ${mockTours[0]?.name || "Default"}`,
  });

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleConfigUpdate = (updates: Partial<EmbedConfig>) => {
    setConfig(prev => ({ ...prev, ...updates }));
  };

  const handleSaveConfig = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Configuration saved",
        description: `"${config.name}" has been saved.`,
      });
    }, 800);
  };

  const handleTestEmbed = () => {
    window.open(`/embed-test?config=${encodeURIComponent(JSON.stringify(config))}`, '_blank');
  };

  const handleGenerateQR = () => {
    toast({
      title: "QR Code Generated",
      description: "Scan to test on mobile device.",
    });
    // In real implementation, generate QR code
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-sidebar border-r border-sidebar-border transform transition-transform duration-300 lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-4 border-b border-sidebar-border flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-heading font-bold text-lg text-sidebar-foreground">
                TourFlow
              </span>
            </Link>
            <button
              className="lg:hidden p-2 text-sidebar-foreground"
              onClick={() => setIsSidebarOpen(false)}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Nav Links */}
          <nav className="flex-1 p-4 space-y-1">
            {sidebarLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                  isActive(link.href)
                    ? "bg-primary/20 text-primary border border-primary/30"
                    : "text-sidebar-foreground hover:bg-sidebar-accent"
                }`}
              >
                <link.icon className="w-5 h-5" />
                <span className="text-sm font-medium">{link.label}</span>
                {isActive(link.href) && (
                  <div className="ml-auto w-2 h-2 rounded-full bg-primary" />
                )}
              </Link>
            ))}
          </nav>

          {/* User */}
          <div className="p-4 border-t border-sidebar-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-sidebar-accent flex items-center justify-center">
                <Globe className="w-5 h-5 text-sidebar-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium text-sidebar-foreground">Embed Studio</p>
                <p className="text-xs text-muted-foreground">v1.0.0</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 lg:pl-64">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 glass-strong border-b border-border">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-4 sm:px-6 lg:px-8 py-4 gap-4">
            <div className="flex items-center gap-4">
              <button
                className="lg:hidden p-2 text-foreground"
                onClick={() => setIsSidebarOpen(true)}
              >
                <Menu className="w-5 h-5" />
              </button>
              <div>
                <h1 className="font-heading font-bold text-xl text-foreground">Embed Generator</h1>
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  <Code2 className="w-4 h-4" />
                  Create and customize tour embeds for your website
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" onClick={handleGenerateQR}>
                <QrCode className="w-4 h-4 mr-2" />
                QR Code
              </Button>
              <Button variant="outline" size="sm" onClick={handleTestEmbed}>
                <ExternalLink className="w-4 h-4 mr-2" />
                Test Live
              </Button>
              <Button variant="hero" size="sm" onClick={handleSaveConfig} disabled={isLoading}>
                {isLoading ? (
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                )}
                Save Config
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <div className="p-4 sm:p-6 lg:p-8">
          {/* Integration Status Banner */}
          <IntegrationStatus config={config} />

          {/* Configuration Name */}
          <div className="mb-8">
            <div className="glass p-4 rounded-xl">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="flex-1">
                  <label className="text-sm font-medium text-muted-foreground mb-1 block">
                    Configuration Name
                  </label>
                  <input
                    type="text"
                    value={config.name}
                    onChange={(e) => handleConfigUpdate({ name: e.target.value })}
                    className="w-full bg-transparent border-none text-foreground text-lg font-heading font-semibold focus:outline-none focus:ring-0"
                    placeholder="Enter configuration name..."
                  />
                </div>
                <div className="w-full sm:w-auto">
                  <label className="text-sm font-medium text-muted-foreground mb-1 block">
                    Select Tour
                  </label>
                  <select
                    value={config.tourId}
                    onChange={(e) => handleConfigUpdate({ tourId: e.target.value })}
                    className="w-full sm:w-64 bg-card border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    {mockTours.map((tour) => (
                      <option key={tour.id} value={tour.id}>
                        {tour.name} ({tour.steps} steps) • {tour.status}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Three Column Layout - Desktop */}
          <div className="hidden lg:grid grid-cols-3 gap-8 mb-8">
            {/* Left Column - Customizer */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="glass rounded-xl overflow-hidden">
                <div className="px-6 py-4 border-b border-border bg-primary/5">
                  <h2 className="font-heading font-semibold text-lg text-foreground flex items-center gap-2">
                    <Zap className="w-5 h-5 text-primary" />
                    Customize Appearance
                  </h2>
                </div>
                <div className="p-6">
                  <CustomizerPanel config={config} onUpdate={handleConfigUpdate} />
                </div>
              </div>
            </motion.div>

            {/* Middle Column - Preview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-6"
            >
              <div className="glass rounded-xl overflow-hidden">
                <div className="px-6 py-4 border-b border-border bg-primary/5">
                  <h2 className="font-heading font-semibold text-lg text-foreground flex items-center gap-2">
                    <Eye className="w-5 h-5 text-primary" />
                    Live Preview
                    <span className="ml-auto text-xs font-normal text-muted-foreground flex items-center gap-1">
                      <Smartphone className="w-3 h-3" />
                      Responsive
                    </span>
                  </h2>
                </div>
                <div className="p-6">
                  <PreviewWindow config={config} />
                </div>
              </div>
            </motion.div>

            {/* Right Column - Code */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-6"
            >
              <div className="glass rounded-xl overflow-hidden">
                <div className="px-6 py-4 border-b border-border bg-primary/5">
                  <h2 className="font-heading font-semibold text-lg text-foreground flex items-center gap-2">
                    <Code2 className="w-5 h-5 text-primary" />
                    Embed Code
                  </h2>
                </div>
                <div className="p-6">
                  <CodePreview config={config} />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Mobile/Tablet Layout */}
          <div className="lg:hidden space-y-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass rounded-xl overflow-hidden"
            >
              <div className="px-6 py-4 border-b border-border bg-primary/5">
                <h2 className="font-heading font-semibold text-lg text-foreground flex items-center gap-2">
                  <Zap className="w-5 h-5 text-primary" />
                  Customize Appearance
                </h2>
              </div>
              <div className="p-6">
                <CustomizerPanel config={config} onUpdate={handleConfigUpdate} />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass rounded-xl overflow-hidden"
            >
              <div className="px-6 py-4 border-b border-border bg-primary/5">
                <h2 className="font-heading font-semibold text-lg text-foreground flex items-center gap-2">
                  <Eye className="w-5 h-5 text-primary" />
                  Live Preview
                </h2>
              </div>
              <div className="p-6">
                <PreviewWindow config={config} />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass rounded-xl overflow-hidden"
            >
              <div className="px-6 py-4 border-b border-border bg-primary/5">
                <h2 className="font-heading font-semibold text-lg text-foreground flex items-center gap-2">
                  <Code2 className="w-5 h-5 text-primary" />
                  Embed Code & Installation
                </h2>
              </div>
              <div className="p-6">
                <CodePreview config={config} />
              </div>
            </motion.div>
          </div>

          {/* Installation Guide - Below on all screens */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass rounded-xl overflow-hidden mb-8"
          >
            <div className="px-6 py-4 border-b border-border bg-primary/5">
              <h2 className="font-heading font-semibold text-lg text-foreground flex items-center gap-2">
                <Rocket className="w-5 h-5 text-primary" />
                Installation Guide
              </h2>
            </div>
            <div className="p-6">
              <InstallationTabs config={config} />
            </div>
          </motion.div>

          {/* Advanced Settings (Accordion) */}
          <AdvancedSettings config={config} onUpdate={handleConfigUpdate} />

          {/* Quick Actions Footer */}
          <div className="glass rounded-xl p-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                  Ready to deploy?
                </h3>
                <p className="text-sm text-muted-foreground">
                  Copy the embed code and add it to your website to start guiding users.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="lg">
                  <Download className="w-5 h-5 mr-2" />
                  Download Config
                </Button>
                <Button variant="hero" size="lg">
                  <Copy className="w-5 h-5 mr-2" />
                  Copy All Code
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}