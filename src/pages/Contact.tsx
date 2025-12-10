import { motion } from "framer-motion";
import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, MessageSquare, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const contactMethods = [
  {
    icon: Mail,
    title: "Email",
    description: "For general inquiries and support",
    value: "support@tourflow.app",
    action: "mailto:support@tourflow.app",
  },
  {
    icon: MessageSquare,
    title: "Live Chat",
    description: "Available during business hours",
    value: "Chat now from dashboard",
    action: "/dashboard",
  },
  {
    icon: Phone,
    title: "Phone",
    description: "For urgent matters",
    value: "+1 (555) 123-4567",
    action: "tel:+15551234567",
  },
  {
    icon: Users,
    title: "Community",
    description: "Join our community",
    value: "Slack & Discord",
    action: "https://community.tourflow.app",
  },
];

const supportHours = [
  { day: "Monday - Friday", hours: "9:00 AM - 6:00 PM EST" },
  { day: "Saturday", hours: "10:00 AM - 4:00 PM EST" },
  { day: "Sunday", hours: "Emergency support only" },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

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
                <Mail className="w-4 h-4 text-primary" />
                <span className="text-sm text-muted-foreground">Contact Us</span>
              </div>
              <h1 className="font-heading text-4xl sm:text-5xl font-bold mb-6">
                Get in <span className="gradient-text">touch</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                We're here to help! Whether you have questions about features, need technical 
                support, or want to discuss enterprise pricing, our team is ready to assist.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              {/* Contact Methods */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
              >
                {contactMethods.map((method, index) => (
                  <motion.a
                    key={method.title}
                    href={method.action}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="glass p-6 rounded-2xl hover:bg-card/80 transition-all duration-300 group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                      <method.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                      {method.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {method.description}
                    </p>
                    <div className="font-medium text-foreground">
                      {method.value}
                    </div>
                  </motion.a>
                ))}
              </motion.div>

              <div className="grid lg:grid-cols-3 gap-12">
                {/* Contact Form */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="lg:col-span-2"
                >
                  <div className="glass p-8 rounded-2xl">
                    <div className="flex items-center gap-3 mb-8">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Send className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h2 className="font-heading text-2xl font-bold text-foreground">
                          Send us a message
                        </h2>
                        <p className="text-muted-foreground">
                          We typically respond within 24 hours
                        </p>
                      </div>
                    </div>

                    {isSubmitted ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-12"
                      >
                        <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
                          <CheckCircle className="w-8 h-8 text-primary" />
                        </div>
                        <h3 className="font-heading text-xl font-bold text-foreground mb-2">
                          Message Sent!
                        </h3>
                        <p className="text-muted-foreground">
                          Thank you for reaching out. We'll get back to you shortly.
                        </p>
                      </motion.div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="name" className="text-foreground">
                              Your Name
                            </Label>
                            <Input
                              id="name"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              placeholder="John Doe"
                              required
                              className="glass"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email" className="text-foreground">
                              Email Address
                            </Label>
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              value={formData.email}
                              onChange={handleChange}
                              placeholder="john@example.com"
                              required
                              className="glass"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="subject" className="text-foreground">
                            Subject
                          </Label>
                          <Input
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            placeholder="How can we help?"
                            required
                            className="glass"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="message" className="text-foreground">
                            Message
                          </Label>
                          <Textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="Tell us about your project or question..."
                            rows={6}
                            required
                            className="glass resize-none"
                          />
                        </div>
                        <Button
                          type="submit"
                          variant="hero"
                          size="lg"
                          className="w-full"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <>
                              <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                              Sending...
                            </>
                          ) : (
                            <>
                              <Send className="w-5 h-5" />
                              Send Message
                            </>
                          )}
                        </Button>
                      </form>
                    )}
                  </div>
                </motion.div>

                {/* Info Sidebar */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="space-y-8"
                >
                  {/* Office Hours */}
                  <div className="glass p-6 rounded-2xl">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Clock className="w-5 h-5 text-primary" />
                      </div>
                      <h3 className="font-heading font-semibold text-lg text-foreground">
                        Support Hours
                      </h3>
                    </div>
                    <div className="space-y-4">
                      {supportHours.map((schedule) => (
                        <div
                          key={schedule.day}
                          className="flex justify-between items-center py-2 border-b border-border/50 last:border-0"
                        >
                          <span className="text-sm text-foreground">{schedule.day}</span>
                          <span className="text-sm text-muted-foreground">{schedule.hours}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Office Location */}
                  <div className="glass p-6 rounded-2xl">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-primary" />
                      </div>
                      <h3 className="font-heading font-semibold text-lg text-foreground">
                        Our Office
                      </h3>
                    </div>
                    <div className="space-y-3">
                      <p className="text-sm text-muted-foreground">
                        123 Tech Street<br />
                        San Francisco, CA 94107<br />
                        United States
                      </p>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full"
                        asChild
                      >
                        <a
                          href="https://maps.google.com/?q=123+Tech+Street+San+Francisco+CA+94107"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Get Directions
                        </a>
                      </Button>
                    </div>
                  </div>

                  {/* Emergency Contact */}
                  <div className="glass p-6 rounded-2xl bg-secondary/20">
                    <h3 className="font-heading font-semibold text-lg text-foreground mb-3">
                      Urgent Issues?
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      For critical system issues affecting your production environment.
                    </p>
                    <Button variant="hero-outline" size="sm" className="w-full" asChild>
                      <a href="tel:+15551234567">
                        <Phone className="w-4 h-4" />
                        Emergency Support
                      </a>
                    </Button>
                  </div>
                </motion.div>
              </div>

              {/* FAQ Preview */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mt-16 text-center"
              >
                <h2 className="font-heading text-2xl font-bold mb-4">
                  Common Questions
                </h2>
                <p className="text-muted-foreground mb-8">
                  Check our documentation for answers to frequently asked questions.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button variant="hero-outline" asChild>
                    <a href="/docs">View Documentation</a>
                  </Button>
                  <Button variant="ghost" asChild>
                    <a href="/security">Security Questions</a>
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