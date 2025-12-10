import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

const tourSteps = [
  {
    id: "welcome",
    title: "Welcome to TourFlow!",
    description: "This is a live demo of our embeddable tour widget. Click 'Next' to continue the tour.",
    target: "hero",
  },
  {
    id: "features",
    title: "Explore Features",
    description: "Our widget supports rich text, images, videos, and interactive elements.",
    target: "features",
  },
  {
    id: "progress",
    title: "Track Progress",
    description: "The progress bar shows users how far they've come in the tour.",
    target: "progress",
  },
  {
    id: "navigation",
    title: "Easy Navigation",
    description: "Users can go back, skip steps, or close the tour at any time.",
    target: "navigation",
  },
  {
    id: "complete",
    title: "Tour Complete! 🎉",
    description: "You've finished the demo tour. Ready to create your own?",
    target: "complete",
  },
];

export function Demo() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const [isCompleted, setIsCompleted] = useState(false);

  const step = tourSteps[currentStep];
  const progress = ((currentStep + 1) / tourSteps.length) * 100;

  const handleNext = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsCompleted(true);
      setIsActive(false);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setIsActive(true);
    setIsCompleted(false);
  };

  return (
    <section className="py-24 relative overflow-hidden bg-secondary/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            Try it <span className="gradient-text">yourself</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Experience our tour widget in action. This is exactly what your users will see.
          </p>
        </motion.div>

        {/* Demo Area */}
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative rounded-2xl overflow-hidden glass card-shadow"
          >
            {/* Mock Browser Chrome */}
            <div className="px-4 py-3 border-b border-border flex items-center gap-4">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-destructive/70" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <div className="w-3 h-3 rounded-full bg-green-500/70" />
              </div>
              <div className="flex-1 flex justify-center">
                <div className="px-4 py-1 bg-secondary rounded-lg text-sm text-muted-foreground">
                  yourwebsite.com
                </div>
              </div>
            </div>

            {/* Demo Content */}
            <div className="relative aspect-video bg-card p-8 flex items-center justify-center">
              {/* Simulated Page Content */}
              <div className="absolute inset-8 flex flex-col gap-4 opacity-30">
                <div className="h-8 bg-secondary/50 rounded w-1/3" />
                <div className="h-4 bg-secondary/50 rounded w-2/3" />
                <div className="h-4 bg-secondary/50 rounded w-1/2" />
                <div className="flex-1 grid grid-cols-3 gap-4 mt-4">
                  <div className="bg-secondary/50 rounded" />
                  <div className="bg-secondary/50 rounded" />
                  <div className="bg-secondary/50 rounded" />
                </div>
              </div>

              {/* Tour Widget */}
              <AnimatePresence mode="wait">
                {isActive && (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="relative z-10 w-full max-w-md"
                  >
                    <div className="glass-strong p-6 rounded-2xl">
                      {/* Header */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="text-sm font-medium text-primary">
                          Step {currentStep + 1} of {tourSteps.length}
                        </div>
                        <button
                          onClick={() => setIsActive(false)}
                          className="p-1 hover:bg-secondary rounded-lg transition-colors"
                        >
                          <X className="w-4 h-4 text-muted-foreground" />
                        </button>
                      </div>

                      {/* Content */}
                      <h3 className="font-heading font-semibold text-xl text-foreground mb-2">
                        {step.title}
                      </h3>
                      <p className="text-muted-foreground mb-6">
                        {step.description}
                      </p>

                      {/* Progress Bar */}
                      <div className="h-1 bg-secondary rounded-full mb-4 overflow-hidden">
                        <motion.div
                          className="h-full bg-primary rounded-full"
                          initial={{ width: `${((currentStep) / tourSteps.length) * 100}%` }}
                          animate={{ width: `${progress}%` }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>

                      {/* Navigation */}
                      <div className="flex items-center justify-between">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={handlePrev}
                          disabled={currentStep === 0}
                        >
                          <ChevronLeft className="w-4 h-4" />
                          Back
                        </Button>
                        <Button
                          variant="hero"
                          size="sm"
                          onClick={handleNext}
                        >
                          {currentStep === tourSteps.length - 1 ? "Finish" : "Next"}
                          {currentStep < tourSteps.length - 1 && <ChevronRight className="w-4 h-4" />}
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                )}

                {isCompleted && !isActive && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center"
                  >
                    <div className="text-6xl mb-4">🎉</div>
                    <h3 className="font-heading font-semibold text-xl text-foreground mb-2">
                      Demo Complete!
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Now imagine this on your website.
                    </p>
                    <Button variant="hero" onClick={handleRestart}>
                      <RotateCcw className="w-4 h-4" />
                      Restart Demo
                    </Button>
                  </motion.div>
                )}

                {!isActive && !isCompleted && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center"
                  >
                    <p className="text-muted-foreground mb-4">Tour paused</p>
                    <Button variant="hero" onClick={() => setIsActive(true)}>
                      Resume Tour
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
