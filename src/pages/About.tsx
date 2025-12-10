import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Sparkles, Target, Heart, Zap } from "lucide-react";

const values = [
  {
    icon: Target,
    title: "User-First Design",
    description: "Every feature we build starts with the end user in mind. We believe great onboarding should feel invisible.",
  },
  {
    icon: Zap,
    title: "Performance Obsessed",
    description: "Our widget is under 15KB and loads in milliseconds. We'll never slow down your website.",
  },
  {
    icon: Heart,
    title: "Developer Experience",
    description: "Clean APIs, comprehensive docs, and responsive support. We make integration a joy, not a chore.",
  },
];

const team = [
  { name: "Alex Chen", role: "CEO & Co-founder", avatar: "AC" },
  { name: "Sarah Kim", role: "CTO & Co-founder", avatar: "SK" },
  { name: "Marcus Johnson", role: "Head of Product", avatar: "MJ" },
  { name: "Emily Zhang", role: "Lead Engineer", avatar: "EZ" },
];

export default function About() {
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
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm text-muted-foreground">Our Story</span>
              </div>
              <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
                Making onboarding{" "}
                <span className="gradient-text">delightful</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                We started TourFlow because we were frustrated with clunky, 
                slow, and ugly onboarding tools. We knew there had to be a better way.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Story */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="font-heading text-3xl font-bold mb-6">
                  Born from frustration
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    In 2023, our founding team was building a SaaS product and struggling 
                    with user activation. Every onboarding tool we tried was either too 
                    complex, too slow, or too ugly.
                  </p>
                  <p>
                    So we built our own. What started as an internal tool quickly became 
                    the product our users asked about most.
                  </p>
                  <p>
                    Today, TourFlow powers onboarding experiences for thousands of 
                    companies, from startups to enterprises.
                  </p>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="glass p-8 rounded-2xl"
              >
                <div className="grid grid-cols-2 gap-6 text-center">
                  <div>
                    <div className="font-heading text-4xl font-bold text-primary mb-2">10K+</div>
                    <div className="text-sm text-muted-foreground">Active Users</div>
                  </div>
                  <div>
                    <div className="font-heading text-4xl font-bold text-primary mb-2">2M+</div>
                    <div className="text-sm text-muted-foreground">Tours Completed</div>
                  </div>
                  <div>
                    <div className="font-heading text-4xl font-bold text-primary mb-2">99.9%</div>
                    <div className="text-sm text-muted-foreground">Uptime</div>
                  </div>
                  <div>
                    <div className="font-heading text-4xl font-bold text-primary mb-2">50+</div>
                    <div className="text-sm text-muted-foreground">Countries</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 bg-secondary/20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="font-heading text-3xl font-bold mb-4">Our Values</h2>
              <p className="text-muted-foreground">What guides everything we do.</p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="glass p-6 rounded-2xl text-center"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                    {value.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="font-heading text-3xl font-bold mb-4">Meet the Team</h2>
              <p className="text-muted-foreground">The people behind TourFlow.</p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
              {team.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                    <span className="font-heading font-bold text-xl text-primary">
                      {member.avatar}
                    </span>
                  </div>
                  <h3 className="font-semibold text-foreground">{member.name}</h3>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
