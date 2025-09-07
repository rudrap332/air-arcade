
import React, { useRef, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Radio, Shield, Monitor, Cpu } from "lucide-react";
import StreamControls from "@/components/StreamControls";
import SandboxStatus from "@/components/SandboxStatus";
import PerformanceDashboard from "@/components/PerformanceDashboard";
import RemoteAccessControl from "@/components/RemoteAccessControl";
import { toast } from "sonner";
import { connectOpenAIRealtime, type OpenAIRealtimeConnection } from "@/lib/openaiRealtime";

const Streaming = () => {
  const [isStreaming, setIsStreaming] = useState(false);
  const [volume, setVolume] = useState(80);
  const [gameCode, setGameCode] = useState('');
  const [isRemoteConnected, setIsRemoteConnected] = useState(false);
  const [connectedDevice, setConnectedDevice] = useState('');
  const [connectedDeviceType, setConnectedDeviceType] = useState('');
  const [aiConnected, setAiConnected] = useState(false);
  const aiAudioRef = useRef<HTMLAudioElement | null>(null);
  const aiConnRef = useRef<OpenAIRealtimeConnection | null>(null);
  const [aiPrompt, setAiPrompt] = useState("");
  
  const handleToggleStream = () => {
    if (!isStreaming && !gameCode && !isRemoteConnected) {
      toast.error("Please enter a game code or connect to a remote device");
      return;
    }
    
    setIsStreaming(!isStreaming);
    
    if (!isStreaming) {
      if (isRemoteConnected) {
        toast.success(`Started streaming from remote device: ${connectedDevice}`);
      } else {
        toast.success(`Started streaming game session: ${gameCode}`);
      }
    } else {
      toast.info("Streaming session ended");
    }
  };
  
  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
  };
  
  const handleRemoteConnect = (deviceId: string, deviceType: string) => {
    // In a real implementation, this would connect to an actual device via an API
    setIsRemoteConnected(true);
    setConnectedDevice(deviceId);
    setConnectedDeviceType(deviceType);
    toast.success(`Connected to remote device: ${deviceId}`);
  };
  
  const handleRemoteDisconnect = () => {
    if (isStreaming) {
      setIsStreaming(false);
    }
    setIsRemoteConnected(false);
    setConnectedDevice('');
    setConnectedDeviceType('');
    toast.info("Disconnected from remote device");
  };

  const handleConnectAI = async () => {
    try {
      if (aiConnected) return;
      const conn = await connectOpenAIRealtime({ audioElement: aiAudioRef.current });
      aiConnRef.current = conn;
      setAiConnected(true);
      toast.success("Connected to AI Realtime (OpenAI)");
    } catch (e: any) {
      toast.error(e?.message || "Failed to connect AI Realtime");
    }
  };

  const handleDisconnectAI = () => {
    try {
      aiConnRef.current?.stop();
    } catch {}
    aiConnRef.current = null;
    setAiConnected(false);
    if (aiAudioRef.current) {
      try { (aiAudioRef.current.srcObject as MediaStream | null)?.getTracks().forEach(t => t.stop()); } catch {}
      aiAudioRef.current.srcObject = null;
    }
    toast.info("AI Realtime disconnected");
  };
  
  return (
    <div className="min-h-screen pt-16 pb-16">
      <div className="container px-4 py-8 md:px-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
            <Radio className="w-7 h-7 text-primary" />
            <span>Game Streaming</span>
          </h1>
          <p className="text-muted-foreground">
            Stream games from our cloud servers or remote devices with low latency.
          </p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2 space-y-6">
            {/* Streaming display */}
            <Card className="border border-border/50 bg-black/80 relative">
              <CardContent className="p-0 aspect-video flex items-center justify-center">
                {isStreaming ? (
                  <img 
                    src={isRemoteConnected 
                      ? "https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/ss_e19665095f71db6ad408d08d409513143ca0cf93.1920x1080.jpg"
                      : "https://cdn.akamai.steamstatic.com/steam/apps/1091500/ss_d09106060fb7de9010a6c0526d3a605ac7ae03b3.1920x1080.jpg"
                    }
                    alt="Game stream" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-center p-6">
                    <Monitor className="w-16 h-16 text-primary/50 mx-auto mb-4" />
                    <h3 className="text-xl font-bold mb-2">Ready to Stream</h3>
                    <p className="text-muted-foreground mb-4">
                      {isRemoteConnected 
                        ? "Connected to remote device. Click Start to begin streaming."
                        : "Enter a game code or connect to a remote device and click Start to begin streaming."
                      }
                    </p>
                  </div>
                )}
              </CardContent>
              
              {/* Stream controls */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-sm">
                <StreamControls
                  isStreaming={isStreaming}
                  onToggleStream={handleToggleStream}
                  volume={volume}
                  onVolumeChange={handleVolumeChange}
                />
              </div>
            </Card>
            
            {/* Performance dashboard */}
            <PerformanceDashboard />
            
            {/* Sandbox status */}
            <SandboxStatus />

            {/* AI Realtime Audio Sink */}
            <div className="hidden">
              <audio ref={aiAudioRef} autoPlay playsInline />
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="border border-border/50 sticky top-20">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-primary" />
                  <span>Stream Settings</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Tabs defaultValue={isRemoteConnected ? "remote" : "cloud"}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="cloud">Cloud Gaming</TabsTrigger>
                    <TabsTrigger value="remote">Remote Access</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="cloud" className="space-y-4 pt-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium" htmlFor="gameCode">
                        Game Code
                      </label>
                      <Input
                        id="gameCode"
                        placeholder="Enter game code..."
                        value={gameCode}
                        onChange={(e) => setGameCode(e.target.value)}
                        disabled={isStreaming || isRemoteConnected}
                      />
                      <p className="text-xs text-muted-foreground">
                        Enter the code provided by the game host to connect.
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Resolution</label>
                      <div className="grid grid-cols-3 gap-2">
                        <Button variant="outline" size="sm" className="text-xs">720p</Button>
                        <Button variant="default" size="sm" className="text-xs">1080p</Button>
                        <Button variant="outline" size="sm" className="text-xs">4K</Button>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">FPS Limit</label>
                      <div className="grid grid-cols-3 gap-2">
                        <Button variant="outline" size="sm" className="text-xs">30</Button>
                        <Button variant="default" size="sm" className="text-xs">60</Button>
                        <Button variant="outline" size="sm" className="text-xs">120</Button>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="remote" className="space-y-4 pt-4">
                    <RemoteAccessControl
                      onConnect={handleRemoteConnect}
                      onDisconnect={handleRemoteDisconnect}
                      isConnected={isRemoteConnected}
                      connectedDevice={connectedDevice}
                    />
                  </TabsContent>
                </Tabs>
                
                {!isRemoteConnected && (
                  <div className="pt-4">
                    <Button 
                      className="w-full gap-2" 
                      variant={isStreaming ? "destructive" : "default"}
                      onClick={handleToggleStream}
                    >
                      {isStreaming ? "Stop Streaming" : "Start Streaming"}
                    </Button>
                  </div>
                )}

                {/* OpenAI Realtime Controls */}
                <div className="pt-2 grid grid-cols-2 gap-2">
                  <Button variant={aiConnected ? "secondary" : "default"} onClick={handleConnectAI} disabled={aiConnected}>
                    {aiConnected ? "AI Connected" : "Connect AI Voice"}
                  </Button>
                  <Button variant="outline" onClick={handleDisconnectAI} disabled={!aiConnected}>
                    Disconnect AI
                  </Button>
                </div>
                <div className="pt-2 grid grid-cols-3 gap-2">
                  <Input
                    placeholder="Ask AI..."
                    value={aiPrompt}
                    onChange={(e) => setAiPrompt(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && aiConnected && aiPrompt.trim()) {
                        aiConnRef.current?.sendText(aiPrompt.trim());
                        setAiPrompt("");
                      }
                    }}
                    className="col-span-2"
                    disabled={!aiConnected}
                  />
                  <Button
                    onClick={() => {
                      if (!aiConnected || !aiPrompt.trim()) return;
                      aiConnRef.current?.sendText(aiPrompt.trim());
                      setAiPrompt("");
                    }}
                    disabled={!aiConnected || !aiPrompt.trim()}
                  >
                    Send
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border border-border/50">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-primary" />
                  <span>Security Status</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2">
                  <div className="flex justify-between items-center py-2 border-b border-border/30">
                    <span className="text-sm">Connection</span>
                    <span className="text-sm text-green-500 font-medium">Secure</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-border/30">
                    <span className="text-sm">Encryption</span>
                    <span className="text-sm text-green-500 font-medium">Active</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-border/30">
                    <span className="text-sm">Sandbox</span>
                    <span className="text-sm text-green-500 font-medium">Enabled</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm">Host Verification</span>
                    <span className="text-sm text-green-500 font-medium">Verified</span>
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

export default Streaming;
