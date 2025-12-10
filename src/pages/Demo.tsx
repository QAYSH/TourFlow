import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { 
  Play, 
  Pause, 
  SkipForward, 
  SkipBack, 
  Zap, 
  MousePointer,
  Target,
  Palette,
  BarChart3,
  Code2,
  Shield,
  Sparkles,
  Eye,
  Settings,
  Copy,
  Check
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const demoSteps = [
  {
    id: 1,
    title: "Welcome to TourFlow",
    description: "Let's walk through how to create beautiful product tours in minutes.",
    target: "dashboard-widget",
    content: "This is where you'll manage all your tours. Create new tours, edit existing ones, and track performance.",
  },
  {
    id: 2,
    title: "Create a New Tour",
    description: "Click 'New Tour' to start building your first onboarding experience.",
    target: "new-tour-button",
    content: "Give your tour a name and description. You can choose from templates or start from scratch.",
  },
  {
    id: 3,
    title: "Add Tour Steps",
    description: "Drag and drop to add interactive steps that guide users through your product.",
    target: "step-builder",
    content: "Add tooltips, modals, or hotspots. Customize the content, position, and behavior of each step.",
  },
  {
    id: 4,
    title: "Customize Appearance",
    description: "Match your brand with custom colors, fonts, and animations.",
    target: "theme-editor",
    content: "Choose from pre-built themes or create your own. Preview changes in real-time.",
  },
  {
    id: 5,
    title: "Set Triggers",
    description: "Control when and how your tours appear to users.",
    target: "trigger-settings",
    content: "Show tours on page load, after delay, on scroll, or based on user behavior.",
  },
  {
    id: 6,
    title: "Preview & Publish",
    description: "Test your tour and publish it to your website with one click.",
    target: "publish-button",
    content: "Preview on desktop and mobile. Get a snippet to embed on your site.",
  },
];

const features = [
  {
    icon: MousePointer,
    title: "Smart Targeting",
    description: "Automatically target elements with CSS selectors",
    color: "primary",
  },
  {
    icon: Palette,
    title: "Live Preview",
    description: "See changes in real-time as you build",
    color: "accent",
  },
  {
    icon: BarChart3,
    title: "Built-in Analytics",
    description: "Track completion rates and user engagement",
    color: "primary",
  },
  {
    icon: Shield,
    title: "Privacy Focused",
    description: "GDPR compliant with no user tracking",
    color: "accent",
  },
];

const integrationCode = `<!-- Add TourFlow to your website -->
<script src="https://cdn.tourflow.app/widget.js"></script>
<script>
  TourFlow.init({
    tourId: 'your-tour-id',
    theme: 'light',
    position: 'bottom-right',
    onComplete: function() {
      console.log('Tour completed!');
    }
  });
</script>`;

export default function Demo() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [copied, setCopied] = useState(false);

  const currentDemoStep = demoSteps[currentStep];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentStep((prev) => (prev + 1) % demoSteps.length);
      }, 3000);
    }
    
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handlePrevious = () => {
    setCurrentStep((prev) => (prev - 1 + demoSteps.length) % demoSteps.length);
  };

  const handleNext = () => {
    setCurrentStep((prev) => (prev + 1) % demoSteps.length);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(integrationCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
                <Play className="w-4 h-4 text-primary" />
                <span className="text-sm text-muted-foreground">Interactive Demo</span>
              </div>
              <h1 className="font-heading text-4xl sm:text-5xl font-bold mb-6">
                See TourFlow in{" "}
                <span className="gradient-text">Action</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-10">
                Experience how easy it is to create, customize, and deploy 
                beautiful product tours that actually work.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button variant="hero" size="lg" asChild>
                  <a href="#interactive-demo">
                    <Play className="w-5 h-5" />
                    Start Interactive Demo
                  </a>
                </Button>
                <Button variant="hero-outline" size="lg" asChild>
                  <a href="#live-example">
                    <Eye className="w-5 h-5" />
                    See Live Example
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Interactive Demo */}
        <section id="interactive-demo" className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-6xl mx-auto"
            >
              <div className="text-center mb-12">
                <h2 className="font-heading text-3xl font-bold mb-4">Interactive Walkthrough</h2>
                <p className="text-muted-foreground">
                  Follow along as we build a complete product tour from scratch
                </p>
              </div>

              <div className="grid lg:grid-cols-3 gap-8">
                {/* Demo Controls */}
                <div className="lg:col-span-2">
                  <div className="glass rounded-2xl overflow-hidden">
                    {/* Mock Dashboard */}
                    <div className="p-6 border-b border-border">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-4">
                          <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-destructive/70" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                            <div className="w-3 h-3 rounded-full bg-green-500/70" />
                          </div>
                          <div className="text-sm text-muted-foreground">
                            TourFlow Dashboard
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                          <span className="text-xs text-primary">Demo Mode</span>
                        </div>
                      </div>

                      {/* Mock UI with Highlighted Element */}
                      <div className="relative min-h-[400px] bg-card/50 rounded-lg p-6">
                        {/* Dashboard Mock Elements */}
                        <div className="absolute top-4 left-4 w-48 h-10 rounded-lg bg-secondary" />
                        <div className="absolute top-4 right-4 w-32 h-10 rounded-lg bg-secondary" />
                        <div className="absolute top-20 left-4 w-64 h-64 rounded-lg bg-secondary" />
                        <div className="absolute top-20 right-4 w-64 h-64 rounded-lg bg-secondary" />
                        <div className="absolute bottom-4 left-4 w-full h-32 rounded-lg bg-secondary" />
                        
                        {/* Highlighted Element Based on Current Step */}
                        <motion.div
                          key={currentStep}
                          initial={{ scale: 0.9, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.3 }}
                          className={`absolute ${
                            currentDemoStep.target === 'dashboard-widget' 
                              ? 'top-24 left-24 w-64 h-32' 
                              : currentDemoStep.target === 'new-tour-button'
                              ? 'top-4 left-4 w-48 h-10'
                              : currentDemoStep.target === 'step-builder'
                              ? 'top-20 right-4 w-64 h-64'
                              : currentDemoStep.target === 'theme-editor'
                              ? 'top-20 left-4 w-64 h-64'
                              : currentDemoStep.target === 'trigger-settings'
                              ? 'bottom-20 left-1/2 w-48 h-10'
                              : 'bottom-4 left-4 w-32 h-10'
                          }`}
                        >
                          <div className="absolute inset-0 border-2 border-primary rounded-lg animate-pulse" />
                          <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-full bg-primary text-primary-foreground text-xs font-medium whitespace-nowrap">
                            <Target className="w-3 h-3 inline mr-1" />
                            {currentDemoStep.title}
                          </div>
                        </motion.div>
                      </div>
                    </div>

                    {/* Demo Controls */}
                    <div className="p-6 bg-secondary/30">
                      <div className="flex items-center justify-between mb-4">
                        <div className="text-sm text-muted-foreground">
                          Step {currentStep + 1} of {demoSteps.length}
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={handlePrevious}
                            disabled={currentStep === 0}
                          >
                            <SkipBack className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setIsPlaying(!isPlaying)}
                          >
                            {isPlaying ? (
                              <Pause className="w-4 h-4" />
                            ) : (
                              <Play className="w-4 h-4" />
                            )}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleNext}
                            disabled={currentStep === demoSteps.length - 1}
                          >
                            <SkipForward className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      
                      {/* Progress Bar */}
                      <div className="w-full h-1 bg-secondary rounded-full overflow-hidden mb-4">
                        <motion.div
                          className="h-full bg-primary rounded-full"
                          initial={{ width: `${(currentStep / (demoSteps.length - 1)) * 100}%` }}
                          animate={{ width: `${(currentStep / (demoSteps.length - 1)) * 100}%` }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step Details */}
                <div className="space-y-6">
                  <div className="glass p-6 rounded-2xl">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Zap className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-heading font-semibold text-lg text-foreground">
                          {currentDemoStep.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {currentDemoStep.description}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {currentDemoStep.content}
                    </p>
                  </div>

                  {/* Quick Features */}
                  <div className="glass p-6 rounded-2xl">
                    <h4 className="font-heading font-semibold text-foreground mb-4">
                      Key Features Shown
                    </h4>
                    <div className="space-y-3">
                      {features.map((feature) => (
                        <div key={feature.title} className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-lg ${
                            feature.color === 'primary' ? 'bg-primary/10' : 'bg-accent/10'
                          } flex items-center justify-center`}>
                            <feature.icon className={`w-4 h-4 ${
                              feature.color === 'primary' ? 'text-primary' : 'text-accent'
                            }`} />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-foreground">
                              {feature.title}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {feature.description}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Live Example */}
        <section id="live-example" className="py-16 bg-secondary/20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-6xl mx-auto"
            >
              <div className="text-center mb-12">
                <h2 className="font-heading text-3xl font-bold mb-4">See It Live</h2>
                <p className="text-muted-foreground">
                  Experience a real TourFlow widget in action
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                {/* Live Widget Demo */}
                <div className="glass p-8 rounded-2xl">
                  <div className="flex items-center gap-3 mb-6">
                    <Sparkles className="w-6 h-6 text-primary" />
                    <h3 className="font-heading text-xl font-bold text-foreground">
                      Live Widget Demo
                    </h3>
                  </div>
                  
                  <div className="relative min-h-[300px] bg-card rounded-lg p-6">
                    {/* Mock Website Content */}
                    <div className="space-y-4">
                      <div className="h-4 w-3/4 bg-secondary rounded" />
                      <div className="h-4 w-1/2 bg-secondary rounded" />
                      <div className="h-20 bg-secondary rounded mt-6" />
                      <div className="grid grid-cols-2 gap-4 mt-6">
                        <div className="h-24 bg-secondary rounded" />
                        <div className="h-24 bg-secondary rounded" />
                      </div>
                    </div>

                    {/* Tour Widget */}
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                      className="absolute bottom-6 right-6 glass p-4 rounded-xl max-w-xs animate-float"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                          <Sparkles className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium text-sm text-foreground">
                            Welcome to TourFlow
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Let's get you started
                          </div>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mb-4">
                        This is what a TourFlow widget looks like on your website. 
                        It guides users through your product with interactive steps.
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-1 bg-secondary rounded-full overflow-hidden">
                            <div className="w-1/3 h-full bg-primary rounded-full" />
                          </div>
                          <span className="text-xs text-muted-foreground">Step 1 of 3</span>
                        </div>
                        <Button size="sm" variant="hero">
                          Next
                        </Button>
                      </div>
                    </motion.div>
                  </div>
                </div>

                {/* Integration Example */}
                <div className="glass p-8 rounded-2xl">
                  <div className="flex items-center gap-3 mb-6">
                    <Code2 className="w-6 h-6 text-primary" />
                    <h3 className="font-heading text-xl font-bold text-foreground">
                      Easy Integration
                    </h3>
                  </div>
                  
                  <p className="text-muted-foreground mb-6">
                    Add TourFlow to your website with just a few lines of code:
                  </p>

                  <div className="relative group">
                    <pre className="bg-secondary/50 p-4 rounded-xl overflow-x-auto text-sm">
                      <code className="text-muted-foreground">{integrationCode}</code>
                    </pre>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={handleCopyCode}
                    >
                      {copied ? (
                        <Check className="w-4 h-4 text-primary" />
                      ) : (
                        <Copy className="w-4 h-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-4">
                    <div className="p-3 rounded-lg bg-secondary/30">
                      <div className="text-sm font-medium text-foreground mb-1">
                        No Dependencies
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Works with any framework
                      </div>
                    </div>
                    <div className="p-3 rounded-lg bg-secondary/30">
                      <div className="text-sm font-medium text-foreground mb-1">
                        15KB Gzipped
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Lightning fast load
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Customization Options */}
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
                <h2 className="font-heading text-3xl font-bold mb-4">Endless Customization</h2>
                <p className="text-muted-foreground">
                  Make it look and feel exactly how you want
                </p>
              </div>

              <Tabs defaultValue="themes" className="glass p-8 rounded-2xl">
                <TabsList className="grid grid-cols-3 mb-8">
                  <TabsTrigger value="themes">Themes</TabsTrigger>
                  <TabsTrigger value="animations">Animations</TabsTrigger>
                  <TabsTrigger value="triggers">Triggers</TabsTrigger>
                </TabsList>
                
                <TabsContent value="themes" className="space-y-6">
                  <div className="grid grid-cols-3 gap-4">
                    {['Light', 'Dark', 'Custom'].map((theme) => (
                      <div
                        key={theme}
                        className={`p-4 rounded-xl border ${
                          theme === 'Custom' 
                            ? 'border-primary bg-primary/5' 
                            : 'border-border bg-card'
                        } cursor-pointer hover:border-primary/50 transition-colors`}
                      >
                        <div className={`w-full h-24 rounded-lg mb-3 ${
                          theme === 'Light' ? 'bg-gray-100' :
                          theme === 'Dark' ? 'bg-gray-800' :
                          'bg-gradient-to-br from-primary/20 to-accent/20'
                        }`} />
                        <div className="font-medium text-foreground">{theme} Theme</div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="animations" className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    {['Slide In', 'Fade', 'Bounce', 'Scale'].map((animation) => (
                      <div
                        key={animation}
                        className="p-4 rounded-xl border border-border bg-card cursor-pointer hover:border-primary/50 transition-colors"
                      >
                        <div className="font-medium text-foreground mb-2">{animation}</div>
                        <div className="text-sm text-muted-foreground">
                          {animation.toLowerCase()} animation effect
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="triggers" className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    {['On Load', 'On Scroll', 'On Click', 'After Delay'].map((trigger) => (
                      <div
                        key={trigger}
                        className="p-4 rounded-xl border border-border bg-card cursor-pointer hover:border-primary/50 transition-colors"
                      >
                        <div className="font-medium text-foreground mb-2">{trigger}</div>
                        <div className="text-sm text-muted-foreground">
                          Trigger tour {trigger.toLowerCase()}
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto glass-strong p-8 sm:p-12 rounded-3xl text-center"
            >
              <h2 className="font-heading text-2xl sm:text-3xl font-bold mb-4">
                Ready to create your first tour?
              </h2>
              <p className="text-muted-foreground mb-8">
                Join thousands of companies using TourFlow to boost user activation.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button variant="hero" size="xl" asChild>
                  <a href="/dashboard">
                    Start Building Free
                  </a>
                </Button>
                <Button variant="hero-outline" size="xl" asChild>
                  <a href="/contact">
                    Schedule a Demo Call
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}