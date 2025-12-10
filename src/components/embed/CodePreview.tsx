// src/components/embed/CodePreview.tsx - UPDATED
import { useState } from "react";
import { Copy, Check, Download, Minus, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EmbedConfig } from "./types";
import { toast } from "@/hooks/use-toast";

interface CodePreviewProps {
  config: EmbedConfig;
}

export default function CodePreview({ config }: CodePreviewProps) {
  const [copied, setCopied] = useState(false);
  const [minified, setMinified] = useState(false);
  const [activeTab, setActiveTab] = useState("html");

  const generateEmbedCode = () => {
    if (!config.tourId) {
      return "// Please select a tour first";
    }

    const code = {
      tourId: config.tourId,
      theme: config.theme,
      position: config.position,
      colors: config.colors,
      features: config.features,
      apiUrl: window.location.origin,
    };

    if (minified) {
      return `<script>window.tourConfig=${JSON.stringify(code)}</script><script src="${window.location.origin}/embed.js" async></script>`;
    }

    return `<!-- TourFlow Embed Code -->
<!-- Add this to your website's HTML -->
<script>
  window.tourConfig = ${JSON.stringify(code, null, 2)};
</script>
<script 
  src="${window.location.origin}/embed.js" 
  async
></script>
<!-- End TourFlow Embed Code -->`;
  };

  const generateReactCode = () => {
    if (!config.tourId) {
      return "// Please select a tour first";
    }

    return `import { useEffect } from 'react';

function App() {
  useEffect(() => {
    // Load TourFlow script
    const script = document.createElement('script');
    script.src = '${window.location.origin}/embed.js';
    script.async = true;
    
    // Set configuration
    window.tourConfig = {
      tourId: "${config.tourId}",
      theme: "${config.theme}",
      position: "${config.position}",
      colors: ${JSON.stringify(config.colors, null, 2)},
      features: ${JSON.stringify(config.features, null, 2)},
      apiUrl: "${window.location.origin}"
    };
    
    document.body.appendChild(script);
    
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
      {/* Your app content */}
    </div>
  );
}`;
  };

  const generateVueCode = () => {
    if (!config.tourId) {
      return "// Please select a tour first";
    }

    return `<template>
  <div>
    <!-- Your app content -->
  </div>
</template>

<script setup>
import { onMounted } from 'vue';

onMounted(() => {
  // Load TourFlow script
  const script = document.createElement('script');
  script.src = '${window.location.origin}/embed.js';
  script.async = true;
  
  // Set configuration
  window.tourConfig = {
    tourId: "${config.tourId}",
    theme: "${config.theme}",
    position: "${config.position}",
    colors: ${JSON.stringify(config.colors, null, 2)},
    features: ${JSON.stringify(config.features, null, 2)},
    apiUrl: "${window.location.origin}"
  };
  
  document.body.appendChild(script);
});
</script>`;
  };

  const handleCopyCode = async () => {
    let code = "";
    switch (activeTab) {
      case "html":
        code = generateEmbedCode();
        break;
      case "react":
        code = generateReactCode();
        break;
      case "vue":
        code = generateVueCode();
        break;
      case "js":
        code = generateEmbedCode().replace("<!-- TourFlow Embed Code -->\n", "").replace("\n<!-- End TourFlow Embed Code -->", "");
        break;
    }

    await navigator.clipboard.writeText(code);
    setCopied(true);
    toast({
      title: "Code copied!",
      description: "Embed code copied to clipboard.",
    });
    
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadConfig = () => {
    if (!config.tourId) {
      toast({
        title: "No tour selected",
        description: "Please select a tour first.",
        variant: "destructive",
      });
      return;
    }

    const configJson = JSON.stringify({
      name: config.name,
      ...config,
    }, null, 2);
    
    const blob = new Blob([configJson], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tourflow-config-${config.name.toLowerCase().replace(/\s+/g, '-')}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Config downloaded",
      description: "Configuration saved as JSON file.",
    });
  };

  const renderCode = () => {
    switch (activeTab) {
      case "html":
        return generateEmbedCode();
      case "react":
        return generateReactCode();
      case "vue":
        return generateVueCode();
      case "js":
        return generateEmbedCode().replace("<!-- TourFlow Embed Code -->\n", "").replace("\n<!-- End TourFlow Embed Code -->", "");
      default:
        return generateEmbedCode();
    }
  };

  return (
    <div className="space-y-4">
      {/* Code Format Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setMinified(!minified)}
            className="text-xs"
            disabled={!config.tourId}
          >
            {minified ? <Maximize2 className="w-3 h-3 mr-1" /> : <Minus className="w-3 h-3 mr-1" />}
            {minified ? "Beautify" : "Minify"}
          </Button>
          <div className="text-xs text-muted-foreground">
            {renderCode().length} characters
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopyCode}
            className="gap-2"
            disabled={!config.tourId}
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? "Copied!" : "Copy Code"}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleDownloadConfig}
            className="gap-2"
            disabled={!config.tourId}
          >
            <Download className="w-4 h-4" />
            Download
          </Button>
        </div>
      </div>

      {/* Code Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4">
          <TabsTrigger value="html">HTML</TabsTrigger>
          <TabsTrigger value="react">React</TabsTrigger>
          <TabsTrigger value="vue">Vue</TabsTrigger>
          <TabsTrigger value="js">Vanilla JS</TabsTrigger>
        </TabsList>
        
        <TabsContent value="html" className="mt-4">
          <CodeBlock code={renderCode()} language="html" />
        </TabsContent>
        
        <TabsContent value="react" className="mt-4">
          <CodeBlock code={renderCode()} language="jsx" />
        </TabsContent>
        
        <TabsContent value="vue" className="mt-4">
          <CodeBlock code={renderCode()} language="vue" />
        </TabsContent>
        
        <TabsContent value="js" className="mt-4">
          <CodeBlock code={renderCode()} language="javascript" />
        </TabsContent>
      </Tabs>

      {/* Code Info */}
      <div className="text-sm text-muted-foreground space-y-2">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${config.tourId ? 'bg-green-500' : 'bg-yellow-500'}`} />
          <span>{config.tourId ? "Valid configuration" : "No tour selected"}</span>
        </div>
        {config.tourId && (
          <>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-500" />
              <span>Mobile optimized</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-purple-500" />
              <span>Live preview available</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function CodeBlock({ code, language }: { code: string; language: string }) {
  return (
    <pre className="bg-secondary/30 rounded-lg p-4 overflow-x-auto text-sm font-mono max-h-80 overflow-y-auto">
      <code className={`language-${language}`}>{code}</code>
    </pre>
  );
}