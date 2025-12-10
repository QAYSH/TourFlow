import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FileText, Scale, BookOpen, AlertTriangle, CheckCircle, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const tocItems = [
  { id: "acceptance", title: "Acceptance of Terms", icon: CheckCircle },
  { id: "service", title: "Description of Service", icon: BookOpen },
  { id: "account", title: "Account Terms", icon: UserCheck },
  { id: "payment", title: "Payment & Billing", icon: Scale },
  { id: "prohibited", title: "Prohibited Uses", icon: AlertTriangle },
  { id: "termination", title: "Termination", icon: FileText },
];

export default function Terms() {
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
                <Scale className="w-4 h-4 text-primary" />
                <span className="text-sm text-muted-foreground">Terms of Service</span>
              </div>
              <h1 className="font-heading text-4xl sm:text-5xl font-bold mb-6">
                Terms of <span className="gradient-text">Service</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
              <div className="mt-10">
                <Button variant="hero-outline" size="lg" asChild>
                  <Link to="#summary">Quick Summary</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              {/* Table of Contents */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="glass p-8 rounded-2xl mb-12"
              >
                <h2 className="font-heading text-2xl font-bold mb-6">Table of Contents</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {tocItems.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className="flex items-center gap-3 p-4 rounded-xl hover:bg-secondary/50 transition-colors group"
                    >
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <item.icon className="w-5 h-5 text-primary" />
                      </div>
                      <span className="font-medium text-foreground">{item.title}</span>
                    </a>
                  ))}
                </div>
              </motion.div>

              {/* Quick Summary */}
              <motion.div
                id="summary"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="glass p-8 rounded-2xl mb-12"
              >
                <h2 className="font-heading text-2xl font-bold mb-6">Key Points</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-foreground mb-1">Free Trial</h4>
                        <p className="text-sm text-muted-foreground">14-day free trial, no credit card required</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-foreground mb-1">Monthly Billing</h4>
                        <p className="text-sm text-muted-foreground">Cancel anytime, no long-term contracts</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-foreground mb-1">Data Ownership</h4>
                        <p className="text-sm text-muted-foreground">You own 100% of your data and content</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-foreground mb-1">Service Uptime</h4>
                        <p className="text-sm text-muted-foreground">99.9% uptime SLA for paid plans</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-foreground mb-1">Support</h4>
                        <p className="text-sm text-muted-foreground">Email support with 24-hour response time</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-foreground mb-1">API Usage</h4>
                        <p className="text-sm text-muted-foreground">Fair use policy, no rate limits for standard plans</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Full Terms */}
              <div className="space-y-12">
                {tocItems.map((item, index) => (
                  <motion.section
                    key={item.id}
                    id={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="glass p-8 rounded-2xl"
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                        <item.icon className="w-6 h-6 text-primary" />
                      </div>
                      <h2 className="font-heading text-2xl font-bold text-foreground">
                        {item.title}
                      </h2>
                    </div>

                    {item.id === "acceptance" && (
                      <div className="space-y-4 text-muted-foreground">
                        <p>
                          By accessing or using TourFlow ("Service"), you agree to be bound by these Terms of Service ("Terms"). If you disagree with any part of the terms, you may not access the Service.
                        </p>
                        <p>
                          These Terms apply to all visitors, users, and others who access or use the Service. Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms.
                        </p>
                        <p>
                          We reserve the right to modify these Terms at any time. We will provide notice of any material changes by posting the new Terms on this page and updating the "Last updated" date. Your continued use of the Service after any such changes constitutes your acceptance of the new Terms.
                        </p>
                      </div>
                    )}

                    {item.id === "service" && (
                      <div className="space-y-4 text-muted-foreground">
                        <p>
                          TourFlow is a software-as-a-service platform that enables users to create, manage, and deploy interactive product tours and onboarding experiences on websites and web applications.
                        </p>
                        <p>
                          The Service includes access to our web dashboard, API, documentation, and support services as described in your selected plan. We continuously improve our Service and may add, modify, or remove features at our discretion.
                        </p>
                        <p>
                          You are responsible for obtaining the necessary hardware, software, and internet connection required to access the Service. We do not guarantee that the Service will be available at all times or be free from errors.
                        </p>
                      </div>
                    )}

                    {item.id === "account" && (
                      <div className="space-y-4 text-muted-foreground">
                        <p>
                          <strong className="text-foreground">Account Creation:</strong> To use the Service, you must create an account by providing your email address and creating a password, or by using a third-party authentication service. You must provide accurate and complete information.
                        </p>
                        <p>
                          <strong className="text-foreground">Account Security:</strong> You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.
                        </p>
                        <p>
                          <strong className="text-foreground">Account Eligibility:</strong> You must be at least 16 years old to use the Service. If you are using the Service on behalf of an organization, you represent that you have the authority to bind that organization to these Terms.
                        </p>
                        <p>
                          <strong className="text-foreground">Multiple Accounts:</strong> You may create multiple accounts for different projects or teams. Each account is subject to these Terms and the limitations of its selected plan.
                        </p>
                      </div>
                    )}

                    {item.id === "payment" && (
                      <div className="space-y-4 text-muted-foreground">
                        <p>
                          <strong className="text-foreground">Free Trial:</strong> We offer a 14-day free trial with full access to all features. No credit card is required during the trial period.
                        </p>
                        <p>
                          <strong className="text-foreground">Billing:</strong> After the trial period, you must select a paid plan to continue using the Service. All fees are payable in advance and are non-refundable, except as required by law.
                        </p>
                        <p>
                          <strong className="text-foreground">Price Changes:</strong> We may change our prices at any time. Price changes will not affect existing subscriptions until the start of the next billing cycle. We will provide at least 30 days' notice for any price changes.
                        </p>
                        <p>
                          <strong className="text-foreground">Taxes:</strong> All fees are exclusive of taxes, levies, or duties imposed by taxing authorities. You are responsible for payment of all such taxes.
                        </p>
                      </div>
                    )}

                    {item.id === "prohibited" && (
                      <div className="space-y-4 text-muted-foreground">
                        <p>You agree not to use the Service to:</p>
                        <ul className="list-disc pl-5 space-y-2">
                          <li>Violate any laws, regulations, or third-party rights</li>
                          <li>Distribute malware, viruses, or other harmful code</li>
                          <li>Send spam or unsolicited messages</li>
                          <li>Attempt to gain unauthorized access to any part of the Service</li>
                          <li>Interfere with or disrupt the integrity or performance of the Service</li>
                          <li>Use the Service to create tours that are deceptive, fraudulent, or misleading</li>
                          <li>Reverse engineer, decompile, or disassemble any part of the Service</li>
                          <li>Use the Service for any illegal or unauthorized purpose</li>
                        </ul>
                        <p>
                          We reserve the right to investigate and prosecute violations of these prohibitions to the fullest extent of the law.
                        </p>
                      </div>
                    )}

                    {item.id === "termination" && (
                      <div className="space-y-4 text-muted-foreground">
                        <p>
                          <strong className="text-foreground">By You:</strong> You may terminate your account at any time by accessing your account settings or contacting our support team. Upon termination, you will lose access to the Service.
                        </p>
                        <p>
                          <strong className="text-foreground">By Us:</strong> We may suspend or terminate your access to the Service immediately, without prior notice or liability, for any reason, including if you breach these Terms.
                        </p>
                        <p>
                          <strong className="text-foreground">Data Retention:</strong> After termination, we will retain your data for 30 days to allow for recovery. You may request immediate deletion of your data by contacting support. After 30 days, your data will be permanently deleted from our systems.
                        </p>
                        <p>
                          <strong className="text-foreground">Survival:</strong> All provisions of these Terms which by their nature should survive termination shall survive termination, including ownership provisions, warranty disclaimers, indemnity, and limitations of liability.
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
                <h3 className="font-heading text-xl font-bold mb-3">Have Questions?</h3>
                <p className="text-muted-foreground mb-6">
                  If you have any questions about these Terms, please contact us.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button variant="hero" asChild>
                    <Link to="/contact">Contact Support</Link>
                  </Button>
                  <Button variant="hero-outline" asChild>
                    <Link to="/privacy">View Privacy Policy</Link>
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}