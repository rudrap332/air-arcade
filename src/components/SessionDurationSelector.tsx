
import React from 'react';
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Clock } from "lucide-react";

type SessionDurationSelectorProps = {
  value: number;
  onChange: (value: number) => void;
};

const SessionDurationSelector = ({ value, onChange }: SessionDurationSelectorProps) => {
  const presetOptions = [60, 90, 120];

  // Handle slider change
  const handleSliderChange = (newValue: number[]) => {
    onChange(newValue[0]);
  };

  // Handle radio change
  const handleRadioChange = (newValue: string) => {
    onChange(parseInt(newValue, 10));
  };

  // Format minutes to hours and minutes
  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    
    if (hours === 0) {
      return `${mins} minutes`;
    } else if (mins === 0) {
      return `${hours} hour${hours > 1 ? 's' : ''}`;
    } else {
      return `${hours} hour${hours > 1 ? 's' : ''} ${mins} min`;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <Clock className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-medium">Session Duration</h3>
      </div>
      
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label>Duration: {formatDuration(value)}</Label>
            <span className="text-xs text-muted-foreground">
              Longer sessions = more gameplay time
            </span>
          </div>
          <Slider 
            value={[value]} 
            min={30} 
            max={120} 
            step={15} 
            onValueChange={handleSliderChange} 
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>30 min</span>
            <span>2 hours</span>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Preset Options</Label>
          <RadioGroup 
            defaultValue={value.toString()} 
            className="grid grid-cols-3 gap-2"
            onValueChange={handleRadioChange}
          >
            {presetOptions.map((duration) => (
              <div key={duration} className="flex items-center space-x-2">
                <RadioGroupItem value={duration.toString()} id={`duration-${duration}`} />
                <Label htmlFor={`duration-${duration}`}>{formatDuration(duration)}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      </div>
    </div>
  );
};

export default SessionDurationSelector;
