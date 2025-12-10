import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Check, Star, Zap, Users, Building, CreditCard, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link } from "react-router-dom";

const plans = [
  {
    name: "Starter",
    description: "Perfect for small projects and startups",
    price: "$19",
    billing: "per month",
    popular: false,
    features: [
      "Up to 5,000 tour views/month",
      "Unlimited tours",
      "Basic analytics",
      "Email support",
      "Custom branding",
      "Basic integrations",
    ],
    buttonVariant: "hero-outline" as const,
  },
  {
    name: "Growth",
    description: "For growing teams and businesses",
    price: "$49",
    billing: "per month",
    popular: true,
    features: [
      "Up to 25,000 tour views/month",
      "All Starter features",
      "Advanced analytics",
      "Priority support",
      "A/B testing",
      "User segmentation",
      "API access",
      "Custom triggers",
    ],
    buttonVariant: "hero" as const,
  },
  {
    name: "Enterprise",
    description: "For large organizations with complex needs",
    price: "Custom",
    billing: "contact us",
    popular: false,
    features: [
      "Unlimited tour views",
      "All Growth features",
      "Dedicated success manager",
      "SLA guarantee",
      "Custom integrations",
      "On-premise deployment",
      "Advanced security",
      "Custom training",
    ],
    buttonVariant: "hero-outline" as const,
  },
];

const faqs = [
  {
    question: "Can I switch plans later?",
    answer: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.",
  },
  {
    question: "Is there a free trial?",
    answer: "Yes! All paid plans come with a 14-day free trial. No credit card required.",
  },
  {
    question: "What happens if I exceed my monthly views?",
    answer: "We'll notify you when you're approaching your limit. You can upgrade or purchase additional views.",
  },
  {
    question: "Do you offer annual discounts?",
    answer: "Yes, annual plans come with 20% off. You can switch to annual billing at any time.",
  },
];

const featuresComparison = [
  { name: "Unlimited tours", starter: true, growth: true, enterprise: true },
  { name: "Custom branding", starter: true, growth: true, enterprise: true },
  { name: "Advanced analytics", starter: false, growth: true, enterprise: true },
  { name: "A/B testing", starter: false, growth: true, enterprise: true },
  { name: "User segmentation", starter: false, growth: true, enterprise: true },
  { name: "API access", starter: false, growth: true, enterprise: true },
  { name: "Priority support", starter: false, growth: true, enterprise: true },
  { name: "SLA guarantee", starter: false, growth: false, enterprise: true },
  { name: "Custom integrations", starter: false, growth: false, enterprise: true },
  { name: "On-premise deployment", starter: false, growth: false, enterprise: true },
];

