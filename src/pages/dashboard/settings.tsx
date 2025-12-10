// src/pages/dashboard/settings.tsx
import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Settings, 
  User, 
  Users, 
  Key, 
  Bell, 
  CreditCard,
  Globe,
  Shield,
  Download,
  Save,
  Sparkles,
  Menu,
  X,
  Home,
  Layers,
  BarChart3,
  Code2,
  ChevronRight,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";

const sidebarLinks = [
  { icon: Home, label: "Overview", href: "/dashboard/Dashboard.tsx" },
  { icon: Layers, label: "Tours", href: "/dashboard/Dashboard.tsx" },
  { icon: BarChart3, label: "Analytics", href: "/dashboard/analytics" },
  { icon: Code2, label: "Embed", href: "/dashboard/embed" },
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
];

export default function SettingsPage() {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  const [profile, setProfile] = useState({
    name: "Demo User",
    email: "demo@tourflow.app",
    company: "TourFlow Inc.",
    avatar: "",
  });
  
  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    tourPublishedNotifications: true,
    analyticsWeeklyReport: true,
    darkMode: "auto",
    language: "en",
  });
  
  const [apiKeys, setApiKeys] = useState([
    { id: "key_1", name: "Production", key: "pk_live_****1234", created: "2024-01-15" },
    { id: "key_2", name: "Development", key: "pk_test_****5678", created: "2024-01-20" },
  ]);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast({
        title: "Settings saved",
        description: "Your changes have been saved successfully.",
      });
    }, 1000);
  };

  const handleGenerateApiKey = () => {
    const newKey = {
      id: `key_${Date.now()}`,
      name: "New Key",
      key: `pk_${Math.random().toString(36).substr(2, 32)}`,
      created: new Date().toISOString().split('T')[0],
    };
    setApiKeys([...apiKeys, newKey]);
    toast({
      title: "API Key generated",
      description: "New API key has been created.",
    });
  };

  const sections = [
    {
      id: "profile",
      icon: User,
      title: "Profile",
      description: "Manage your account information",
    },
    {
      id: "team",
      icon: Users,
      title: "Team",
      description: "Manage team members and permissions",
    },
    {
      id: "api",
      icon: Key,
      title: "API & Integrations",
      description: "Manage API keys and third-party integrations",
    },
    {
      id: "notifications",
      icon: Bell,
      title: "Notifications",
      description: "Configure your notification preferences",
    },
    {
      id: "billing",
      icon: CreditCard,
      title: "Billing",
      description: "Manage your subscription and payments",
    },
    {
      id: "security",
      icon: Shield,
      title: "Security",
      description: "Security settings and audit logs",
    },
  ];

  const [activeSection, setActiveSection] = useState("profile");

  const renderSectionContent = () => {
    switch (activeSection) {
      case "profile":
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="w-10 h-10 text-primary" />
              </div>
              <div>
                <Button variant="outline" size="sm">Upload Photo</Button>
                <p className="text-xs text-muted-foreground mt-2">JPG, PNG or GIF, max 2MB</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={profile.name}
                  onChange={(e) => setProfile({...profile, name: e.target.value})}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({...profile, email: e.target.value})}
                  className="mt-1"
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  value={profile.company}
                  onChange={(e) => setProfile({...profile, company: e.target.value})}
                  className="mt-1"
                />
              </div>
            </div>
            
            <div className="pt-4 border-t border-border">
              <Button variant="outline">Change Password</Button>
            </div>
          </div>
        );
        
      case "team":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-heading font-semibold text-lg text-foreground">Team Members</h3>
                <p className="text-sm text-muted-foreground">Manage who has access to this workspace</p>
              </div>
              <Button>
                <Users className="w-4 h-4 mr-2" />
                Invite Team Member
              </Button>
            </div>
            
            <div className="glass rounded-lg overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Member</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Role</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Last Active</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <User className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium text-foreground">Demo User</div>
                          <div className="text-xs text-muted-foreground">demo@tourflow.app</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                        Owner
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        <span className="text-sm">Active</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">Just now</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-yellow-500 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Team Collaboration</h4>
                  <p className="text-sm text-muted-foreground">
                    Upgrade to Team or Business plan to invite more members and collaborate on tours.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
        
      case "api":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-heading font-semibold text-lg text-foreground">API Keys</h3>
                <p className="text-sm text-muted-foreground">Manage keys for API access and integrations</p>
              </div>
              <Button onClick={handleGenerateApiKey}>
                <Key className="w-4 h-4 mr-2" />
                Generate New Key
              </Button>
            </div>
            
            <div className="space-y-4">
              {apiKeys.map((apiKey) => (
                <div key={apiKey.id} className="glass p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-medium text-foreground">{apiKey.name}</h4>
                      <p className="text-sm text-muted-foreground">Created {apiKey.created}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">Copy</Button>
                      <Button variant="outline" size="sm" className="text-destructive">Revoke</Button>
                    </div>
                  </div>
                  <div className="font-mono text-sm bg-secondary/30 p-3 rounded">
                    {apiKey.key}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="pt-6 border-t border-border">
              <h4 className="font-heading font-semibold text-lg text-foreground mb-4">Webhook Integrations</h4>
              <div className="glass p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="font-medium text-foreground">Webhook URL</h5>
                    <p className="text-sm text-muted-foreground">Receive real-time tour analytics</p>
                  </div>
                  <Switch />
                </div>
                <Input
                  placeholder="https://your-webhook-url.com"
                  className="mt-3 font-mono text-sm"
                />
              </div>
            </div>
          </div>
        );
        
      case "notifications":
        return (
          <div className="space-y-6">
            <h3 className="font-heading font-semibold text-lg text-foreground">Notification Preferences</h3>
            
            <div className="space-y-4">
              {Object.entries(preferences).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between p-4 glass rounded-lg">
                  <div>
                    <Label className="font-medium">
                      {key.replace(/([A-Z])/g, ' $1').replace(/^\w/, c => c.toUpperCase())}
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      {key === 'emailNotifications' && 'Receive email notifications'}
                      {key === 'tourPublishedNotifications' && 'Get notified when tours are published'}
                      {key === 'analyticsWeeklyReport' && 'Receive weekly analytics reports'}
                      {key === 'darkMode' && 'Toggle dark mode preference'}
                      {key === 'language' && 'Choose your preferred language'}
                    </p>
                  </div>
                  {typeof value === 'boolean' ? (
                    <Switch
                      checked={value}
                      onCheckedChange={(checked) => setPreferences({...preferences, [key]: checked})}
                    />
                  ) : (
                    <select
                      value={value}
                      onChange={(e) => setPreferences({...preferences, [key]: e.target.value})}
                      className="bg-card border border-border rounded-lg px-3 py-2 text-sm"
                    >
                      {key === 'darkMode' ? (
                        <>
                          <option value="auto">Auto</option>
                          <option value="light">Light</option>
                          <option value="dark">Dark</option>
                        </>
                      ) : (
                        <>
                          <option value="en">English</option>
                          <option value="es">Spanish</option>
                          <option value="fr">French</option>
                        </>
                      )}
                    </select>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
        
      case "billing":
        return (
          <div className="space-y-6">
            <div className="glass p-6 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-heading font-semibold text-lg text-foreground">Current Plan</h3>
                  <p className="text-sm text-muted-foreground">Free Trial • 14 days remaining</p>
                </div>
                <Button variant="hero">
                  <CreditCard className="w-4 h-4 mr-2" />
                  Upgrade Plan
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border border-border rounded-lg">
                  <h4 className="font-semibold text-foreground mb-2">Starter</h4>
                  <p className="text-2xl font-bold text-foreground mb-2">$0<span className="text-sm text-muted-foreground">/mo</span></p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      3 Active Tours
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      Basic Analytics
                    </li>
                  </ul>
                </div>
                
                <div className="p-4 border-2 border-primary rounded-lg bg-primary/5 relative">
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                    <span className="px-2 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                      Recommended
                    </span>
                  </div>
                  <h4 className="font-semibold text-foreground mb-2">Pro</h4>
                  <p className="text-2xl font-bold text-foreground mb-2">$29<span className="text-sm text-muted-foreground">/mo</span></p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      Unlimited Tours
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      Advanced Analytics
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      Team Collaboration
                    </li>
                  </ul>
                </div>
                
                <div className="p-4 border border-border rounded-lg">
                  <h4 className="font-semibold text-foreground mb-2">Business</h4>
                  <p className="text-2xl font-bold text-foreground mb-2">$99<span className="text-sm text-muted-foreground">/mo</span></p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      Everything in Pro
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      Custom Branding
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      Priority Support
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="glass p-6 rounded-lg">
              <h4 className="font-heading font-semibold text-lg text-foreground mb-4">Billing History</h4>
              <div className="text-center py-8 text-muted-foreground">
                <CreditCard className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No billing history available</p>
              </div>
            </div>
          </div>
        );
        
      case "security":
        return (
          <div className="space-y-6">
            <div className="glass p-6 rounded-lg">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-heading font-semibold text-lg text-foreground">Security</h3>
                  <p className="text-sm text-muted-foreground">Manage your account security settings</p>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-green-500" />
                  <span className="font-medium text-green-600">Secure</span>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg">
                  <div>
                    <h4 className="font-medium text-foreground">Two-Factor Authentication</h4>
                    <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                  </div>
                  <Button variant="outline">Enable 2FA</Button>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg">
                  <div>
                    <h4 className="font-medium text-foreground">Login History</h4>
                    <p className="text-sm text-muted-foreground">Review recent account activity</p>
                  </div>
                  <Button variant="outline">View Logs</Button>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg">
                  <div>
                    <h4 className="font-medium text-foreground">Export Data</h4>
                    <p className="text-sm text-muted-foreground">Download all your data</p>
                  </div>
                  <Button variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Export All Data
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="glass p-6 rounded-lg border border-destructive/30">
              <h4 className="font-heading font-semibold text-lg text-destructive mb-4">Danger Zone</h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="font-medium text-foreground">Delete Account</h5>
                    <p className="text-sm text-muted-foreground">Permanently delete your account and all data</p>
                  </div>
                  <Button variant="destructive">Delete Account</Button>
                </div>
              </div>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-sidebar border-r border-sidebar-border transform transition-transform duration-300 lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-4 border-b border-sidebar-border flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-heading font-bold text-lg text-sidebar-foreground">
                TourFlow
              </span>
            </Link>
            <button
              className="lg:hidden p-2 text-sidebar-foreground"
              onClick={() => setIsSidebarOpen(false)}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Nav Links */}
          <nav className="flex-1 p-4 space-y-1">
            {sidebarLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                  isActive(link.href)
                    ? "bg-primary/20 text-primary border border-primary/30"
                    : "text-sidebar-foreground hover:bg-sidebar-accent"
                }`}
              >
                <link.icon className="w-5 h-5" />
                <span className="text-sm font-medium">{link.label}</span>
                {isActive(link.href) && (
                  <div className="ml-auto w-2 h-2 rounded-full bg-primary" />
                )}
              </Link>
            ))}
          </nav>

          {/* User */}
          <div className="p-4 border-t border-sidebar-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-sidebar-accent flex items-center justify-center">
                <User className="w-5 h-5 text-sidebar-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium text-sidebar-foreground">{profile.name}</p>
                <p className="text-xs text-muted-foreground">{profile.email}</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 lg:pl-64">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 glass-strong border-b border-border">
          <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
            <div className="flex items-center gap-4">
              <button
                className="lg:hidden p-2 text-foreground"
                onClick={() => setIsSidebarOpen(true)}
              >
                <Menu className="w-5 h-5" />
              </button>
              <h1 className="font-heading font-bold text-xl text-foreground">Settings</h1>
            </div>
            <Button variant="hero" size="sm" onClick={handleSave} disabled={isSaving}>
              {isSaving ? (
                <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </header>

        <div className="p-4 sm:p-6 lg:p-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Settings Sidebar */}
            <div className="lg:w-64 flex-shrink-0">
              <div className="glass rounded-xl overflow-hidden">
                <div className="px-6 py-4 border-b border-border">
                  <h2 className="font-heading font-semibold text-lg text-foreground">Settings</h2>
                </div>
                <nav className="p-2">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`flex items-center gap-3 w-full p-3 rounded-lg transition-colors ${
                        activeSection === section.id
                          ? "bg-primary/10 text-primary"
                          : "text-foreground hover:bg-secondary"
                      }`}
                    >
                      <section.icon className="w-5 h-5" />
                      <div className="flex-1 text-left">
                        <div className="font-medium">{section.title}</div>
                        <div className="text-xs text-muted-foreground">{section.description}</div>
                      </div>
                      {activeSection === section.id && (
                        <ChevronRight className="w-4 h-4" />
                      )}
                    </button>
                  ))}
                </nav>
              </div>
              
              {/* Version Info */}
              <div className="mt-4 glass p-4 rounded-xl">
                <div className="flex items-center gap-3">
                  <Globe className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <div className="text-sm font-medium text-foreground">TourFlow</div>
                    <div className="text-xs text-muted-foreground">Version 1.0.0</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Settings Content */}
            <div className="flex-1">
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="glass rounded-xl overflow-hidden"
              >
                <div className="px-6 py-4 border-b border-border">
                  <h2 className="font-heading font-semibold text-lg text-foreground">
                    {sections.find(s => s.id === activeSection)?.title}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {sections.find(s => s.id === activeSection)?.description}
                  </p>
                </div>
                <div className="p-6">
                  {renderSectionContent()}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}