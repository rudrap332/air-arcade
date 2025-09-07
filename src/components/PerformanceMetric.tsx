
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  Activity, 
  Wifi, 
  Gauge, 
  Cpu, 
  MonitorSmartphone
} from "lucide-react";

type MetricProps = {
  type: 'connection' | 'latency' | 'fps' | 'cpu' | 'gpu';
  value: number;
  label: string;
  maxValue?: number;
  unit?: string;
  status?: 'good' | 'medium' | 'poor';
};

const PerformanceMetric = ({ 
  type, 
  value, 
  label, 
  maxValue = 100, 
  unit = '', 
  status = 'good' 
}: MetricProps) => {
  const getStatusColor = () => {
    switch (status) {
      case 'good':
        return 'text-green-500';
      case 'medium':
        return 'text-yellow-500';
      case 'poor':
        return 'text-red-500';
      default:
        return 'text-green-500';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'connection':
        return <Wifi className={`w-5 h-5 ${getStatusColor()}`} />;
      case 'latency':
        return <Gauge className={`w-5 h-5 ${getStatusColor()}`} />;
      case 'fps':
        return <Activity className={`w-5 h-5 ${getStatusColor()}`} />;
      case 'cpu':
        return <Cpu className={`w-5 h-5 ${getStatusColor()}`} />;
      case 'gpu':
        return <MonitorSmartphone className={`w-5 h-5 ${getStatusColor()}`} />;
      default:
        return <Activity className={`w-5 h-5 ${getStatusColor()}`} />;
    }
  };

  // Calculate progress percentage
  const progressPercentage = (value / maxValue) * 100;

  return (
    <Card className="border border-border/50 bg-secondary/50">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            {getIcon()}
            <span className="font-medium">{label}</span>
          </div>
          <span className="text-sm font-bold">
            {value}{unit}
            {maxValue !== 100 && ` / ${maxValue}${unit}`}
          </span>
        </div>
        <Progress value={progressPercentage} className="h-2" />
      </CardContent>
    </Card>
  );
};

export default PerformanceMetric;
