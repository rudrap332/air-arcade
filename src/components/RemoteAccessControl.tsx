
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ComputerIcon, Smartphone, Gamepad, MonitorSmartphone, Cable, CheckCircle2, XCircle } from "lucide-react";
import { toast } from "sonner";

type RemoteAccessControlProps = {
  onConnect: (deviceId: string, deviceType: string) => void;
  onDisconnect: () => void;
  isConnected: boolean;
  connectedDevice?: string;
};

const RemoteAccessControl = ({
  onConnect,
  onDisconnect,
  isConnected,
  connectedDevice
}: RemoteAccessControlProps) => {
  const [deviceId, setDeviceId] = useState('');
  const [deviceType, setDeviceType] = useState('pc');
  
  const handleConnect = () => {
    if (!deviceId) {
      toast.error("Please enter a device ID");
      return;
    }
    
    onConnect(deviceId, deviceType);
  };
  
  return (
    <Card className="border border-border/50">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <MonitorSmartphone className="w-5 h-5 text-primary" />
          <span>Remote Access Control</span>
          {isConnected && (
            <div className="flex items-center ml-auto gap-2 text-green-500">
              <CheckCircle2 className="w-4 h-4" />
              <span className="text-xs font-normal">Connected</span>
            </div>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!isConnected ? (
          <>
            <div className="space-y-2">
              <label className="text-sm font-medium">Device Type</label>
              <Select 
                value={deviceType} 
                onValueChange={setDeviceType}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select device type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pc">
                    <div className="flex items-center gap-2">
                      <ComputerIcon className="w-4 h-4" />
                      <span>PC / Mac</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="mobile">
                    <div className="flex items-center gap-2">
                      <Smartphone className="w-4 h-4" />
                      <span>Mobile Device</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="console">
                    <div className="flex items-center gap-2">
                      <Gamepad className="w-4 h-4" />
                      <span>Game Console</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Device ID</label>
              <Input
                placeholder="Enter device ID or address..."
                value={deviceId}
                onChange={(e) => setDeviceId(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Enter the unique ID of the device you want to connect to.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-2 pt-2">
              <Button 
                variant="outline" 
                className="flex items-center gap-2"
                onClick={() => setDeviceId('quick-connect-000123')}
              >
                <Cable className="w-4 h-4" />
                <span>Quick Connect</span>
              </Button>
              <Button 
                onClick={handleConnect}
                className="flex items-center gap-2"
              >
                <MonitorSmartphone className="w-4 h-4" />
                <span>Connect</span>
              </Button>
            </div>
          </>
        ) : (
          <div className="space-y-4">
            <div className="rounded-md bg-primary/10 p-4">
              <div className="flex items-start gap-3">
                {deviceType === 'pc' && <ComputerIcon className="w-10 h-10 text-primary" />}
                {deviceType === 'mobile' && <Smartphone className="w-10 h-10 text-primary" />}
                {deviceType === 'console' && <Gamepad className="w-10 h-10 text-primary" />}
                <div>
                  <h3 className="font-medium text-sm">Connected to {connectedDevice}</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    You now have remote access to this device. Use the streaming controls to interact.
                  </p>
                  <Button 
                    variant="destructive" 
                    size="sm"
                    className="mt-3"
                    onClick={onDisconnect}
                  >
                    <XCircle className="w-4 h-4 mr-2" />
                    Disconnect
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Connection Quality</h4>
              <div className="h-2 bg-primary/20 rounded-full overflow-hidden">
                <div className="h-full bg-primary w-[85%]"></div>
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>85% - Good</span>
                <span>24ms latency</span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RemoteAccessControl;
