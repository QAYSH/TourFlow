// src/components/embed/AdvancedSettings.tsx
import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Zap, 
  Target, 
  Calendar,
  Users,
  Clock,
  Globe,
  ChevronDown,
  ChevronUp,
  AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { EmbedConfig } from "./types";

interface AdvancedSettingsProps {
  config: EmbedConfig;
  onUpdate: (updates: Partial<EmbedConfig>) => void;
}

export default function AdvancedSettings({ config, onUpdate }: AdvancedSettingsProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const sections = [
    {
      id: "triggers",
      icon: Zap,
      title: "Triggers & Events",
      description: "Control when and how your tour starts",
      content: (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="font-medium">On Page Load</Label>
              <p className="text-sm text-muted-foreground">Start tour automatically after page loads</p>
            </div>
            <Switch
              checked={config.triggers?.onPageLoad.enabled || false}
              onCheckedChange={(checked) => onUpdate({
                triggers: {
                  ...config.triggers,
                  onPageLoad: { ...config.triggers?.onPageLoad, enabled: checked }
                }
              })}
            />
          </div>
          
          {config.triggers?.onPageLoad.enabled && (
            <div className="pl-4">
              <Label className="text-sm">Delay (milliseconds)</Label>
              <Input
                type="number"
                value={config.triggers.onPageLoad.delay}
                onChange={(e) => onUpdate({
                  triggers: {
                    ...config.triggers,
                    onPageLoad: { ...config.triggers?.onPageLoad, delay: parseInt(e.target.value) }
                  }
                })}
                className="mt-1"
              />
            </div>
          )}

          <div className="flex items-center justify-between">
            <div>
              <Label className="font-medium">On Element Click</Label>
              <p className="text-sm text-muted-foreground">Start when user clicks a specific element</p>
            </div>
            <Switch
              checked={config.triggers?.onElementClick.enabled || false}
              onCheckedChange={(checked) => onUpdate({
                triggers: {
                  ...config.triggers,
                  onElementClick: { ...config.triggers?.onElementClick, enabled: checked }
                }
              })}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="font-medium">On Scroll</Label>
              <p className="text-sm text-muted-foreground">Start when user scrolls to a certain point</p>
            </div>
            <Switch
              checked={config.triggers?.onScroll.enabled || false}
              onCheckedChange={(checked) => onUpdate({
                triggers: {
                  ...config.triggers,
                  onScroll: { ...config.triggers?.onScroll, enabled: checked }
                }
              })}
            />
          </div>
        </div>
      )
    },
    {
      id: "targeting",
      icon: Target,
      title: "Targeting Rules",
      description: "Show tour to specific users or pages",
      content: (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="font-medium">New Users Only</Label>
              <p className="text-sm text-muted-foreground">Only show to first-time visitors</p>
            </div>
            <Switch
              checked={config.targeting?.newUsersOnly || false}
              onCheckedChange={(checked) => onUpdate({
                targeting: { ...config.targeting, newUsersOnly: checked }
              })}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="font-medium">Hide on Mobile</Label>
              <p className="text-sm text-muted-foreground">Disable tour on mobile devices</p>
            </div>
            <Switch
              checked={config.targeting?.hideOnMobile || false}
              onCheckedChange={(checked) => onUpdate({
                targeting: { ...config.targeting, hideOnMobile: checked }
              })}
            />
          </div>

          <div>
            <Label className="font-medium">URL Patterns</Label>
            <p className="text-sm text-muted-foreground mb-2">Only show on specific pages (one per line)</p>
            <textarea
              value={config.targeting?.urlPatterns?.join('\n') || ''}
              onChange={(e) => onUpdate({
                targeting: {
                  ...config.targeting,
                  urlPatterns: e.target.value.split('\n').filter(url => url.trim())
                }
              })}
              className="w-full h-24 bg-card border border-border rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="/dashboard/*\n/pricing\n/features"
            />
          </div>
        </div>
      )
    },
    {
      id: "schedule",
      icon: Calendar,
      title: "Schedule",
      description: "Set start and end dates for your tour",
      content: (
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <Label className="font-medium">Start Date</Label>
              <Input
                type="datetime-local"
                className="mt-1"
                placeholder="Optional"
              />
            </div>
            <div className="flex-1">
              <Label className="font-medium">End Date</Label>
              <Input
                type="datetime-local"
                className="mt-1"
                placeholder="Optional"
              />
            </div>
          </div>
          
          <div className="p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-muted-foreground">
                Scheduling is a premium feature. Upgrade your plan to enable.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "abtesting",
      icon: Users,
      title: "A/B Testing",
      description: "Test different tour versions with user segments",
      content: (
        <div className="text-center py-8">
          <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h4 className="font-semibold text-foreground mb-2">A/B Testing</h4>
          <p className="text-sm text-muted-foreground mb-4">
            Test different tour variations to optimize conversion rates.
          </p>
          <Button variant="outline">Enable A/B Testing</Button>
          <p className="text-xs text-muted-foreground mt-4">
            Available on Business and Enterprise plans
          </p>
        </div>
      )
    }
  ];

  return (
    <div className="glass rounded-xl overflow-hidden mb-8">
      <div className="px-6 py-4 border-b border-border bg-primary/5">
        <h2 className="font-heading font-semibold text-lg text-foreground">
          Advanced Settings
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Fine-tune your tour with advanced configuration options
        </p>
      </div>
      
      <div className="divide-y divide-border">
        {sections.map((section) => (
          <div key={section.id} className="p-6">
            <button
              onClick={() => toggleSection(section.id)}
              className="flex items-center justify-between w-full text-left"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <section.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-foreground">
                    {section.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {section.description}
                  </p>
                </div>
              </div>
              {expandedSection === section.id ? (
                <ChevronUp className="w-5 h-5 text-muted-foreground" />
              ) : (
                <ChevronDown className="w-5 h-5 text-muted-foreground" />
              )}
            </button>
            
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ 
                opacity: expandedSection === section.id ? 1 : 0,
                height: expandedSection === section.id ? 'auto' : 0
              }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="pt-6 mt-6 border-t border-border">
                {section.content}
              </div>
            </motion.div>
          </div>
        ))}
      </div>
      
      <div className="px-6 py-4 border-t border-border bg-secondary/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Globe className="w-4 h-4" />
            <span>Advanced settings require API access</span>
          </div>
          <Button variant="outline" size="sm">
            View API Documentation
          </Button>
        </div>
      </div>
    </div>
  );
}