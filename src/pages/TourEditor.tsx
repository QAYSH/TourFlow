import { useState } from "react";
import { motion, AnimatePresence, Reorder } from "framer-motion";
import { 
  ArrowLeft, 
  Plus, 
  Trash2, 
  GripVertical,
  Save,
  Eye,
  Sparkles
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

interface TourStep {
  id: string;
  title: string;
  description: string;
  target: string;
}

const generateId = () => Math.random().toString(36).substring(2, 9);

const defaultSteps: TourStep[] = [
  { id: generateId(), title: "Welcome", description: "Welcome to our app! Let's show you around.", target: "#header" },
  { id: generateId(), title: "Navigation", description: "Use the sidebar to navigate between sections.", target: "#sidebar" },
  { id: generateId(), title: "Dashboard", description: "Here you can see all your important metrics.", target: "#dashboard" },
  { id: generateId(), title: "Settings", description: "Customize your experience in settings.", target: "#settings" },
  { id: generateId(), title: "Get Help", description: "Need help? Click here to reach our support team.", target: "#help" },
];

export default function TourEditor() {
  const navigate = useNavigate();
  const [tourName, setTourName] = useState("New Tour");
  const [steps, setSteps] = useState<TourStep[]>(defaultSteps);
  const [activeStep, setActiveStep] = useState<string | null>(steps[0]?.id || null);

  const activeStepData = steps.find(s => s.id === activeStep);

  const addStep = () => {
    const newStep: TourStep = {
      id: generateId(),
      title: `Step ${steps.length + 1}`,
      description: "Enter your step description here.",
      target: "#element",
    };
    setSteps([...steps, newStep]);
    setActiveStep(newStep.id);
  };

  const removeStep = (id: string) => {
    if (steps.length <= 1) {
      toast({
        title: "Cannot remove step",
        description: "A tour must have at least one step.",
        variant: "destructive",
      });
      return;
    }
    const newSteps = steps.filter(s => s.id !== id);
    setSteps(newSteps);
    if (activeStep === id) {
      setActiveStep(newSteps[0]?.id || null);
    }
  };

  const updateStep = (id: string, updates: Partial<TourStep>) => {
    setSteps(steps.map(s => s.id === id ? { ...s, ...updates } : s));
  };

  const handleSave = () => {
    toast({
      title: "Tour saved!",
      description: `"${tourName}" has been saved with ${steps.length} steps.`,
    });
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar - Steps List */}
      <aside className="w-80 border-r border-border bg-card flex flex-col">
        <div className="p-4 border-b border-border flex items-center gap-3">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/dashboard/Dashboard.tsx">
              <ArrowLeft className="w-5 h-5" />
            </Link>
          </Button>
          <Input
            value={tourName}
            onChange={(e) => setTourName(e.target.value)}
            className="font-heading font-semibold text-lg bg-transparent border-none focus-visible:ring-0 px-0"
          />
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-muted-foreground">Steps ({steps.length})</h3>
            <Button variant="ghost" size="sm" onClick={addStep}>
              <Plus className="w-4 h-4" />
            </Button>
          </div>

          <Reorder.Group axis="y" values={steps} onReorder={setSteps} className="space-y-2">
            {steps.map((step, index) => (
              <Reorder.Item key={step.id} value={step}>
                <motion.div
                  layout
                  onClick={() => setActiveStep(step.id)}
                  className={`group p-3 rounded-lg cursor-pointer transition-colors ${
                    activeStep === step.id 
                      ? "bg-primary/10 border border-primary/30" 
                      : "bg-secondary/50 hover:bg-secondary"
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <div className="mt-1 cursor-grab active:cursor-grabbing">
                      <GripVertical className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center font-medium">
                          {index + 1}
                        </span>
                        <span className="font-medium text-sm text-foreground truncate">
                          {step.title}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1 truncate">
                        {step.description}
                      </p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeStep(step.id);
                      }}
                      className="opacity-0 group-hover:opacity-100 p-1 hover:bg-destructive/10 rounded transition-all"
                    >
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </button>
                  </div>
                </motion.div>
              </Reorder.Item>
            ))}
          </Reorder.Group>
        </div>

        <div className="p-4 border-t border-border flex gap-2">
          <Button variant="outline" className="flex-1" onClick={addStep}>
            <Plus className="w-4 h-4" />
            Add Step
          </Button>
        </div>
      </aside>

      {/* Main Content - Step Editor */}
      <main className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="h-16 border-b border-border px-6 flex items-center justify-between glass-strong">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="text-sm text-muted-foreground">
              Editing step {steps.findIndex(s => s.id === activeStep) + 1} of {steps.length}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Eye className="w-4 h-4" />
              Preview
            </Button>
            <Button variant="hero" size="sm" onClick={handleSave}>
              <Save className="w-4 h-4" />
              Save Tour
            </Button>
          </div>
        </header>

        {/* Editor */}
        <div className="flex-1 p-8 overflow-y-auto">
          <AnimatePresence mode="wait">
            {activeStepData && (
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className="max-w-2xl mx-auto space-y-6"
              >
                <div className="space-y-2">
                  <Label htmlFor="title">Step Title</Label>
                  <Input
                    id="title"
                    value={activeStepData.title}
                    onChange={(e) => updateStep(activeStep!, { title: e.target.value })}
                    placeholder="Enter step title..."
                    className="text-lg"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={activeStepData.description}
                    onChange={(e) => updateStep(activeStep!, { description: e.target.value })}
                    placeholder="Enter step description..."
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="target">Target Element (CSS Selector)</Label>
                  <Input
                    id="target"
                    value={activeStepData.target}
                    onChange={(e) => updateStep(activeStep!, { target: e.target.value })}
                    placeholder="#element-id or .class-name"
                    className="font-mono text-sm"
                  />
                  <p className="text-xs text-muted-foreground">
                    The CSS selector of the element this step should highlight.
                  </p>
                </div>

                {/* Preview Card */}
                <div className="mt-8 p-6 glass rounded-xl">
                  <h3 className="text-sm font-medium text-muted-foreground mb-4">Preview</h3>
                  <div className="glass-strong p-6 rounded-xl max-w-sm">
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-sm font-medium text-primary">
                        Step {steps.findIndex(s => s.id === activeStep) + 1} of {steps.length}
                      </div>
                    </div>
                    <h4 className="font-heading font-semibold text-lg text-foreground mb-2">
                      {activeStepData.title || "Untitled Step"}
                    </h4>
                    <p className="text-muted-foreground text-sm mb-4">
                      {activeStepData.description || "No description provided."}
                    </p>
                    <div className="h-1 bg-secondary rounded-full overflow-hidden mb-4">
                      <div 
                        className="h-full bg-primary rounded-full transition-all"
                        style={{ width: `${((steps.findIndex(s => s.id === activeStep) + 1) / steps.length) * 100}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Button variant="ghost" size="sm" disabled={steps.findIndex(s => s.id === activeStep) === 0}>
                        Back
                      </Button>
                      <Button variant="hero" size="sm">
                        {steps.findIndex(s => s.id === activeStep) === steps.length - 1 ? "Finish" : "Next"}
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
