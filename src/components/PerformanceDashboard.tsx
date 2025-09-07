
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Activity, 
  Wifi, 
  Clock,
  Share2
} from "lucide-react";
import PerformanceMetric from "./PerformanceMetric";

const PerformanceDashboard = () => {
  return (
    <Card className="border border-border/50 bg-card/80">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-primary" />
            <span>Performance Dashboard</span>
          </CardTitle>
          <Badge variant="outline" className="px-3 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse-slow"></span>
            <span>Live</span>
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <Wifi className="w-4 h-4 text-primary" />
                <span>Connection</span>
              </div>
              <Badge variant="secondary">Stable</Badge>
            </div>
            <PerformanceMetric 
              type="connection" 
              value={95} 
              label="Connection Strength" 
              status="good" 
            />
            <PerformanceMetric 
              type="latency" 
              value={22} 
              label="Latency" 
              maxValue={100} 
              unit="ms" 
              status="good" 
            />
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <Share2 className="w-4 h-4 text-primary" />
                <span>System Performance</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>45:21 remaining</span>
              </div>
            </div>
            <PerformanceMetric 
              type="fps" 
              value={60} 
              label="FPS" 
              maxValue={144} 
              status="good" 
            />
            <PerformanceMetric 
              type="cpu" 
              value={45} 
              label="CPU Utilization" 
              unit="%" 
              status="good" 
            />
            <PerformanceMetric 
              type="gpu" 
              value={68} 
              label="GPU Utilization" 
              unit="%" 
              status="medium" 
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PerformanceDashboard;
