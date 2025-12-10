import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Copy, Check, Terminal, Code2, Zap, Settings } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const codeExamples = {
  basic: `<!-- Add this script to your website -->
<script src="https://cdn.tourflow.app/widget.js"></script>
<script>
  TourFlow.init({
    tourId: 'your-tour-id',
    userId: 'optional-user-id'
  });
</script>`,
  react: `import { TourFlow } from '@tourflow/react';

function App() {
  return (
    <TourFlow
      tourId="your-tour-id"
      onComplete={() => console.log('Tour completed!')}
      onSkip={(step) => console.log('Skipped at step:', step)}
    >
      <YourApp />
    </TourFlow>
  );
}`,
  advanced: `TourFlow.init({
  tourId: 'your-tour-id',
  userId: 'user-123',
  
  // Customization
  theme: 'dark',
  primaryColor: '#00d4aa',
  position: 'bottom-right',
  
  // Callbacks
  onStepChange: (step) => {
    analytics.track('tour_step', { step });
  },
  onComplete: () => {
    analytics.track('tour_completed');
  },
  onSkip: (step) => {
    analytics.track('tour_skipped', { step });
  }
});`
};

function CodeBlock({ code, language = "javascript" }: { code: string; language?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group">
      <pre className="bg-secondary/50 p-4 rounded-xl overflow-x-auto text-sm">
        <code className="text-muted-foreground">{code}</code>
      </pre>
      <button
        onClick={handleCopy}
        className="absolute top-3 right-3 p-2 bg-secondary rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
      >
        {copied ? (
          <Check className="w-4 h-4 text-primary" />
        ) : (
          <Copy className="w-4 h-4 text-muted-foreground" />
        )}
      </button>
    </div>
  );
}

const sections = [
  {
    id: "quickstart",
    icon: Zap,
    title: "Quick Start",
    description: "Get up and running in under 5 minutes.",
  },
  {
    id: "react",
    icon: Code2,
    title: "React Integration",
    description: "Use our React component for seamless integration.",
  },
  {
    id: "advanced",
    icon: Settings,
    title: "Advanced Configuration",
    description: "Customize behavior, styling, and analytics.",
  },
];

export default function Docs() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
              <Terminal className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">Documentation</span>
            </div>
            <h1 className="font-heading text-4xl sm:text-5xl font-bold mb-6">
              Getting <span className="gradient-text">Started</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Everything you need to integrate TourFlow into your website.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {/* Navigation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12"
            >
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
            </motion.div>

            {/* Quick Start Section */}
            <motion.section
              id="quickstart"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-16"
            >
              <h2 className="font-heading text-2xl font-bold mb-6 flex items-center gap-3">
                <Zap className="w-6 h-6 text-primary" />
                Quick Start
              </h2>
              
              <div className="space-y-6">
                <div className="glass p-6 rounded-xl">
                  <h3 className="font-semibold text-foreground mb-2">Step 1: Add the Script</h3>
                  <p className="text-muted-foreground mb-4">
                    Add the TourFlow widget script to your HTML, just before the closing <code className="text-primary">&lt;/body&gt;</code> tag.
                  </p>
                  <CodeBlock code={codeExamples.basic} />
                </div>

                <div className="glass p-6 rounded-xl">
                  <h3 className="font-semibold text-foreground mb-2">Step 2: Get Your Tour ID</h3>
                  <p className="text-muted-foreground mb-4">
                    Create a tour in the dashboard, then copy the Tour ID from the embed settings.
                  </p>
                  <Button variant="hero" size="sm">
                    Go to Dashboard
                  </Button>
                </div>

                <div className="glass p-6 rounded-xl">
                  <h3 className="font-semibold text-foreground mb-2">Step 3: Configure Your Tour</h3>
                  <p className="text-muted-foreground">
                    That's it! The tour will automatically appear for new users based on your trigger settings.
                  </p>
                </div>
              </div>
            </motion.section>

            {/* React Integration Section */}
            <motion.section
              id="react"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-16"
            >
              <h2 className="font-heading text-2xl font-bold mb-6 flex items-center gap-3">
                <Code2 className="w-6 h-6 text-primary" />
                React Integration
              </h2>
              
              <div className="glass p-6 rounded-xl">
                <p className="text-muted-foreground mb-4">
                  For React applications, use our official React package for a more seamless integration with TypeScript support.
                </p>
                
                <div className="mb-4">
                  <p className="text-sm text-muted-foreground mb-2">Install the package:</p>
                  <CodeBlock code="npm install @tourflow/react" language="bash" />
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-2">Wrap your app:</p>
                  <CodeBlock code={codeExamples.react} />
                </div>
              </div>
            </motion.section>

            {/* Advanced Configuration Section */}
            <motion.section
              id="advanced"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-heading text-2xl font-bold mb-6 flex items-center gap-3">
                <Settings className="w-6 h-6 text-primary" />
                Advanced Configuration
              </h2>
              
              <div className="glass p-6 rounded-xl">
                <p className="text-muted-foreground mb-4">
                  Customize the widget appearance, behavior, and track analytics events.
                </p>
                <CodeBlock code={codeExamples.advanced} />

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-secondary/30 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">Theme Options</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• <code className="text-primary">light</code> - Light theme</li>
                      <li>• <code className="text-primary">dark</code> - Dark theme</li>
                      <li>• <code className="text-primary">auto</code> - Follow system</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-secondary/30 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">Position Options</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• <code className="text-primary">bottom-right</code></li>
                      <li>• <code className="text-primary">bottom-left</code></li>
                      <li>• <code className="text-primary">center</code></li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
