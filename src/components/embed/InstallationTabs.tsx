// src/components/embed/InstallationTabs.tsx
import { useState } from "react";
import { 
  Terminal, 
  Package, 
  FileCode, 
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Copy
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EmbedConfig } from "./types";
import { toast } from "@/hooks/use-toast";

interface InstallationTabsProps {
  config: EmbedConfig;
}

export default function InstallationTabs({ config }: InstallationTabsProps) {
  const [activeTab, setActiveTab] = useState("quickstart");

  const installationSteps = {
    quickstart: [
      { step: 1, title: "Copy the embed code", description: "Click the 'Copy Code' button above" },
      { step: 2, title: "Paste in your HTML", description: "Add the code before the closing </body> tag" },
      { step: 3, title: "Verify installation", description: "Check that the tour appears on your site" },
    ],
    react: [
      { step: 1, title: "Install the SDK", command: "npm install @tourflow/sdk" },
      { step: 2, title: "Initialize in your app", description: "Add the initialization code to your main component" },
      { step: 3, title: "Configure the provider", description: "Wrap your app with TourFlowProvider" },
    ],
    vue: [
      { step: 1, title: "Install the SDK", command: "npm install @tourflow/sdk" },
      { step: 2, title: "Add to your Vue app", description: "Import and initialize in your main.js or App.vue" },
      { step: 3, title: "Use in components", description: "Access tour controls in any component" },
    ],
    nextjs: [
      { step: 1, title: "Install the SDK", command: "npm install @tourflow/sdk" },
      { step: 2, title: "Add to _app.js", description: "Initialize in your Next.js custom App component" },
      { step: 3, title: "Handle SSR", description: "Use dynamic imports for client-side only code" },
    ],
  };

  const handleCopyCommand = (command: string) => {
    navigator.clipboard.writeText(command);
    toast({
      title: "Command copied",
      description: "Ready to paste in your terminal.",
    });
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4">
          <TabsTrigger value="quickstart" className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            Quick Start
          </TabsTrigger>
          <TabsTrigger value="react" className="flex items-center gap-2">
            <FileCode className="w-4 h-4" />
            React
          </TabsTrigger>
          <TabsTrigger value="vue" className="flex items-center gap-2">
            <FileCode className="w-4 h-4" />
            Vue
          </TabsTrigger>
          <TabsTrigger value="nextjs" className="flex items-center gap-2">
            <FileCode className="w-4 h-4" />
            Next.js
          </TabsTrigger>
        </TabsList>

        {/* Quick Start */}
        <TabsContent value="quickstart" className="mt-6">
          <div className="space-y-6">
            <div className="grid gap-4">
              {installationSteps.quickstart.map((step) => (
                <div key={step.step} className="flex items-start gap-4 p-4 glass rounded-lg">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="font-heading font-bold text-primary">{step.step}</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground mb-1">{step.title}</h4>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Pro Tip</h4>
                  <p className="text-sm text-muted-foreground">
                    For best performance, place the embed code as late as possible in your HTML, 
                    just before the closing &lt;/body&gt; tag.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* React */}
        <TabsContent value="react" className="mt-6">
          <div className="space-y-6">
            <div className="grid gap-4">
              {installationSteps.react.map((step) => (
                <div key={step.step} className="p-4 glass rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="font-heading font-bold text-primary">{step.step}</span>
                    </div>
                    <h4 className="font-semibold text-foreground">{step.title}</h4>
                  </div>
                  
                  {step.command && (
                    <div className="relative">
                      <pre className="bg-secondary/30 rounded-lg p-4 overflow-x-auto text-sm font-mono">
                        {step.command}
                      </pre>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-2"
                        onClick={() => handleCopyCommand(step.command!)}
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                  
                  {step.description && (
                    <p className="text-sm text-muted-foreground mt-3">{step.description}</p>
                  )}
                </div>
              ))}
            </div>
            
            <div className="flex items-center gap-4 text-sm">
              <ExternalLink className="w-4 h-4 text-muted-foreground" />
              <a href="#" className="text-primary hover:underline">
                View React documentation →
              </a>
            </div>
          </div>
        </TabsContent>

        {/* Vue */}
        <TabsContent value="vue" className="mt-6">
          <div className="space-y-6">
            <div className="grid gap-4">
              {installationSteps.vue.map((step) => (
                <div key={step.step} className="p-4 glass rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="font-heading font-bold text-primary">{step.step}</span>
                    </div>
                    <h4 className="font-semibold text-foreground">{step.title}</h4>
                  </div>
                  
                  {step.command && (
                    <div className="relative">
                      <pre className="bg-secondary/30 rounded-lg p-4 overflow-x-auto text-sm font-mono">
                        {step.command}
                      </pre>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-2"
                        onClick={() => handleCopyCommand(step.command!)}
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                  
                  {step.description && (
                    <p className="text-sm text-muted-foreground mt-3">{step.description}</p>
                  )}
                </div>
              ))}
            </div>
            
            <div className="flex items-center gap-4 text-sm">
              <ExternalLink className="w-4 h-4 text-muted-foreground" />
              <a href="#" className="text-primary hover:underline">
                View Vue documentation →
              </a>
            </div>
          </div>
        </TabsContent>

        {/* Next.js */}
        <TabsContent value="nextjs" className="mt-6">
          <div className="space-y-6">
            <div className="grid gap-4">
              {installationSteps.nextjs.map((step) => (
                <div key={step.step} className="p-4 glass rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="font-heading font-bold text-primary">{step.step}</span>
                    </div>
                    <h4 className="font-semibold text-foreground">{step.title}</h4>
                  </div>
                  
                  {step.command && (
                    <div className="relative">
                      <pre className="bg-secondary/30 rounded-lg p-4 overflow-x-auto text-sm font-mono">
                        {step.command}
                      </pre>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-2"
                        onClick={() => handleCopyCommand(step.command!)}
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                  
                  {step.description && (
                    <p className="text-sm text-muted-foreground mt-3">{step.description}</p>
                  )}
                </div>
              ))}
            </div>
            
            <div className="flex items-center gap-4 text-sm">
              <ExternalLink className="w-4 h-4 text-muted-foreground" />
              <a href="#" className="text-primary hover:underline">
                View Next.js documentation →
              </a>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Integration Badges */}
      <div className="pt-6 border-t border-border">
        <h4 className="font-semibold text-foreground mb-4">Also works with</h4>
        <div className="flex flex-wrap gap-3">
          {['Angular', 'Svelte', 'Nuxt.js', 'Gatsby', 'WordPress', 'Shopify', 'Webflow', 'Custom'].map((platform) => (
            <div
              key={platform}
              className="px-3 py-2 bg-secondary/50 rounded-lg text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {platform}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}