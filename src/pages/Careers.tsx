import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { 
  Users, 
  Heart, 
  Zap, 
  Globe, 
  DollarSign, 
  Briefcase,
  Calendar,
  MapPin,
  Clock,
  Award,
  Coffee,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const benefits = [
  {
    icon: DollarSign,
    title: "Competitive Salary",
    description: "Industry-leading compensation with equity options",
  },
  {
    icon: Calendar,
    title: "Flexible Time Off",
    description: "Unlimited PTO with minimum vacation policy",
  },
  {
    icon: Globe,
    title: "Remote First",
    description: "Work from anywhere in your timezone",
  },
  {
    icon: Heart,
    title: "Health & Wellness",
    description: "Comprehensive medical, dental, and vision",
  },
  {
    icon: Award,
    title: "Learning Budget",
    description: "$3,000 annual budget for courses and conferences",
  },
  {
    icon: Coffee,
    title: "Home Office Stipend",
    description: "$2,000 to set up your perfect workspace",
  },
  {
    icon: Clock,
    title: "Flexible Hours",
    description: "Work when you're most productive",
  },
  {
    icon: Sparkles,
    title: "Growth Opportunities",
    description: "Clear promotion paths and mentorship",
  },
];

const openPositions = [
  {
    title: "Senior Frontend Engineer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    description: "Build beautiful, responsive UIs for our dashboard and widget.",
  },
  {
    title: "Product Designer",
    department: "Design",
    location: "Remote",
    type: "Full-time",
    description: "Design intuitive experiences for our onboarding platform.",
  },
  {
    title: "Developer Advocate",
    department: "Marketing",
    location: "Remote",
    type: "Full-time",
    description: "Create amazing content and build developer relationships.",
  },
  {
    title: "Customer Success Manager",
    department: "Customer Success",
    location: "Remote",
    type: "Full-time",
    description: "Help customers get the most value from TourFlow.",
  },
  {
    title: "Backend Engineer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    description: "Scale our infrastructure and API for millions of users.",
  },
  {
    title: "Sales Engineer",
    department: "Sales",
    location: "Remote",
    type: "Full-time",
    description: "Work with enterprise customers on technical solutions.",
  },
];

const values = [
  {
    icon: Users,
    title: "Customer Obsessed",
    description: "We exist to make our customers successful.",
    color: "primary",
  },
  {
    icon: Heart,
    title: "Empathy First",
    description: "We treat everyone with kindness and respect.",
    color: "accent",
  },
  {
    icon: Zap,
    title: "Bias for Action",
    description: "We move fast and ship quality work.",
    color: "primary",
  },
  {
    icon: Globe,
    title: "Think Global",
    description: "We build for a diverse, worldwide audience.",
    color: "accent",
  },
];

export default function Careers() {
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
                <Briefcase className="w-4 h-4 text-primary" />
                <span className="text-sm text-muted-foreground">Careers</span>
              </div>
              <h1 className="font-heading text-4xl sm:text-5xl font-bold mb-6">
                Build the future of{" "}
                <span className="gradient-text">onboarding</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-10">
                Join our mission to make product adoption delightful for everyone. 
                We're building tools that help thousands of companies onboard millions of users.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button variant="hero" size="lg" asChild>
                  <Link to="#open-positions">View Open Positions</Link>
                </Button>
                <Button variant="hero-outline" size="lg" asChild>
                  <Link to="/about">Learn About Us</Link>
                </Button>
              </div>
            </motion.div>
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
              <p className="text-muted-foreground">What drives us every day</p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="glass p-6 rounded-2xl text-center"
                >
                  <div className={`w-12 h-12 rounded-xl ${
                    value.color === "primary" ? "bg-primary/10" : "bg-accent/10"
                  } flex items-center justify-center mx-auto mb-4`}>
                    <value.icon className={`w-6 h-6 ${
                      value.color === "primary" ? "text-primary" : "text-accent"
                    }`} />
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

        {/* Benefits */}
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
                <h2 className="font-heading text-3xl font-bold mb-4">Perks & Benefits</h2>
                <p className="text-muted-foreground">
                  We take care of our team so they can do their best work
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="glass p-6 rounded-2xl group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                      <benefit.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {benefit.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Open Positions */}
        <section id="open-positions" className="py-16 bg-secondary/20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-6xl mx-auto"
            >
              <div className="text-center mb-12">
                <h2 className="font-heading text-3xl font-bold mb-4">Open Positions</h2>
                <p className="text-muted-foreground">
                  Join our team and help shape the future of TourFlow
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-12">
                {openPositions.map((position, index) => (
                  <motion.div
                    key={position.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="glass p-6 rounded-2xl hover:bg-card/80 transition-all duration-300 group"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                          {position.title}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                          <span className="flex items-center gap-1">
                            <Briefcase className="w-4 h-4" />
                            {position.department}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {position.location}
                          </span>
                        </div>
                      </div>
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
                        <Clock className="w-3 h-3" />
                        {position.type}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-6">
                      {position.description}
                    </p>
                    <Button variant="hero-outline" className="w-full" asChild>
                      <Link to={`/careers/apply?position=${encodeURIComponent(position.title)}`}>
                        Apply Now
                      </Link>
                    </Button>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="glass p-8 rounded-2xl text-center"
              >
                <h3 className="font-heading text-xl font-bold mb-3">Don't see your role?</h3>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  We're always looking for talented people. Send us your resume and tell us 
                  how you'd like to contribute to TourFlow.
                </p>
                <Button variant="hero" asChild>
                  <Link to="/contact">Send Open Application</Link>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Hiring Process */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto"
            >
              <div className="text-center mb-12">
                <h2 className="font-heading text-3xl font-bold mb-4">Our Hiring Process</h2>
                <p className="text-muted-foreground">
                  Transparent and respectful from start to finish
                </p>
              </div>

              <div className="glass p-8 rounded-2xl">
                <div className="grid md:grid-cols-4 gap-8 text-center">
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <span className="font-heading font-bold text-xl text-primary">1</span>
                    </div>
                    <h3 className="font-heading font-semibold text-foreground mb-2">
                      Initial Chat
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      30-minute call with our hiring team
                    </p>
                  </div>
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <span className="font-heading font-bold text-xl text-primary">2</span>
                    </div>
                    <h3 className="font-heading font-semibold text-foreground mb-2">
                      Skills Assessment
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Practical take-home assignment
                    </p>
                  </div>
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <span className="font-heading font-bold text-xl text-primary">3</span>
                    </div>
                    <h3 className="font-heading font-semibold text-foreground mb-2">
                      Team Interviews
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Meet the team you'll work with
                    </p>
                  </div>
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <span className="font-heading font-bold text-xl text-primary">4</span>
                    </div>
                    <h3 className="font-heading font-semibold text-foreground mb-2">
                      Final Decision
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Offer extended within 48 hours
                    </p>
                  </div>
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