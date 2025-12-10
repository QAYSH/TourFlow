import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Shield, Lock, Key, Server, EyeOff, Clock, FileCheck, Users, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const securityFeatures = [
  {
    icon: Lock,
    title: "End-to-End Encryption",
    description: "All data encrypted in transit and at rest with AES-256",
  },
  {
    icon: Server,
    title: "SOC 2 Type II Compliant",
    description: "Annual independent audits of our security controls",
  },
  {
    icon: Key,
    title: "Zero-Trust Architecture",
    description: "Strict access controls with multi-factor authentication",
  },
  {
    icon: EyeOff,
    title: "Data Minimization",
    description: "We only collect what's necessary to provide the service",
  },
  {
    icon: FileCheck,
    title: "GDPR & CCPA Ready",
    description: "Built-in tools for data subject requests and compliance",
  },
  {
    icon: Clock,
    title: "99.9% Uptime SLA",
    description: "Redundant infrastructure with automatic failover",
  },
];

const complianceBadges = [
  { name: "SOC 2 Type II", status: "Compliant", color: "primary" },
  { name: "GDPR", status: "Compliant", color: "accent" },
  { name: "CCPA/CPRA", status: "Compliant", color: "primary" },
  { name: "ISO 27001", status: "In Progress", color: "accent" },
];

export default function Security() {
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
                <Shield className="w-4 h-4 text-primary" />
                <span className="text-sm text-muted-foreground">Security</span>
              </div>
              <h1 className="font-heading text-4xl sm:text-5xl font-bold mb-6">
                Enterprise-grade{" "}
                <span className="gradient-text">security</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                We take security seriously. Our infrastructure is designed with multiple 
                layers of protection to keep your data safe and secure.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button variant="hero" size="lg" asChild>
                  <Link to="/contact">Request Security Report</Link>
                </Button>
                <Button variant="hero-outline" size="lg" asChild>
                  <Link to="/privacy">View Privacy Policy</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 bg-secondary/20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-6"
              >
                <div className="glass p-6 rounded-2xl text-center">
                  <div className="font-heading text-3xl font-bold text-primary mb-2">
                    256-bit
                  </div>
                  <div className="text-sm text-muted-foreground">Encryption</div>
                </div>
                <div className="glass p-6 rounded-2xl text-center">
                  <div className="font-heading text-3xl font-bold text-primary mb-2">
                    99.9%
                  </div>
                  <div className="text-sm text-muted-foreground">Uptime SLA</div>
                </div>
                <div className="glass p-6 rounded-2xl text-center">
                  <div className="font-heading text-3xl font-bold text-primary mb-2">
                    24/7
                  </div>
                  <div className="text-sm text-muted-foreground">Monitoring</div>
                </div>
                <div className="glass p-6 rounded-2xl text-center">
                  <div className="font-heading text-3xl font-bold text-primary mb-2">
                    0
                  </div>
                  <div className="text-sm text-muted-foreground">Security Incidents</div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Security Features */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-6xl mx-auto"
            >
              <div className="text-center mb-12">
                <h2 className="font-heading text-3xl font-bold mb-4">Security Features</h2>
                <p className="text-muted-foreground">
                  Multiple layers of protection for your data
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                {securityFeatures.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="glass p-6 rounded-2xl group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                      <feature.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* Compliance Section */}
              <div className="glass p-8 rounded-2xl mb-12">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Globe className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="font-heading text-2xl font-bold text-foreground">
                      Compliance & Certifications
                    </h2>
                    <p className="text-muted-foreground">
                      Meeting the highest industry standards
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                  {complianceBadges.map((badge) => (
                    <div
                      key={badge.name}
                      className="p-4 rounded-xl bg-secondary/30 text-center"
                    >
                      <div className="font-heading font-semibold text-foreground mb-1">
                        {badge.name}
                      </div>
                      <div className={`text-sm ${
                        badge.color === "primary" ? "text-primary" : "text-accent"
                      }`}>
                        {badge.status}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-4 text-muted-foreground">
                  <p>
                    We undergo regular independent security audits and maintain comprehensive 
                    documentation of our security practices. Our security team continuously 
                    monitors for threats and vulnerabilities.
                  </p>
                  <p>
                    For enterprise customers, we provide detailed security reports, 
                    penetration test results, and custom security questionnaires.
                  </p>
                </div>
              </div>

              {/* Data Center Info */}
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="glass p-8 rounded-2xl"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <Server className="w-6 h-6 text-primary" />
                    <h3 className="font-heading font-semibold text-lg text-foreground">
                      Infrastructure
                    </h3>
                  </div>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                      <span>Hosted on AWS with multiple availability zones</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                      <span>Automatic daily backups with 30-day retention</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                      <span>DDoS protection and WAF enabled</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                      <span>Real-time intrusion detection systems</span>
                    </li>
                  </ul>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="glass p-8 rounded-2xl"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <Users className="w-6 h-6 text-primary" />
                    <h3 className="font-heading font-semibold text-lg text-foreground">
                      People & Processes
                    </h3>
                  </div>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                      <span>Regular security training for all employees</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                      <span>Strict access controls with role-based permissions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                      <span>24/7 security monitoring and incident response</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                      <span>Bug bounty program for external researchers</span>
                    </li>
                  </ul>
                </motion.div>
              </div>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="glass p-8 rounded-2xl text-center"
              >
                <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-heading text-xl font-bold mb-3">
                  Need more details?
                </h3>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  For enterprise customers or detailed security inquiries, 
                  contact our security team for comprehensive documentation 
                  and custom security questionnaires.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button variant="hero" asChild>
                    <Link to="/contact">Contact Security Team</Link>
                  </Button>
                  <Button variant="hero-outline" asChild>
                    <Link to="/terms">View Terms of Service</Link>
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}