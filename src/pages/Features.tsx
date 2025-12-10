import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { 
  Layers, 
  Zap, 
  BarChart3, 
  Code2, 
  Palette, 
  Shield,
  Sparkles,
  Globe,
  MousePointer,
  Target,
  Bell,
  Users
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const features = [
  {
    icon: Layers,
    title: "Multi-Step Tours",
    description: "Create comprehensive tours with unlimited steps, branching logic, and conditional flows. Guide users through complex workflows with ease.",
    color: "primary",
  },
  {
    icon: MousePointer,
    title: "Smart Targeting",
    description: "Target specific elements on your page with pinpoint accuracy. Our widget automatically adjusts to responsive layouts.",
    color: "accent",
  },
  {
    icon: BarChart3,
    title: "Rich Analytics",
    description: "Track completion rates, drop-offs, and user engagement in real-time. Identify friction points and optimize your tours.",
    color: "primary",
  },
  {
    icon: Target,
    title: "User Segmentation",
    description: "Show different tours to different users based on behavior, properties, or custom events. Personalize the experience.",
    color: "accent",
  },
  {
    icon: Palette,
    title: "Fully Customizable",
    description: "Match your brand with custom colors, fonts, and positioning options. The widget looks native to your site.",
    color: "primary",
  },
  {
    icon: Bell,
    title: "Smart Triggers",
    description: "Launch tours based on page visits, time on site, scroll depth, or custom JavaScript events.",
    color: "accent",
  },
  {
    icon: Code2,
    title: "Easy Integration",
    description: "Single script tag or npm package. Works with React, Vue, Angular, or vanilla JavaScript.",
    color: "primary",
  },
  {
    icon: Shield,
    title: "Privacy First",
    description: "GDPR compliant. No personal data stored. Full control over what analytics you collect.",
    color: "accent",
  },
  {
    icon: Sparkles,
    title: "AI Suggestions",
    description: "Get intelligent recommendations for tour improvements based on user behavior patterns.",
    color: "primary",
  },
  {
    icon: Globe,
    title: "Multilingual",
    description: "Built-in support for 20+ languages with automatic browser detection.",
    color: "accent",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Under 15KB gzipped. Asynchronous loading. Zero performance impact on your website.",
    color: "primary",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description: "Multiple team members can create and manage tours. Role-based access control included.",
    color: "accent",
  },
];

export default function Features() {
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
              className="max-w-3xl mx-auto text-center"
            >
              <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
                Everything you need for{" "}
                <span className="gradient-text">perfect onboarding</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-10">
                Powerful features that make creating, deploying, and analyzing 
                product tours effortless.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button variant="hero" size="lg" asChild>
                  <Link to="/dashboard">Start Free Trial</Link>
                </Button>
                <Button variant="hero-outline" size="lg" asChild>
                  <Link to="/docs">View Documentation</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  whileHover={{ y: -5 }}
                  className="glass p-6 rounded-2xl group"
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors ${
                    feature.color === "primary" 
                      ? "bg-primary/10 group-hover:bg-primary/20" 
                      : "bg-accent/10 group-hover:bg-accent/20"
                  }`}>
                    <feature.icon className={`w-6 h-6 ${
                      feature.color === "primary" ? "text-primary" : "text-accent"
                    }`} />
                  </div>
                  <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto glass-strong p-8 sm:p-12 rounded-3xl text-center"
            >
              <h2 className="font-heading text-2xl sm:text-3xl font-bold mb-4">
                Ready to transform your onboarding?
              </h2>
              <p className="text-muted-foreground mb-8">
                Join thousands of companies using TourFlow to boost user activation.
              </p>
              <Button variant="hero" size="xl" asChild>
                <Link to="/dashboard">Start Building Free</Link>
              </Button>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
