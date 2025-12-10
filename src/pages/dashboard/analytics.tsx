// src/pages/dashboard/analytics.tsx
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { 
  BarChart3, 
  Download, 
  Filter, 
  Calendar,
  Eye,
  CheckCircle2,
  Clock,
  TrendingUp,
  TrendingDown,
  Users,
  Sparkles,
  Menu,
  X,
  Home,
  Layers,
  Settings,
  Code2,
  ChevronDown,
  RefreshCw
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from 'recharts';
import { toast } from "@/hooks/use-toast";

// Mock data for charts
const generateMockData = (timeframe: '24h' | '7d' | '30d') => {
  const now = new Date();
  const data = [];
  
  let points = 24;
  let interval = 1; // hours
  
  if (timeframe === '7d') {
    points = 7;
    interval = 1; // days
  } else if (timeframe === '30d') {
    points = 30;
    interval = 1; // days
  }
  
  for (let i = points - 1; i >= 0; i--) {
    const date = new Date(now);
    if (timeframe === '24h') {
      date.setHours(now.getHours() - i);
    } else {
      date.setDate(now.getDate() - i);
    }
    
    // Realistic data with trends
    let baseViews = 100;
    let baseCompletions = 70;
    
    // Weekend effect
    const dayOfWeek = date.getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      baseViews *= 0.7;
      baseCompletions *= 0.65;
    }
    
    // Time of day effect (for 24h)
    if (timeframe === '24h') {
      const hour = date.getHours();
      if (hour < 8 || hour > 22) {
        baseViews *= 0.3;
        baseCompletions *= 0.25;
      } else if (hour >= 12 && hour <= 14) {
        baseViews *= 1.3;
        baseCompletions *= 1.2;
      }
    }
    
    // Add some randomness
    const views = Math.round(baseViews * (0.8 + Math.random() * 0.4));
    const completions = Math.round(baseCompletions * (0.7 + Math.random() * 0.6));
    const dropOff = Math.round((views - completions) / views * 100);
    const avgTime = Math.round((15 + Math.random() * 30) * 10) / 10;
    
    data.push({
      time: timeframe === '24h' 
        ? date.getHours().toString().padStart(2, '0') + ':00'
        : date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      views,
      completions,
      dropOff,
      avgTime,
      date: date.toISOString().split('T')[0]
    });
  }
  
  return data;
};

const stepAnalyticsData = [
  { step: 1, name: "Welcome", views: 1247, completions: 1247, dropOff: 0 },
  { step: 2, name: "Navigation", views: 1247, completions: 1103, dropOff: 11.5 },
  { step: 3, name: "Dashboard", views: 1103, completions: 956, dropOff: 13.3 },
  { step: 4, name: "Settings", views: 956, completions: 892, dropOff: 6.7 },
  { step: 5, name: "Get Help", views: 892, completions: 847, dropOff: 5.1 },
];

const tourPerformanceData = [
  { name: "Welcome Tour", views: 1247, completions: 892, completionRate: 71.5, avgTime: "2.3m" },
  { name: "Feature Discovery", views: 856, completions: 623, completionRate: 72.8, avgTime: "3.1m" },
  { name: "New Dashboard Guide", views: 432, completions: 321, completionRate: 74.3, avgTime: "1.8m" },
  { name: "Onboarding Flow", views: 789, completions: 567, completionRate: 71.9, avgTime: "2.7m" },
  { name: "Product Tour", views: 654, completions: 489, completionRate: 74.8, avgTime: "2.1m" },
];

const userSegmentsData = [
  { name: 'New Users', value: 45, color: '#3b82f6' },
  { name: 'Returning Users', value: 30, color: '#8b5cf6' },
  { name: 'Power Users', value: 15, color: '#10b981' },
  { name: 'Inactive', value: 10, color: '#6b7280' },
];

const sidebarLinks = [
  { icon: Home, label: "Overview", href: "/dashboard/Dashboard.tsx" },
  { icon: Layers, label: "Tours", href: "/dashboard/Dashboard.tsx" },
  { icon: BarChart3, label: "Analytics", href: "/dashboard/analytics" },
  { icon: Code2, label: "Embed", href: "/dashboard/embed" },
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
];

