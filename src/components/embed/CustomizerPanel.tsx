// src/components/embed/CustomizerPanel.tsx
import { useState } from "react";
import { motion } from "framer-motion";
import { Palette, Layout, ToggleLeft, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { EmbedConfig } from "./types";
import { colorPresets, positionOptions, themeOptions } from "@/lib/embed/defaultConfig";

interface CustomizerPanelProps {
  config: EmbedConfig;
  onUpdate: (updates: Partial<EmbedConfig>) => void;
}

export default function CustomizerPanel({ config, onUpdate }: CustomizerPanelProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>("colors");

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const handleColorChange = (colorType: keyof typeof config.colors, value: string) => {
    onUpdate({
      colors: {
        ...config.colors,
        [colorType]: value,
      },
    });
  };

  const handleFeatureToggle = (feature: keyof typeof config.features) => {
    onUpdate({
      features: {
        ...config.features,
        [feature]: !config.features[feature],
      },
    });
  };

  return (
    <div className="space-y-6">
      {/* Theme Selection */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium flex items-center gap-2">
            <Palette className="w-4 h-4" />
            Theme
          </Label>
        </div>
        <RadioGroup
          value={config.theme}
          onValueChange={(value: any) => onUpdate({ theme: value })}
          className="grid grid-cols-3 gap-2"
        >
          {themeOptions.map((theme) => (
            <div key={theme.value}>
              <RadioGroupItem
                value={theme.value}
                id={`theme-${theme.value}`}
                className="peer sr-only"
              />
              <Label
                htmlFor={`theme-${theme.value}`}
                className={`flex flex-col items-center justify-center rounded-lg border-2 p-3 cursor-pointer transition-all ${
                  config.theme === theme.value
                    ? "border-primary bg-primary/10"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <span className="text-xl mb-1">{theme.icon}</span>
                <span className="text-xs font-medium">{theme.label}</span>
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* Colors Section */}
      <div className="space-y-4">
        <button
          onClick={() => toggleSection("colors")}
          className="flex items-center justify-between w-full"
        >
          <Label className="text-sm font-medium flex items-center gap-2">
            <Palette className="w-4 h-4" />
            Colors
          </Label>
          {expandedSection === "colors" ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>
        
        {expandedSection === "colors" && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-4"
          >
            {/* Color Presets */}
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">Quick Presets</Label>
              <div className="grid grid-cols-3 gap-2">
                {colorPresets.map((preset) => (
                  <button
                    key={preset.name}
                    onClick={() => onUpdate({ colors: preset })}
                    className="flex flex-col items-center gap-1 p-2 rounded-lg border border-border hover:border-primary/50 transition-colors"
                    title={preset.name}
                  >
                    <div className="w-8 h-8 rounded-md border" style={{ backgroundColor: preset.primary }} />
                    <span className="text-xs">{preset.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Color Pickers */}
            <div className="space-y-3">
              {Object.entries(config.colors).map(([key, value]) => (
                <div key={key} className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-md border"
                    style={{ backgroundColor: value }}
                  />
                  <div className="flex-1">
                    <Label className="text-xs capitalize">{key.replace(/([A-Z])/g, ' $1')}</Label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={value}
                        onChange={(e) => handleColorChange(key as any, e.target.value)}
                        className="w-8 h-8 cursor-pointer"
                      />
                      <input
                        type="text"
                        value={value}
                        onChange={(e) => handleColorChange(key as any, e.target.value)}
                        className="flex-1 text-sm font-mono bg-transparent border-b border-border focus:outline-none focus:border-primary"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Position Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium flex items-center gap-2">
            <Layout className="w-4 h-4" />
            Position
          </Label>
        </div>
        <div className="relative bg-secondary/30 rounded-lg p-2">
          {/* Position Grid */}
          <div className="grid grid-cols-3 gap-2 aspect-square">
            {["top-left", "top", "top-right", "left", "center", "right", "bottom-left", "bottom", "bottom-right"].map((pos) => {
              const option = positionOptions.find(o => o.value === pos);
              return (
                <button
                  key={pos}
                  onClick={() => onUpdate({ position: pos as any })}
                  className={`flex items-center justify-center rounded-lg border-2 transition-all ${
                    config.position === pos
                      ? "border-primary bg-primary/20"
                      : "border-transparent hover:border-primary/30 hover:bg-primary/5"
                  }`}
                  title={option?.label || pos}
                >
                  {option?.icon || "•"}
                </button>
              );
            })}
          </div>
          
          {/* Position Labels */}
          <div className="mt-2 grid grid-cols-3 gap-2">
            {positionOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => onUpdate({ position: option.value as any })}
                className={`flex items-center justify-center gap-2 py-2 rounded-lg text-sm transition-colors ${
                  config.position === option.value
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary/50 hover:bg-secondary"
                }`}
              >
                <span>{option.icon}</span>
                <span>{option.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="space-y-4">
        <button
          onClick={() => toggleSection("features")}
          className="flex items-center justify-between w-full"
        >
          <Label className="text-sm font-medium flex items-center gap-2">
            <ToggleLeft className="w-4 h-4" />
            Features
          </Label>
          {expandedSection === "features" ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>
        
        {expandedSection === "features" && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-3"
          >
            {Object.entries(config.features).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <Label htmlFor={`feature-${key}`} className="text-sm">
                  {key.replace(/([A-Z])/g, ' $1').replace(/^\w/, c => c.toUpperCase())}
                </Label>
                <Switch
                  id={`feature-${key}`}
                  checked={value}
                  onCheckedChange={() => handleFeatureToggle(key as any)}
                />
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}