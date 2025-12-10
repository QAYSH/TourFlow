import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { 
  Calendar, 
  Tag, 
  Zap, 
  Bug, 
  Sparkles, 
  TrendingUp, 
  Wrench,
  Rocket,
  CheckCircle,
  ExternalLink,
  Bell,
  Code,
  Users,
  Palette
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link } from "react-router-dom";

type UpdateType = 'feature' | 'improvement' | 'fix' | 'announcement';

interface ChangelogEntry {
  id: number;
  version: string;
  date: string;
  title: string;
  type: UpdateType;
  description: string;
  highlights: string[];
  readMoreLink?: string;
}

const changelogEntries: ChangelogEntry[] = [
  {
    id: 1,
    version: "v2.3.0",
    date: "December 15, 2023",
    title: "AI-Powered Tour Suggestions",
    type: 'feature',
    description: "Introducing AI-assisted tour creation with intelligent step suggestions and content generation.",
    highlights: [
      "AI analyzes your website to suggest optimal tour steps",
      "Auto-generated tour descriptions and button text",
      "Smart targeting for dynamic content",
      "Performance improvements to AI models"
    ],
    readMoreLink: "/blog/ai-tour-suggestions"
  },
  {
    id: 2,
    version: "v2.2.1",
    date: "December 5, 2023",
    title: "Performance Optimization",
    type: 'improvement',
    description: "Major performance improvements and bug fixes across the platform.",
    highlights: [
      "Widget load time reduced by 40%",
      "Dashboard performance improved by 60%",
      "Fixed memory leaks in tour editor",
      "Optimized database queries"
    ]
  },
  {
    id: 3,
    version: "v2.2.0",
    date: "November 28, 2023",
    title: "Advanced Analytics Dashboard",
    type: 'feature',
    description: "Completely redesigned analytics with deeper insights and custom reporting.",
    highlights: [
      "Real-time conversion tracking",
      "Custom funnel analysis",
      "Export reports to CSV/PDF",
      "Compare tour performance"
    ],
    readMoreLink: "/blog/advanced-analytics"
  },
  {
    id: 4,
    version: "v2.1.3",
    date: "November 15, 2023",
    title: "Bug Fixes & Stability",
    type: 'fix',
    description: "Critical bug fixes and stability improvements.",
    highlights: [
      "Fixed tour skipping on mobile devices",
      "Resolved issue with custom CSS injection",
      "Fixed API rate limiting calculation",
      "Improved error handling"
    ]
  },
  {
    id: 5,
    version: "v2.1.0",
    date: "November 1, 2023",
    title: "Team Collaboration Features",
    type: 'feature',
    description: "New collaboration tools for teams working on tours together.",
    highlights: [
      "Real-time collaborative editing",
      "Comments and feedback system",
      "Role-based permissions",
      "Version history for tours"
    ],
    readMoreLink: "/blog/team-collaboration"
  },
  {
    id: 6,
    version: "v2.0.2",
    date: "October 20, 2023",
    title: "Accessibility Improvements",
    type: 'improvement',
    description: "Major accessibility improvements across the platform.",
    highlights: [
      "WCAG 2.1 AA compliance",
      "Improved screen reader support",
      "Keyboard navigation enhancements",
      "Contrast ratio improvements"
    ]
  },
  {
    id: 7,
    version: "v2.0.1",
    date: "October 10, 2023",
    title: "Security Update",
    type: 'fix',
    description: "Security enhancements and vulnerability patches.",
    highlights: [
      "Updated SSL/TLS configurations",
      "Enhanced API security",
      "Improved data encryption",
      "Security audit fixes"
    ]
  },
  {
    id: 8,
    version: "v2.0.0",
    date: "October 1, 2023",
    title: "TourFlow 2.0 Launch",
    type: 'announcement',
    description: "Complete platform redesign with new features and improved performance.",
    highlights: [
      "Completely new dashboard UI",
      "Redesigned widget with new animations",
      "Multi-language support",
      "Advanced user segmentation"
    ],
    readMoreLink: "/blog/tourflow-2-launch"
  },
  {
    id: 9,
    version: "v1.5.0",
    date: "September 15, 2023",
    title: "Custom Widget Themes",
    type: 'feature',
    description: "Create and save custom widget themes for consistent branding.",
    highlights: [
      "Theme builder with live preview",
      "Save and reuse custom themes",
      "Export/import themes",
      "Share themes across team"
    ]
  },
  {
    id: 10,
    version: "v1.4.2",
    date: "September 5, 2023",
    title: "Mobile Optimizations",
    type: 'improvement',
    description: "Improved mobile experience across all platforms.",
    highlights: [
      "Better touch targets on mobile",
      "Improved widget positioning",
      "Mobile-optimized dashboard",
      "Reduced bundle size"
    ]
  }
];

