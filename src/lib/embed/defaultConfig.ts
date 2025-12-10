// src/lib/embed/defaultConfig.ts
import { EmbedConfig } from "@/components/embed/types";

export const defaultConfig: EmbedConfig = {
  name: "My Tour Configuration",
  tourId: "",
  theme: "auto",
  position: "bottom-right",
  colors: {
    primary: "#3b82f6",
    background: "#ffffff",
    text: "#1f2937",
    progress: "#10b981",
  },
  features: {
    showProgress: true,
    allowSkip: true,
    showCounter: true,
    autoStart: false,
    showControls: true,
    closeOnClickOutside: true,
  },
  triggers: {
    onPageLoad: { enabled: true, delay: 1000 },
    onElementClick: { enabled: false, selector: "#start-tour" },
    onScroll: { enabled: false, percentage: 50 },
  },
  targeting: {
    urlPatterns: ["*"],
    newUsersOnly: false,
    hideOnMobile: false,
    userSegments: [],
  },
};

export const colorPresets: ColorPreset[] = [
  { name: "Blue", primary: "#3b82f6", background: "#ffffff", text: "#1f2937" },
  { name: "Purple", primary: "#8b5cf6", background: "#ffffff", text: "#1f2937" },
  { name: "Green", primary: "#10b981", background: "#ffffff", text: "#1f2937" },
  { name: "Dark", primary: "#8b5cf6", background: "#1f2937", text: "#f9fafb" },
  { name: "Light", primary: "#3b82f6", background: "#f9fafb", text: "#111827" },
  { name: "Sunset", primary: "#f59e0b", background: "#fef3c7", text: "#78350f" },
];

export const positionOptions = [
  { value: "bottom-right", label: "Bottom Right", icon: "⬊" },
  { value: "bottom-left", label: "Bottom Left", icon: "⬋" },
  { value: "center", label: "Center", icon: "⨀" },
  { value: "top-right", label: "Top Right", icon: "⬈" },
  { value: "top-left", label: "Top Left", icon: "⬉" },
];

export const themeOptions = [
  { value: "light", label: "Light", icon: "☀️" },
  { value: "dark", label: "Dark", icon: "🌙" },
  {value: "auto", label: "Auto", icon: "🔄" },
];