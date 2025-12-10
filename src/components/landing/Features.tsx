import { motion } from "framer-motion";
import { 
  Layers, 
  Zap, 
  BarChart3, 
  Code2, 
  Palette, 
  Shield,
  Sparkles,
  Globe
} from "lucide-react";

const features = [
  {
    icon: Layers,
    title: "Multi-Step Tours",
    description: "Create comprehensive tours with unlimited steps, branching logic, and conditional flows.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Lightweight widget under 15KB. No performance impact on your website.",
  },
  {
    icon: BarChart3,
    title: "Rich Analytics",
    description: "Track completion rates, drop-offs, and user engagement in real-time.",
  },
  {
    icon: Code2,
    title: "Easy Integration",
    description: "Single script tag. Works with React, Vue, Angular, or vanilla JavaScript.",
  },
  {
    icon: Palette,
    title: "Fully Customizable",
    description: "Match your brand with custom colors, fonts, and positioning options.",
  },
  {
    icon: Shield,
    title: "Privacy First",
    description: "GDPR compliant. No personal data stored. Full control over analytics.",
  },
  {
    icon: Sparkles,
    title: "AI Suggestions",
    description: "Get intelligent recommendations for tour improvements based on user behavior.",
  },
  {
    icon: Globe,
    title: "Multilingual",
    description: "Built-in support for 20+ languages with automatic detection.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export function Features() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            Everything you need to{" "}
            <span className="gradient-text">onboard users</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Build engaging product tours in minutes, not hours. No coding required.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="group"
            >
              <div className="h-full p-6 rounded-2xl glass hover:bg-card/80 transition-all duration-300 card-shadow">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