const typeConfig = {
  feature: {
    icon: Sparkles,
    label: "New Feature",
    color: "text-primary",
    bgColor: "bg-primary/10",
    borderColor: "border-primary/20"
  },
  improvement: {
    icon: TrendingUp,
    label: "Improvement",
    color: "text-accent",
    bgColor: "bg-accent/10",
    borderColor: "border-accent/20"
  },
  fix: {
    icon: Bug,
    label: "Bug Fix",
    color: "text-rose-500",
    bgColor: "bg-rose-500/10",
    borderColor: "border-rose-500/20"
  },
  announcement: {
    icon: Rocket,
    label: "Announcement",
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-500/20"
  }
};

const filters: { label: string; type: UpdateType | 'all' }[] = [
  { label: "All Updates", type: 'all' },
  { label: "New Features", type: 'feature' },
  { label: "Improvements", type: 'improvement' },
  { label: "Bug Fixes", type: 'fix' },
  { label: "Announcements", type: 'announcement' }
];

const upcomingFeatures = [
  {
    title: "AI Performance Analytics",
    description: "AI-driven insights into tour performance and optimization suggestions",
    status: "In Development",
    eta: "Q1 2024"
  },
  {
    title: "Advanced Integrations",
    description: "Native integrations with more CRM and analytics platforms",
    status: "Planned",
    eta: "Q2 2024"
  },
  {
    title: "Mobile SDK",
    description: "Native mobile SDKs for iOS and Android applications",
    status: "Research",
    eta: "Q3 2024"
  }
];