export default function Analytics() {
  const location = useLocation();
  const [timeframe, setTimeframe] = useState<'24h' | '7d' | '30d'>('7d');
  const [selectedTour, setSelectedTour] = useState<string>('all');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const chartData = useMemo(() => generateMockData(timeframe), [timeframe]);
  
  const stats = [
    { 
      label: "Total Views", 
      value: chartData.reduce((acc, d) => acc + d.views, 0).toLocaleString(),
      icon: Eye,
      change: "+12.5%",
      trend: "up"
    },
    { 
      label: "Completions", 
      value: chartData.reduce((acc, d) => acc + d.completions, 0).toLocaleString(),
      icon: CheckCircle2,
      change: "+8.3%",
      trend: "up"
    },
    { 
      label: "Avg. Completion Time", 
      value: `${Math.round(chartData.reduce((acc, d) => acc + d.avgTime, 0) / chartData.length)}s`,
      icon: Clock,
      change: "-5.2%",
      trend: "down"
    },
    { 
      label: "Completion Rate", 
      value: `${Math.round((chartData.reduce((acc, d) => acc + d.completions, 0) / chartData.reduce((acc, d) => acc + d.views, 0) || 0) * 100)}%`,
      icon: TrendingUp,
      change: "+2.1%",
      trend: "up"
    },
  ];
  
  const handleExport = (format: 'csv' | 'pdf') => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: `Exported as ${format.toUpperCase()}`,
        description: `Your analytics data has been exported successfully.`,
      });
    }, 1000);
  };
  
  const handleRefresh = () => {
    setIsLoading(true);
    // Simulate data refresh
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Data refreshed",
        description: "Analytics data has been updated.",
      });
    }, 800);
  };
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar - Same as Dashboard */}
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
              <h1 className="font-heading font-bold text-xl text-foreground">Analytics</h1>
              <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
                <BarChart3 className="w-4 h-4" />
                <span>Real-time insights and performance metrics</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isLoading}>
                <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => handleExport('csv')}>
                    Export as CSV
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleExport('pdf')}>
                    Export as PDF
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        <div className="p-4 sm:p-6 lg:p-8">
          {/* Controls */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="flex items-center gap-4 flex-1">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {timeframe === '24h' ? 'Last 24 Hours' : timeframe === '7d' ? 'Last 7 Days' : 'Last 30 Days'}
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setTimeframe('24h')}>
                    Last 24 Hours
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTimeframe('7d')}>
                    Last 7 Days
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTimeframe('30d')}>
                    Last 30 Days
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Filter className="w-4 h-4" />
                    {selectedTour === 'all' ? 'All Tours' : selectedTour}
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setSelectedTour('all')}>
                    All Tours
                  </DropdownMenuItem>
                  {tourPerformanceData.map((tour) => (
                    <DropdownMenuItem 
                      key={tour.name}
                      onClick={() => setSelectedTour(tour.name)}
                    >
                      {tour.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

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
                  <div className="flex items-center gap-1">
                    {stat.trend === 'up' ? (
                      <TrendingUp className="w-4 h-4 text-green-500" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-500" />
                    )}
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                      stat.trend === 'up' 
                        ? 'text-green-600 bg-green-500/10' 
                        : 'text-red-600 bg-red-500/10'
                    }`}>
                      {stat.change}
                    </span>
                  </div>
                </div>
                <p className="font-heading font-bold text-2xl text-foreground mb-1">
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Views & Completions Trend */}
            <Card className="glass border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Views & Completions Trend
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                      <XAxis 
                        dataKey="time" 
                        stroke="var(--muted-foreground)"
                        fontSize={12}
                      />
                      <YAxis 
                        stroke="var(--muted-foreground)"
                        fontSize={12}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'var(--card)',
                          borderColor: 'var(--border)',
                          borderRadius: '8px'
                        }}
                      />
                      <Legend />
                      <Area 
                        type="monotone" 
                        dataKey="views" 
                        stackId="1"
                        stroke="var(--primary)" 
                        fill="var(--primary)"
                        fillOpacity={0.3}
                        name="Views"
                      />
                      <Area 
                        type="monotone" 
                        dataKey="completions" 
                        stackId="1"
                        stroke="#10b981" 
                        fill="#10b981"
                        fillOpacity={0.3}
                        name="Completions"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Step Performance */}
            <Card className="glass border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Step Performance & Drop-off
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={stepAnalyticsData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                      <XAxis 
                        dataKey="name" 
                        stroke="var(--muted-foreground)"
                        fontSize={12}
                      />
                      <YAxis 
                        stroke="var(--muted-foreground)"
                        fontSize={12}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'var(--card)',
                          borderColor: 'var(--border)',
                          borderRadius: '8px'
                        }}
                      />
                      <Legend />
                      <Bar 
                        dataKey="views" 
                        fill="var(--primary)" 
                        name="Views"
                        radius={[4, 4, 0, 0]}
                      />
                      <Bar 
                        dataKey="completions" 
                        fill="#10b981" 
                        name="Completions"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Tour Performance */}
            <Card className="glass border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Layers className="w-5 h-5" />
                  Tour Performance Comparison
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={tourPerformanceData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                      <XAxis 
                        dataKey="name" 
                        stroke="var(--muted-foreground)"
                        fontSize={12}
                        angle={-45}
                        textAnchor="end"
                        height={60}
                      />
                      <YAxis 
                        stroke="var(--muted-foreground)"
                        fontSize={12}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'var(--card)',
                          borderColor: 'var(--border)',
                          borderRadius: '8px'
                        }}
                        formatter={(value, name) => {
                          if (name === 'completionRate') return [`${value}%`, 'Completion Rate'];
                          return [value, name];
                        }}
                      />
                      <Legend />
                      <Bar 
                        dataKey="views" 
                        fill="var(--primary)" 
                        name="Views"
                        radius={[4, 4, 0, 0]}
                      />
                      <Bar 
                        dataKey="completions" 
                        fill="#10b981" 
                        name="Completions"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* User Segments */}
            <Card className="glass border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  User Segments
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={userSegmentsData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {userSegmentsData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'var(--card)',
                          borderColor: 'var(--border)',
                          borderRadius: '8px'
                        }}
                        formatter={(value) => [`${value}%`, 'Percentage']}
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Performance Table */}
          <Card className="glass border-0">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Detailed Performance Metrics
                </span>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export Table
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Tour Name</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Views</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Completions</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Completion Rate</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Avg. Time</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tourPerformanceData.map((tour) => (
                      <tr key={tour.name} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                        <td className="py-3 px-4">
                          <div className="font-medium text-foreground">{tour.name}</div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <Eye className="w-4 h-4 text-muted-foreground" />
                            <span className="font-medium">{tour.views.toLocaleString()}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-500" />
                            <span className="font-medium">{tour.completions.toLocaleString()}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <div className="w-full bg-secondary rounded-full h-2">
                              <div 
                                className="bg-primary rounded-full h-2"
                                style={{ width: `${tour.completionRate}%` }}
                              />
                            </div>
                            <span className="font-medium">{tour.completionRate}%</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-muted-foreground" />
                            <span className="font-medium">{tour.avgTime}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            tour.completionRate > 70 
                              ? 'bg-green-500/10 text-green-600' 
                              : 'bg-yellow-500/10 text-yellow-600'
                          }`}>
                            {tour.completionRate > 70 ? 'High' : 'Medium'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Empty State (Hidden by default, shown when no data) */}
          {false && ( // Change to true when no tours exist
            <div className="text-center py-12 glass rounded-xl">
              <div className="w-16 h-16 mx-auto bg-secondary rounded-full flex items-center justify-center mb-4">
                <BarChart3 className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No analytics data yet</h3>
              <p className="text-muted-foreground mb-4">
                Create and publish tours to start collecting analytics data.
              </p>
              <Button asChild>
                <Link to="/dashboard/tours/new">Create First Tour</Link>
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}