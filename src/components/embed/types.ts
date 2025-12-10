// src/components/embed/types.ts
export interface EmbedConfig {
  id?: string;
  name: string;
  tourId: string;
  theme: 'light' | 'dark' | 'auto';
  position: 'bottom-right' | 'bottom-left' | 'center' | 'top-right' | 'top-left';
  colors: {
    primary: string;
    background: string;
    text: string;
    progress: string;
  };
  features: {
    showProgress: boolean;
    allowSkip: boolean;
    showCounter: boolean;
    autoStart: boolean;
    showControls: boolean;
    closeOnClickOutside: boolean;
  };
  triggers?: {
    onPageLoad: { enabled: boolean; delay: number };
    onElementClick: { enabled: boolean; selector: string };
    onScroll: { enabled: boolean; percentage: number };
  };
  targeting?: {
    urlPatterns: string[];
    newUsersOnly: boolean;
    hideOnMobile: boolean;
    userSegments: string[];
  };
}

export interface CodeSnippet {
  language: string;
  label: string;
  icon: string;
  code: string;
}

export interface TourOption {
  id: string;
  name: string;
  steps: number;
  status: 'active' | 'draft';
}

export interface ColorPreset {
  name: string;
  primary: string;
  background: string;
  text: string;
}