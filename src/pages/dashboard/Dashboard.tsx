import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Plus, 
  MoreHorizontal, 
  Play, 
  Edit2, 
  Trash2, 
  Copy,
  BarChart3,
  Users,
  Eye,
  CheckCircle2,
  Sparkles,
  Menu,
  X,
  Home,
  Layers,
  Settings,
  Code2
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/hooks/use-toast";

interface Tour {
  id: string;
  name: string;
  steps: number;
  views: number;
  completions: number;
  status: "active" | "draft";
  createdAt: string;
}

const mockTours: Tour[] = [
  {
    id: "1",
    name: "Welcome Tour",
    steps: 5,
    views: 1247,
    completions: 892,
    status: "active",
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    name: "Feature Discovery",
    steps: 7,
    views: 856,
    completions: 623,
    status: "active",
    createdAt: "2024-01-20",
  },
  {
    id: "3",
    name: "New Dashboard Guide",
    steps: 4,
    views: 0,
    completions: 0,
    status: "draft",
    createdAt: "2024-02-01",
  },
];

const sidebarLinks = [
  { icon: Home, label: "Overview", href: "/dashboard/Dashboard.tsx" },
  { icon: Layers, label: "Tours", href: "/dashboard/Dashboard.tsx" },
  { icon: BarChart3, label: "Analytics", href: "/dashboard/analytics" },
  { icon: Code2, label: "Embed", href: "/dashboard/embed" },
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
];

export default function Dashboard() {
  const [tours, setTours] = useState<Tour[]>(mockTours);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const stats = [
    { 
      label: "Total Views", 
      value: tours.reduce((acc, t) => acc + t.views, 0).toLocaleString(),
      icon: Eye,
      change: "+12.5%"
    },
    { 
      label: "Completions", 
      value: tours.reduce((acc, t) => acc + t.completions, 0).toLocaleString(),
      icon: CheckCircle2,
      change: "+8.3%"
    },
    { 
      label: "Completion Rate", 
      value: `${Math.round((tours.reduce((acc, t) => acc + t.completions, 0) / tours.reduce((acc, t) => acc + t.views, 0) || 0) * 100)}%`,
      icon: BarChart3,
      change: "+2.1%"
    },
    { 
      label: "Active Tours", 
      value: tours.filter(t => t.status === "active").length.toString(),
      icon: Layers,
      change: "0"
    },
  ];

  const handleDeleteTour = (id: string) => {
    setTours(tours.filter(t => t.id !== id));
    toast({
      title: "Tour deleted",
      description: "The tour has been permanently deleted.",
    });
  };

  const handleCopyEmbed = (id: string) => {
    navigator.clipboard.writeText(`<script src="https://tourflow.app/widget/${id}"></script>`);
    toast({
      title: "Embed code copied",
      description: "Paste this script in your website's HTML.",
    });
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
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
              >
                <link.icon className="w-5 h-5" />
                <span className="text-sm font-medium">{link.label}</span>
              </Link>
            ))}
          </nav>

          {/* User */}
          <div className="p-4 border-t border-sidebar-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-sidebar-accent flex items-center justify-center">
                <Users className="w-5 h-5 text-sidebar-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium text-sidebar-foreground">Demo User</p>
                <p className="text-xs text-muted-foreground">demo@tourflow.app</p>
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
          <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
            <div className="flex items-center gap-4">
              <button
                className="lg:hidden p-2 text-foreground"
                onClick={() => setIsSidebarOpen(true)}
              >
                <Menu className="w-5 h-5" />
              </button>
              <h1 className="font-heading font-bold text-xl text-foreground">Dashboard</h1>
            </div>
            <Button variant="hero" size="sm" asChild>
              <Link to="/dashboard/tours/new">
                <Plus className="w-4 h-4" />
                New Tour
              </Link>
            </Button>
          </div>
        </header>

        <div className="p-4 sm:p-6 lg:p-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="glass p-6 rounded-xl"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <stat.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
                    {stat.change}
                  </span>
                </div>
                <p className="font-heading font-bold text-2xl text-foreground mb-1">
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Tours List */}
          <div className="glass rounded-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-border">
              <h2 className="font-heading font-semibold text-lg text-foreground">Your Tours</h2>
            </div>
            <div className="divide-y divide-border">
              {tours.map((tour, index) => (
                <motion.div
                  key={tour.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="px-6 py-4 flex items-center justify-between hover:bg-secondary/30 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                      <Layers className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">{tour.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {tour.steps} steps • Created {tour.createdAt}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="hidden sm:flex items-center gap-6 text-sm">
                      <div className="text-center">
                        <p className="font-medium text-foreground">{tour.views.toLocaleString()}</p>
                        <p className="text-muted-foreground">Views</p>
                      </div>
                      <div className="text-center">
                        <p className="font-medium text-foreground">{tour.completions.toLocaleString()}</p>
                        <p className="text-muted-foreground">Completions</p>
                      </div>
                    </div>

                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      tour.status === "active" 
                        ? "bg-primary/10 text-primary" 
                        : "bg-muted text-muted-foreground"
                    }`}>
                      {tour.status}
                    </span>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuItem>
                          <Play className="w-4 h-4 mr-2" />
                          Preview
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit2 className="w-4 h-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleCopyEmbed(tour.id)}>
                          <Copy className="w-4 h-4 mr-2" />
                          Copy Embed
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="text-destructive"
                          onClick={() => handleDeleteTour(tour.id)}
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
