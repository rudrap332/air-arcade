
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { 
  Server, 
  Cpu, 
  Shield, 
  HardDrive, 
  Wifi, 
  Share2,
  Copy,
  Check
} from "lucide-react";
import { toast } from "sonner";
import SandboxStatus from "@/components/SandboxStatus";

const Hosting = () => {
  const [isHosting, setIsHosting] = useState(false);
  const [gameCode, setGameCode] = useState('ADDA-1234-XYZW');
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    gameName: '',
    maxUsers: '1',
    enableSandbox: true,
    enableChat: true,
    allowScreenControl: true,
    restrictedAccess: false
  });
  
  const handleToggleHosting = () => {
    if (!isHosting && !formData.gameName) {
      toast.error("Please enter a game name to start hosting");
      return;
    }
    
    setIsHosting(!isHosting);
    
    if (!isHosting) {
      toast.success(`Started hosting: ${formData.gameName}`);
    } else {
      toast.info("Hosting session ended");
    }
  };
  
  const handleCopyCode = () => {
    navigator.clipboard.writeText(gameCode);
    setCopied(true);
    toast.success("Game code copied to clipboard");
    
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleToggleChange = (name: string, value: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  return (
    <div className="min-h-screen pt-16 pb-16">
      <div className="container px-4 py-8 md:px-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
            <Server className="w-7 h-7 text-primary" />
            <span>Game Hosting</span>
          </h1>
          <p className="text-muted-foreground">
            Share your games with others through secure cloud hosting.
          </p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2 space-y-6">
            {/* Hosting configuration */}
            <Card className="border border-border/50">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <Share2 className="w-5 h-5 text-primary" />
                  <span>Host Configuration</span>
                  {isHosting && (
                    <Badge className="ml-auto" variant="default">
                      Active
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium" htmlFor="gameName">
                      Game Name
                    </label>
                    <Input
                      id="gameName"
                      name="gameName"
                      placeholder="Enter game name..."
                      value={formData.gameName}
                      onChange={handleChange}
                      disabled={isHosting}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium" htmlFor="maxUsers">
                      Max Viewers
                    </label>
                    <Input
                      id="maxUsers"
                      name="maxUsers"
                      type="number"
                      min="1"
                      max="10"
                      placeholder="1"
                      value={formData.maxUsers}
                      onChange={handleChange}
                      disabled={isHosting}
                    />
                  </div>
                </div>
                
                <div className="space-y-4 pt-2">
                  <h3 className="text-sm font-medium">Security & Permissions</h3>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4 text-primary" />
                        <label htmlFor="enableSandbox" className="text-sm">
                          Enable Secure Sandbox
                        </label>
                      </div>
                      <Switch
                        id="enableSandbox"
                        checked={formData.enableSandbox}
                        onCheckedChange={(checked) => 
                          handleToggleChange('enableSandbox', checked)
                        }
                        disabled={isHosting}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Checkbox 
                          id="allowScreenControl"
                          checked={formData.allowScreenControl}
                          onCheckedChange={(checked) => 
                            handleToggleChange('allowScreenControl', checked === true)
                          }
                          disabled={isHosting}
                        />
                        <label htmlFor="allowScreenControl" className="text-sm">
                          Allow Screen Control
                        </label>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Checkbox 
                          id="enableChat"
                          checked={formData.enableChat}
                          onCheckedChange={(checked) => 
                            handleToggleChange('enableChat', checked === true)
                          }
                          disabled={isHosting}
                        />
                        <label htmlFor="enableChat" className="text-sm">
                          Enable Chat
                        </label>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Checkbox 
                          id="restrictedAccess"
                          checked={formData.restrictedAccess}
                          onCheckedChange={(checked) => 
                            handleToggleChange('restrictedAccess', checked === true)
                          }
                          disabled={isHosting}
                        />
                        <label htmlFor="restrictedAccess" className="text-sm">
                          Restricted Access (Invite Only)
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button 
                  size="lg"
                  variant={isHosting ? "destructive" : "default"}
                  onClick={handleToggleHosting}
                >
                  {isHosting ? "Stop Hosting" : "Start Hosting"}
                </Button>
              </CardFooter>
            </Card>
            
            {/* System requirements */}
            <Card className="border border-border/50">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-primary" />
                  <span>System Requirements</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    To ensure optimal hosting performance, your system should meet these requirements:
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Cpu className="w-4 h-4 text-primary" />
                        <h4 className="text-sm font-medium">Processor</h4>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Intel i5/i7 or AMD Ryzen 5/7 (4+ cores)
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <HardDrive className="w-4 h-4 text-primary" />
                        <h4 className="text-sm font-medium">Memory</h4>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        16GB RAM minimum, 32GB recommended
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Wifi className="w-4 h-4 text-primary" />
                        <h4 className="text-sm font-medium">Network</h4>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        25+ Mbps upload speed, wired connection
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Sandbox status */}
            <SandboxStatus />
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            {isHosting && (
              <Card className="border border-border/50 bg-primary/5 border-primary/20 sticky top-20">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-primary" />
                    <span>Hosting Status</span>
                    <Badge className="ml-auto animate-pulse" variant="default">
                      Live
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Share Game Code</h3>
                    <div className="flex gap-2">
                      <Input
                        value={gameCode}
                        readOnly
                        className="font-mono text-center"
                      />
                      <Button 
                        size="icon" 
                        variant="outline"
                        onClick={handleCopyCode}
                      >
                        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Share this code with viewers to let them connect to your game.
                    </p>
                  </div>
                  
                  <div className="space-y-2 pt-2">
                    <h3 className="text-sm font-medium">Session Info</h3>
                    <div className="rounded-md bg-secondary p-3 text-sm space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Game:</span>
                        <span className="font-medium">{formData.gameName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Viewers:</span>
                        <span className="font-medium">0/{formData.maxUsers}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Uptime:</span>
                        <span className="font-medium">00:05:32</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-2">
                    <Button variant="destructive" className="w-full" onClick={handleToggleHosting}>
                      End Hosting Session
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
            
            <Card className="border border-border/50">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <Server className="w-5 h-5 text-primary" />
                  <span>Hosting Benefits</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-4">
                  <div className="flex items-start gap-2">
                    <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Share Games Instantly</h4>
                      <p className="text-xs text-muted-foreground">
                        Let friends and viewers play your games without downloads.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Secure Sandbox Technology</h4>
                      <p className="text-xs text-muted-foreground">
                        Protect your system with advanced isolation techniques.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Earn Rewards</h4>
                      <p className="text-xs text-muted-foreground">
                        Get subscription credits by hosting popular games.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Stream and Play Together</h4>
                      <p className="text-xs text-muted-foreground">
                        Interactive gaming sessions with voice and chat.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hosting;