export default function Changelog() {
  const [activeFilter, setActiveFilter] = useState<UpdateType | 'all'>('all');
  const [showAll, setShowAll] = useState(false);

  const filteredEntries = activeFilter === 'all' 
    ? changelogEntries 
    : changelogEntries.filter(entry => entry.type === activeFilter);

  const displayedEntries = showAll ? filteredEntries : filteredEntries.slice(0, 5);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        {/* Hero */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto text-center"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm text-muted-foreground">Changelog</span>
              </div>
              <h1 className="font-heading text-4xl sm:text-5xl font-bold mb-6">
                What's <span className="gradient-text">New</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-10">
                Stay up to date with the latest features, improvements, and fixes.
                We ship updates regularly to make TourFlow better every day.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button variant="hero-outline" size="lg" asChild>
                  <a href="#subscribe">
                    <Bell className="w-5 h-5" />
                    Subscribe to Updates
                  </a>
                </Button>
                <Button variant="ghost" size="lg" asChild>
                  <Link to="/docs">
                    <Code className="w-5 h-5" />
                    API Changelog
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 bg-secondary/20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto"
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="glass p-6 rounded-2xl text-center">
                  <div className="font-heading text-3xl font-bold text-primary mb-2">
                    {changelogEntries.length}
                  </div>
                  <div className="text-sm text-muted-foreground">Updates in 2023</div>
                </div>
                <div className="glass p-6 rounded-2xl text-center">
                  <div className="font-heading text-3xl font-bold text-primary mb-2">
                    {changelogEntries.filter(e => e.type === 'feature').length}
                  </div>
                  <div className="text-sm text-muted-foreground">New Features</div>
                </div>
                <div className="glass p-6 rounded-2xl text-center">
                  <div className="font-heading text-3xl font-bold text-primary mb-2">
                    99.8%
                  </div>
                  <div className="text-sm text-muted-foreground">Uptime</div>
                </div>
                <div className="glass p-6 rounded-2xl text-center">
                  <div className="font-heading text-3xl font-bold text-primary mb-2">
                    24h
                  </div>
                  <div className="text-sm text-muted-foreground">Avg. Release Cycle</div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              {/* Filters */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mb-12"
              >
                <div className="flex flex-wrap gap-3">
                  {filters.map((filter) => {
                    const config = filter.type !== 'all' ? typeConfig[filter.type] : null;
                    const isActive = activeFilter === filter.type;
                    
                    return (
                      <button
                        key={filter.type}
                        onClick={() => setActiveFilter(filter.type)}
                        className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all ${
                          isActive
                            ? config
                              ? `${config.bgColor} ${config.color} border ${config.borderColor}`
                              : 'bg-primary text-primary-foreground'
                            : 'glass text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        {config && <config.icon className="w-4 h-4" />}
                        {filter.label}
                      </button>
                    );
                  })}
                </div>
              </motion.div>

              {/* Changelog Entries */}
              <div className="space-y-8 mb-12">
                {displayedEntries.map((entry, index) => {
                  const config = typeConfig[entry.type];
                  const Icon = config.icon;
                  
                  return (
                    <motion.article
                      key={entry.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className={`glass p-8 rounded-2xl border-l-4 ${config.borderColor}`}
                    >
                      <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                        {/* Version Badge */}
                        <div className="lg:w-48 flex-shrink-0">
                          <div className="flex items-center gap-3 mb-4">
                            <div className={`w-10 h-10 rounded-xl ${config.bgColor} flex items-center justify-center`}>
                              <Icon className={`w-5 h-5 ${config.color}`} />
                            </div>
                            <div>
                              <div className="font-heading font-bold text-lg text-foreground">
                                {entry.version}
                              </div>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Calendar className="w-3 h-3" />
                                {entry.date}
                              </div>
                            </div>
                          </div>
                          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${config.bgColor} ${config.color}`}>
                            <Tag className="w-3 h-3" />
                            {config.label}
                          </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                          <h3 className="font-heading text-xl font-bold text-foreground mb-3">
                            {entry.title}
                          </h3>
                          <p className="text-muted-foreground mb-6">
                            {entry.description}
                          </p>
                          
                          <div className="mb-6">
                            <h4 className="font-heading font-semibold text-foreground mb-3 flex items-center gap-2">
                              <Zap className="w-4 h-4 text-primary" />
                              Highlights
                            </h4>
                            <ul className="space-y-2">
                              {entry.highlights.map((highlight, i) => (
                                <li key={i} className="flex items-start gap-3">
                                  <CheckCircle className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                                  <span className="text-sm text-muted-foreground">{highlight}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {entry.readMoreLink && (
                            <Button variant="ghost" size="sm" asChild>
                              <Link to={entry.readMoreLink}>
                                Read more about this update
                                <ExternalLink className="w-4 h-4" />
                              </Link>
                            </Button>
                          )}
                        </div>
                      </div>
                    </motion.article>
                  );
                })}
              </div>

              {/* Load More */}
              {!showAll && filteredEntries.length > 5 && (
                <div className="text-center mb-16">
                  <Button 
                    variant="hero-outline" 
                    size="lg"
                    onClick={() => setShowAll(true)}
                  >
                    Load More Updates
                  </Button>
                </div>
              )}

              {/* Upcoming Features */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mb-16"
              >
                <div className="glass p-8 rounded-2xl">
                  <div className="flex items-center gap-3 mb-8">
                    <Rocket className="w-6 h-6 text-primary" />
                    <div>
                      <h2 className="font-heading text-2xl font-bold text-foreground">
                        What's Coming Next
                      </h2>
                      <p className="text-muted-foreground">
                        A sneak peek at features we're working on
                      </p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6">
                    {upcomingFeatures.map((feature, index) => (
                      <div
                        key={feature.title}
                        className="p-6 rounded-xl bg-secondary/30 border border-border/50"
                      >
                        <h3 className="font-heading font-semibold text-foreground mb-2">
                          {feature.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          {feature.description}
                        </p>
                        <div className="flex items-center justify-between text-xs">
                          <span className="px-2 py-1 rounded bg-primary/10 text-primary">
                            {feature.status}
                          </span>
                          <span className="text-muted-foreground">
                            ETA: {feature.eta}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 text-center">
                    <Button variant="ghost" asChild>
                      <Link to="/contact">Suggest a feature</Link>
                    </Button>
                  </div>
                </div>
              </motion.div>

              {/* Subscribe */}
              <motion.div
                id="subscribe"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="glass p-8 rounded-2xl text-center"
              >
                <Bell className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-heading text-xl font-bold mb-3">
                  Never Miss an Update
                </h3>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Subscribe to our newsletter and get notified about new features, 
                  improvements, and important announcements.
                </p>
                <div className="max-w-md mx-auto">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="email"
                      placeholder="Your email address"
                      className="flex-1 px-4 py-3 rounded-lg glass border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <Button variant="hero" className="sm:w-auto">
                      Subscribe
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-3">
                    We'll only send you product updates. No spam, ever.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* RSS Feed */}
        <section className="py-16 bg-secondary/20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto text-center"
            >
              <div className="glass p-8 rounded-2xl">
                <h3 className="font-heading text-xl font-bold mb-3">
                  Developer Resources
                </h3>
                <p className="text-muted-foreground mb-6">
                  Integrate our changelog into your workflow with these resources.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button variant="hero-outline" asChild>
                    <a href="/changelog/rss">
                      <Code className="w-4 h-4" />
                      RSS Feed
                    </a>
                  </Button>
                  <Button variant="hero-outline" asChild>
                    <a href="/api/changelog">
                      <Code className="w-4 h-4" />
                      JSON API
                    </a>
                  </Button>
                  <Button variant="hero-outline" asChild>
                    <Link to="/docs/webhooks">
                      <Code className="w-4 h-4" />
                      Webhooks
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}