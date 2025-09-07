
import React from 'react';
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Activity } from "lucide-react";

type FpsSelectorProps = {
  value: number;
  onChange: (value: number) => void;
};

const FpsSelector = ({ value, onChange }: FpsSelectorProps) => {
  const presetOptions = [30, 60, 120, 144];

  // Handle slider change
  const handleSliderChange = (newValue: number[]) => {
    onChange(newValue[0]);
  };

  // Handle radio change
  const handleRadioChange = (newValue: string) => {
    onChange(parseInt(newValue, 10));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <Activity className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-medium">FPS Settings</h3>
      </div>
      
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label>Custom FPS: {value}</Label>
            <span className="text-xs text-muted-foreground">
              Higher FPS = Smoother gameplay, more bandwidth
            </span>
          </div>
          <Slider 
            value={[value]} 
            min={30} 
            max={144} 
            step={1} 
            onValueChange={handleSliderChange} 
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>30 FPS</span>
            <span>144 FPS</span>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Preset Options</Label>
          <RadioGroup 
            defaultValue={value.toString()} 
            className="grid grid-cols-4 gap-2"
            onValueChange={handleRadioChange}
          >
            {presetOptions.map((fps) => (
              <div key={fps} className="flex items-center space-x-2">
                <RadioGroupItem value={fps.toString()} id={`fps-${fps}`} />
                <Label htmlFor={`fps-${fps}`}>{fps} FPS</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      </div>
    </div>
  );
};

export default FpsSelector;
