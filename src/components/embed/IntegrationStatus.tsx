// src/components/embed/IntegrationStatus.tsx
import { useState } from "react";
import { 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw,
  Shield,
  Zap,
  Globe,
  Cpu
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { EmbedConfig } from "./types";
import { toast } from "@/hooks/use-toast";

interface IntegrationStatusProps {
  config: EmbedConfig;
}

export default function IntegrationStatus({ config }: IntegrationStatusProps) {
  const [isTesting, setIsTesting] = useState(false);
  const [status, setStatus] = useState({
    connection: 'connected',
    tour: 'valid',
    api: 'active',
    compatibility: 'supported'
  });

  const handleTestConnection = () => {
    setIsTesting(true);
    // Simulate API test
    setTimeout(() => {
      setIsTesting(false);
      setStatus({
        connection: 'connected',
        tour: 'valid',
        api: 'active',
        compatibility: 'supported'
      });
      toast({
        title: "Connection successful",
        description: "All systems are operational.",
      });
    }, 1500);
  };

  const statusItems = [
    {
      id: 'connection',
      label: 'API Connection',
      icon: Globe,
      status: status.connection,
      message: status.connection === 'connected' 
        ? 'Connected to TourFlow API' 
        : 'Unable to connect'
    },
    {
      id: 'tour',
      label: 'Tour Validation',
      icon: Zap,
      status: status.tour,
      message: status.tour === 'valid'
        ? `Tour "${config.name}" is valid`
        : 'Tour configuration error'
    },
    {
      id: 'api',
      label: 'API Key',
      icon: Shield,
      status: status.api,
      message: status.api === 'active'
        ? 'API key is active and valid'
        : 'API key validation failed'
    },
    {
      id: 'compatibility',
      label: 'Browser Support',
      icon: Cpu,
      status: status.compatibility,
      message: status.compatibility === 'supported'
        ? 'Compatible with all modern browsers'
        : 'Limited browser support'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected':
      case 'valid':
      case 'active':
      case 'supported':
        return 'text-green-500 bg-green-500/10';
      case 'connecting':
      case 'validating':
        return 'text-yellow-500 bg-yellow-500/10';
      default:
        return 'text-red-500 bg-red-500/10';
    }
  };

  const getStatusIcon = (status: string) => {
    if (status === 'connected' || status === 'valid' || status === 'active' || status === 'supported') {
      return <CheckCircle2 className="w-4 h-4" />;
    }
    return <AlertCircle className="w-4 h-4" />;
  };

  return (
    <div className="glass rounded-xl p-4 mb-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-heading font-semibold text-foreground mb-1">Integration Status</h3>
          <p className="text-sm text-muted-foreground">
            Verify your embed configuration is ready for production
          </p>
        </div>
        
        <Button
          variant="outline"
          size="sm"
          onClick={handleTestConnection}
          disabled={isTesting}
          className="gap-2"
        >
          {isTesting ? (
            <RefreshCw className="w-4 h-4 animate-spin" />
          ) : (
            <RefreshCw className="w-4 h-4" />
          )}
          {isTesting ? 'Testing...' : 'Test Connection'}
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        {statusItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30"
          >
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getStatusColor(item.status)}`}>
              <item.icon className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-medium text-foreground truncate">
                  {item.label}
                </span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(item.status)}`}>
                  {item.status}
                </span>
              </div>
              <p className="text-xs text-muted-foreground truncate">
                {item.message}
              </p>
            </div>
            <div className={`p-1 rounded ${getStatusColor(item.status)}`}>
              {getStatusIcon(item.status)}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">Estimated load time:</span> 120ms
          </div>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span>Production Ready</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-500" />
              <span>SSL Enabled</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-purple-500" />
              <span>CDN Optimized</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}