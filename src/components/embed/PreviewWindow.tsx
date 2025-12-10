// src/components/embed/PreviewWindow.tsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronRight, 
  ChevronLeft, 
  X, 
  Smartphone, 
  Monitor,
  Tablet,
  Play,
  SkipForward
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { EmbedConfig } from "./types";

interface PreviewWindowProps {
  config: EmbedConfig;
}

const mockSteps = [
  { id: 1, title: "Welcome!", description: "Welcome to our app! Let's get started." },
  { id: 2, title: "Navigation", description: "Use the sidebar to navigate between sections." },
  { id: 3, title: "Dashboard", description: "Here you can see all your important metrics." },
  { id: 4, title: "Settings", description: "Customize your experience in the settings panel." },
  { id: 5, title: "Get Help", description: "Need assistance? Click here for support." },
];

export default function PreviewWindow({ config }: PreviewWindowProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [device, setDevice] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  const [isPlaying, setIsPlaying] = useState(false);

  const currentStepData = mockSteps[currentStep];
  const progress = ((currentStep + 1) / mockSteps.length) * 100;

  const handleNext = () => {
    if (currentStep < mockSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    setCurrentStep(mockSteps.length - 1);
  };

  const handleAutoPlay = () => {
    setIsPlaying(true);
    let step = 0;
    const interval = setInterval(() => {
      if (step < mockSteps.length - 1) {
        step++;
        setCurrentStep(step);
      } else {
        clearInterval(interval);
        setIsPlaying(false);
      }
    }, 2000);
  };

  const deviceClasses = {
    mobile: "max-w-xs mx-auto",
    tablet: "max-w-md mx-auto",
    desktop: "w-full",
  };

  const deviceIcons = {
    mobile: <Smartphone className="w-4 h-4" />,
    tablet: <Tablet className="w-4 h-4" />,
    desktop: <Monitor className="w-4 h-4" />,
  };

  return (
    <div className="space-y-6">
      {/* Device Selector */}
      <div className="flex items-center justify-between">
        <div className="text-sm font-medium text-muted-foreground">
          Preview Mode
        </div>
        <div className="flex items-center gap-1 glass rounded-lg p-1">
          {(['mobile', 'tablet', 'desktop'] as const).map((dev) => (
            <Button
              key={dev}
              variant={device === dev ? "secondary" : "ghost"}
              size="icon"
              className="h-8 w-8"
              onClick={() => setDevice(dev)}
            >
              {deviceIcons[dev]}
            </Button>
          ))}
        </div>
      </div>

      {/* Preview Container */}
      <div className={`${deviceClasses[device]} border-2 border-border rounded-xl overflow-hidden bg-card`}>
        {/* Mock Browser/Device Header */}
        <div className="h-8 border-b border-border bg-secondary flex items-center px-3">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
          </div>
          <div className="flex-1 text-center">
            <div className="text-xs text-muted-foreground">yourwebsite.com</div>
          </div>
        </div>

        {/* Mock Website Content */}
        <div className="p-4 bg-background min-h-[400px] relative">
          {/* Mock website elements */}
          <div className="space-y-4">
            <div className="h-8 bg-secondary rounded-lg w-3/4" />
            <div className="h-4 bg-secondary rounded w-1/2" />
            <div className="grid grid-cols-3 gap-3 mt-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-20 bg-secondary rounded-lg" />
              ))}
            </div>
            <div className="h-32 bg-secondary rounded-lg mt-4" />
          </div>

          {/* Tour Overlay */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="absolute inset-0 flex items-center justify-center p-4"
              style={{
                backgroundColor: config.theme === 'dark' ? 'rgba(0,0,0,0.7)' : 'rgba(255,255,255,0.9)',
              }}
            >
              {/* Tour Card */}
              <div
                className="max-w-sm w-full rounded-xl border shadow-lg p-6"
                style={{
                  backgroundColor: config.colors.background,
                  color: config.colors.text,
                  borderColor: config.colors.primary + '30',
                }}
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  {config.features.showCounter && (
                    <div className="text-sm font-medium" style={{ color: config.colors.primary }}>
                      Step {currentStep + 1} of {mockSteps.length}
                    </div>
                  )}
                  {config.features.allowSkip && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleSkip}
                      className="text-xs"
                      style={{ color: config.colors.text + '80' }}
                    >
                      Skip
                    </Button>
                  )}
                </div>

                {/* Content */}
                <h3 className="font-heading font-semibold text-lg mb-2">
                  {currentStepData.title}
                </h3>
                <p className="text-sm mb-6 opacity-80">
                  {currentStepData.description}
                </p>

                {/* Progress Bar */}
                {config.features.showProgress && (
                  <div className="mb-6">
                    <div className="h-1 bg-secondary rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundColor: config.colors.progress }}
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </div>
                )}

                {/* Controls */}
                {config.features.showControls && (
                  <div className="flex items-center justify-between">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handlePrev}
                      disabled={currentStep === 0}
                      style={{
                        borderColor: config.colors.primary + '30',
                        color: config.colors.text,
                      }}
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Back
                    </Button>
                    
                    <Button
                      size="sm"
                      onClick={handleNext}
                      style={{
                        backgroundColor: config.colors.primary,
                        color: getContrastColor(config.colors.primary),
                      }}
                    >
                      {currentStep === mockSteps.length - 1 ? (
                        "Finish"
                      ) : (
                        <>
                          Next
                          <ChevronRight className="w-4 h-4 ml-2" />
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Preview Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleAutoPlay}
            disabled={isPlaying}
          >
            <Play className="w-4 h-4 mr-2" />
            Auto Play
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentStep(0)}
          >
            Reset
          </Button>
        </div>
        
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={handlePrev}
            disabled={currentStep === 0}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          
          <div className="text-center">
            <div className="text-sm font-medium">
              Step {currentStep + 1} of {mockSteps.length}
            </div>
            <div className="text-xs text-muted-foreground">
              {currentStepData.title}
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={handleNext}
            disabled={currentStep === mockSteps.length - 1}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={handleSkip}
          disabled={currentStep === mockSteps.length - 1}
        >
          <SkipForward className="w-4 h-4 mr-2" />
          Skip to End
        </Button>
      </div>
    </div>
  );
}

// Helper function to determine text color based on background
function getContrastColor(hexcolor: string) {
  const r = parseInt(hexcolor.substr(1, 2), 16);
  const g = parseInt(hexcolor.substr(3, 2), 16);
  const b = parseInt(hexcolor.substr(5, 2), 16);
  const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
  return yiq >= 128 ? '#000000' : '#ffffff';
}