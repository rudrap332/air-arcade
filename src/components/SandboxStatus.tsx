
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Shield, CheckCircle, Lock, Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const SandboxStatus = () => {
  return (
    <Card className="border border-border/50">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-primary" />
          <span>Secure Sandbox Status</span>
          <Badge variant="outline" className="ml-2 bg-green-500/10 text-green-500 border-green-500/50">
            Active
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Our secure sandboxing technology ensures games don't affect host system integrity.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium">Resource Isolation</h4>
                <p className="text-xs text-muted-foreground">
                  Games run in isolated virtual environments with limited system access.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium">Process Monitoring</h4>
                <p className="text-xs text-muted-foreground">
                  Real-time monitoring prevents unauthorized system access.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium">Memory Protection</h4>
                <p className="text-xs text-muted-foreground">
                  Memory spaces are strictly isolated to prevent overflow attacks.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium">Filesystem Protection</h4>
                <p className="text-xs text-muted-foreground">
                  Read-only access to system files prevents unauthorized modifications.
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between pt-2 border-t border-border/50">
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-primary" />
              <span className="text-sm">Security Level: Enhanced</span>
            </div>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Info className="w-4 h-4" />
                  <span className="sr-only">More info</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="w-[200px] text-xs">
                  Enhanced security includes real-time monitoring, 
                  vulnerability scanning, and automated threat response.
                </p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SandboxStatus;
