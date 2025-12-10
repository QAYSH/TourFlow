import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function CTA() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="relative rounded-3xl overflow-hidden">
            {/* Gradient Border */}
            <div className="absolute inset-0 gradient-border rounded-3xl" />
            
            <div className="relative glass-strong p-8 sm:p-12 lg:p-16 text-center">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center mx-auto mb-8"
              >
                <Sparkles className="w-8 h-8 text-primary" />
              </motion.div>

              <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
                Ready to transform your{" "}
                <span className="gradient-text">user experience?</span>
              </h2>

              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
                Join thousands of companies using TourFlow to onboard users faster, 
                reduce support tickets, and increase activation rates.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button variant="hero" size="xl" asChild>
                  <Link to="/dashboard/Dashboard.tsx">
                    Start Free Trial
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
                <Button variant="hero-outline" size="xl" asChild>
                  <Link to="/docs">
                    Read Documentation
                  </Link>
                </Button>
              </div>

              <p className="mt-6 text-sm text-muted-foreground">
                No credit card required • Free forever for small teams
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
