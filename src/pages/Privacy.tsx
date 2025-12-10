import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Shield, Lock, Eye, FileText, Mail, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const sections = [
  {
    id: "data-collection",
    title: "Data Collection & Use",
    icon: Eye,
    description: "What information we collect and how we use it",
  },
  {
    id: "data-protection",
    title: "Data Protection",
    icon: Lock,
    description: "How we secure your information",
  },
  {
    id: "your-rights",
    title: "Your Rights",
    icon: Shield,
    description: "Control over your personal data",
  },
  {
    id: "compliance",
    title: "Compliance",
    icon: Globe,
    description: "GDPR, CCPA, and international standards",
  },
];

export default function Privacy() {
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
                <span className="text-sm text-muted-foreground">Privacy Policy</span>
              </div>
              <h1 className="font-heading text-4xl sm:text-5xl font-bold mb-6">
                Your privacy is our{" "}
                <span className="gradient-text">priority</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                We believe in transparency and giving you control over your data. 
                This policy explains what we collect, why we collect it, and how we protect it.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button variant="hero-outline" size="lg" asChild>
                  <Link to="#quick-summary">Quick Summary</Link>
                </Button>
                <Button variant="ghost" size="lg" asChild>
                  <Link to="/contact">Contact DPO</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Quick Summary */}
        <section id="quick-summary" className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-5xl mx-auto"
            >
              <div className="glass p-8 rounded-2xl mb-12">
                <h2 className="font-heading text-2xl font-bold mb-6">Quick Summary</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-4 bg-secondary/30 rounded-xl">
                    <h3 className="font-heading font-semibold text-foreground mb-2">We Collect</h3>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Email for signup</li>
                      <li>• Tour usage data</li>
                      <li>• Anonymous analytics</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-secondary/30 rounded-xl">
                    <h3 className="font-heading font-semibold text-foreground mb-2">We Don't Collect</h3>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Personal user data</li>
                      <li>• Passwords (OAuth only)</li>
                      <li>• Payment details</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-secondary/30 rounded-xl">
                    <h3 className="font-heading font-semibold text-foreground mb-2">You Can</h3>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Export your data</li>
                      <li>• Delete your account</li>
                      <li>• Opt-out of analytics</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
                {sections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="glass p-4 rounded-xl hover:bg-card/80 transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                      <section.icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-heading font-semibold text-foreground mb-1">
                      {section.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {section.description}
                    </p>
                  </a>
                ))}
              </div>

              {/* Full Policy */}
              <div className="space-y-12">
                {sections.map((section, index) => (
                  <motion.section
                    key={section.id}
                    id={section.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="glass p-8 rounded-2xl"
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                        <section.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h2 className="font-heading text-2xl font-bold text-foreground">
                          {section.title}
                        </h2>
                        <p className="text-muted-foreground">{section.description}</p>
                      </div>
                    </div>

                    {section.id === "data-collection" && (
                      <div className="space-y-4 text-muted-foreground">
                        <p>
                          <strong className="text-foreground">Account Information:</strong> When you sign up for TourFlow, we collect your email address and name to create your account. We use this information to provide the service, communicate with you, and ensure account security.
                        </p>
                        <p>
                          <strong className="text-foreground">Tour Data:</strong> We store the tours you create, including their steps, content, and configuration. This data is necessary to provide the core functionality of our service.
                        </p>
                        <p>
                          <strong className="text-foreground">Analytics Data:</strong> We collect anonymous usage statistics about how tours are interacted with (completion rates, drop-off points, etc.). This data helps us improve our product but cannot be used to identify individual users.
                        </p>
                      </div>
                    )}

                    {section.id === "data-protection" && (
                      <div className="space-y-4 text-muted-foreground">
                        <p>
                          <strong className="text-foreground">Encryption:</strong> All data is encrypted in transit using TLS 1.3 and at rest using AES-256 encryption. Our infrastructure is hosted on SOC 2 Type II compliant platforms.
                        </p>
                        <p>
                          <strong className="text-foreground">Access Control:</strong> We implement strict access controls and regular security audits. Only authorized personnel have access to production systems, and all access is logged and monitored.
                        </p>
                        <p>
                          <strong className="text-foreground">Third-Party Services:</strong> We use a limited number of subprocessors that have been vetted for security and compliance. We maintain Data Processing Agreements (DPAs) with all subprocessors.
                        </p>
                      </div>
                    )}

                    {section.id === "your-rights" && (
                      <div className="space-y-4 text-muted-foreground">
                        <p>
                          <strong className="text-foreground">Right to Access:</strong> You can request a copy of all personal data we hold about you at any time through your account settings or by contacting us.
                        </p>
                        <p>
                          <strong className="text-foreground">Right to Deletion:</strong> You can delete your account and all associated data at any time. Deleted data is permanently removed from our systems within 30 days.
                        </p>
                        <p>
                          <strong className="text-foreground">Right to Object:</strong> You can opt out of non-essential data processing, such as marketing communications or analytics collection.
                        </p>
                        <p>
                          <strong className="text-foreground">Data Portability:</strong> You can export all your tour data in JSON format from your dashboard at any time.
                        </p>
                      </div>
                    )}

                    {section.id === "compliance" && (
                      <div className="space-y-4 text-muted-foreground">
                        <p>
                          <strong className="text-foreground">GDPR:</strong> We comply with the General Data Protection Regulation (GDPR) for all users in the European Union. We act as a data processor for our customers and provide tools to help them comply with their obligations as data controllers.
                        </p>
                        <p>
                          <strong className="text-foreground">CCPA/CPRA:</strong> We comply with the California Consumer Privacy Act (CCPA) and California Privacy Rights Act (CPRA), providing California residents with specific rights regarding their personal information.
                        </p>
                        <p>
                          <strong className="text-foreground">International Transfers:</strong> Data may be transferred to and processed in countries outside your country of residence. We ensure such transfers are compliant with applicable laws through Standard Contractual Clauses or other adequate safeguards.
                        </p>
                      </div>
                    )}
                  </motion.section>
                ))}
              </div>

              {/* Contact Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mt-12 glass p-8 rounded-2xl text-center"
              >
                <FileText className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-heading text-xl font-bold mb-3">Questions about our Privacy Policy?</h3>
                <p className="text-muted-foreground mb-6">
                  Our Data Protection Officer is here to help with any questions or concerns.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button variant="hero" asChild>
                    <Link to="/contact">
                      <Mail className="w-4 h-4" />
                      Contact DPO
                    </Link>
                  </Button>
                  <Button variant="hero-outline" asChild>
                    <Link to="/security">
                      <Shield className="w-4 h-4" />
                      Security Details
                    </Link>
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