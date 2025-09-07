
import React from 'react';
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Play,
  Pause,
  StopCircle,
  Maximize,
  Volume2,
  MonitorSmartphone,
  Gamepad
} from "lucide-react";

type StreamControlsProps = {
  isStreaming: boolean;
  onToggleStream: () => void;
  volume: number;
  onVolumeChange: (value: number[]) => void;
};

const StreamControls = ({
  isStreaming,
  onToggleStream,
  volume,
  onVolumeChange
}: StreamControlsProps) => {
  return (
    <div className="bg-secondary/50 rounded-md p-4 flex flex-wrap items-center gap-4">
      <div className="flex items-center gap-2">
        <Button 
          variant={isStreaming ? "destructive" : "default"}
          size="sm"
          onClick={onToggleStream}
        >
          {isStreaming ? (
            <>
              <StopCircle className="w-4 h-4 mr-2" />
              Stop
            </>
          ) : (
            <>
              <Play className="w-4 h-4 mr-2" />
              Start
            </>
          )}
        </Button>
        
        {isStreaming && (
          <Button variant="outline" size="sm">
            <Pause className="w-4 h-4 mr-2" />
            Pause
          </Button>
        )}
      </div>
      
      <div className="flex items-center gap-2 min-w-[200px]">
        <Volume2 className="w-4 h-4 text-muted-foreground" />
        <Slider
          value={[volume]}
          max={100}
          step={1}
          className="w-full"
          onValueChange={onVolumeChange}
        />
      </div>
      
      <div className="flex items-center gap-2 ml-auto">
        <Button variant="outline" size="sm">
          <MonitorSmartphone className="w-4 h-4 mr-2" />
          Change Screen
        </Button>
        <Button variant="outline" size="sm">
          <Gamepad className="w-4 h-4 mr-2" />
          Controls
        </Button>
        <Button variant="outline" size="icon">
          <Maximize className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default StreamControls;