export default function Pricing() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");

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
                <CreditCard className="w-4 h-4 text-primary" />
                <span className="text-sm text-muted-foreground">Pricing</span>
              </div>
              <h1 className="font-heading text-4xl sm:text-5xl font-bold mb-6">
                Simple, transparent{" "}
                <span className="gradient-text">pricing</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-10">
                Choose the perfect plan for your needs. All plans include a 14-day free trial.
              </p>

              {/* Billing Toggle */}
              <div className="inline-flex items-center gap-4 mb-12">
                <span className={`text-sm ${billingCycle === "monthly" ? "text-foreground" : "text-muted-foreground"}`}>
                  Monthly
                </span>
                <button
                  onClick={() => setBillingCycle(billingCycle === "monthly" ? "annual" : "monthly")}
                  className="relative w-14 h-8 rounded-full bg-secondary flex items-center cursor-pointer"
                >
                  <motion.div
                    layout
                    className={`absolute w-6 h-6 rounded-full bg-primary ${
                      billingCycle === "monthly" ? "left-1" : "left-7"
                    }`}
                  />
                </button>
                <span className={`text-sm ${billingCycle === "annual" ? "text-foreground" : "text-muted-foreground"}`}>
                  Annual <span className="text-primary">(Save 20%)</span>
                </span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-3 gap-8 mb-16">
                {plans.map((plan, index) => (
                  <motion.div
                    key={plan.name}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    className={`relative glass p-8 rounded-2xl ${
                      plan.popular ? "border-2 border-primary/50" : ""
                    }`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium">
                          <Star className="w-4 h-4" />
                          Most Popular
                        </div>
                      </div>
                    )}

                    <div className="text-center mb-8">
                      <div className="flex items-center justify-center gap-2 mb-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                          plan.name === "Starter" 
                            ? "bg-primary/10" 
                            : plan.name === "Growth" 
                            ? "bg-accent/10" 
                            : "bg-secondary"
                        }`}>
                          {plan.name === "Starter" && <Users className="w-5 h-5 text-primary" />}
                          {plan.name === "Growth" && <Zap className="w-5 h-5 text-accent" />}
                          {plan.name === "Enterprise" && <Building className="w-5 h-5 text-foreground" />}
                        </div>
                        <h3 className="font-heading text-2xl font-bold text-foreground">
                          {plan.name}
                        </h3>
                      </div>
                      <p className="text-muted-foreground mb-6">{plan.description}</p>
                      
                      <div className="mb-6">
                        <div className="font-heading text-4xl font-bold text-foreground mb-1">
                          {billingCycle === "annual" && plan.name !== "Enterprise" 
                            ? `$${Math.floor(parseInt(plan.price.slice(1)) * 0.8)}`
                            : plan.price
                          }
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {billingCycle === "annual" && plan.name !== "Enterprise" 
                            ? "per month, billed annually"
                            : plan.billing
                          }
                          {billingCycle === "annual" && plan.name !== "Enterprise" && (
                            <div className="text-xs text-primary mt-1">
                              Save ${Math.floor(parseInt(plan.price.slice(1)) * 0.2 * 12)}/year
                            </div>
                          )}
                        </div>
                      </div>

                      <Button variant={plan.buttonVariant} size="lg" className="w-full" asChild>
                        <Link to={plan.name === "Enterprise" ? "/contact" : "/dashboard"}>
                          {plan.name === "Enterprise" ? "Contact Sales" : "Start Free Trial"}
                        </Link>
                      </Button>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-heading font-semibold text-foreground mb-4">What's included:</h4>
                      {plan.features.map((feature) => (
                        <div key={feature} className="flex items-center gap-3">
                          <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                            <Check className="w-3 h-3 text-primary" />
                          </div>
                          <span className="text-sm text-muted-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Feature Comparison */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="glass p-8 rounded-2xl mb-16"
              >
                <h2 className="font-heading text-2xl font-bold text-center mb-8">
                  Compare all features
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-4 px-4 text-foreground font-semibold">Feature</th>
                        <th className="text-center py-4 px-4 text-foreground font-semibold">Starter</th>
                        <th className="text-center py-4 px-4 text-foreground font-semibold">Growth</th>
                        <th className="text-center py-4 px-4 text-foreground font-semibold">Enterprise</th>
                      </tr>
                    </thead>
                    <tbody>
                      {featuresComparison.map((feature, index) => (
                        <tr key={feature.name} className={index % 2 === 0 ? "bg-secondary/30" : ""}>
                          <td className="py-4 px-4 text-muted-foreground">{feature.name}</td>
                          <td className="text-center py-4 px-4">
                            {feature.starter ? (
                              <Check className="w-5 h-5 text-primary mx-auto" />
                            ) : (
                              <span className="text-muted-foreground/50">—</span>
                            )}
                          </td>
                          <td className="text-center py-4 px-4">
                            {feature.growth ? (
                              <Check className="w-5 h-5 text-primary mx-auto" />
                            ) : (
                              <span className="text-muted-foreground/50">—</span>
                            )}
                          </td>
                          <td className="text-center py-4 px-4">
                            {feature.enterprise ? (
                              <Check className="w-5 h-5 text-primary mx-auto" />
                            ) : (
                              <span className="text-muted-foreground/50">—</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>

              {/* FAQ */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="glass p-8 rounded-2xl"
              >
                <div className="flex items-center gap-3 mb-8">
                  <HelpCircle className="w-6 h-6 text-primary" />
                  <h2 className="font-heading text-2xl font-bold text-foreground">
                    Frequently Asked Questions
                  </h2>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                  {faqs.map((faq, index) => (
                    <div key={faq.question}>
                      <h3 className="font-heading font-semibold text-foreground mb-2">
                        {faq.question}
                      </h3>
                      <p className="text-sm text-muted-foreground">{faq.answer}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-8 text-center">
                  <Button variant="ghost" asChild>
                    <Link to="/contact">Still have questions? Contact us</Link>
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