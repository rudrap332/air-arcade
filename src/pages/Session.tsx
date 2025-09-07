
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Settings, 
  Play,
  Monitor,
  Info
} from "lucide-react";
import FpsSelector from "@/components/FpsSelector";
import SessionDurationSelector from "@/components/SessionDurationSelector";
import PerformanceDashboard from "@/components/PerformanceDashboard";

const Session = () => {
  const [fps, setFps] = useState(60);
  const [duration, setDuration] = useState(90);
  
  return (
    <div className="min-h-screen pt-16 pb-16">
      <div className="container px-4 py-8 md:px-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
            <Settings className="w-7 h-7 text-primary" />
            <span>Session Settings</span>
          </h1>
          <p className="text-muted-foreground">
            Configure your gaming session for optimal performance.
          </p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2 space-y-6">
            {/* Session configuration */}
            <Card className="border border-border/50">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5 text-primary" />
                  <span>Configure Your Session</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="performance" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="performance">Performance</TabsTrigger>
                    <TabsTrigger value="duration">Duration</TabsTrigger>
                  </TabsList>
                  <TabsContent value="performance" className="mt-4 space-y-4">
                    <FpsSelector value={fps} onChange={setFps} />
                  </TabsContent>
                  <TabsContent value="duration" className="mt-4 space-y-4">
                    <SessionDurationSelector value={duration} onChange={setDuration} />
                  </TabsContent>
                </Tabs>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button>
                  <Info className="w-4 h-4 mr-2" />
                  <span>Save Preferences</span>
                </Button>
              </CardFooter>
            </Card>
            
            {/* Performance dashboard */}
            <PerformanceDashboard />
          </div>
          
          {/* Start session card */}
          <div className="space-y-6">
            <Card className="border border-border/50 sticky top-20">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <Play className="w-5 h-5 text-primary" />
                  <span>Start Gaming</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="font-medium">Your Configuration</h3>
                  <div className="rounded-md bg-secondary p-3 text-sm space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">FPS Setting:</span>
                      <span className="font-medium">{fps} FPS</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Session Duration:</span>
                      <span className="font-medium">
                        {duration >= 60 
                          ? `${Math.floor(duration / 60)}h ${duration % 60 > 0 ? `${duration % 60}m` : ''}`
                          : `${duration}m`
                        }
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subscription:</span>
                      <span className="font-medium text-primary">Premium</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-3 border border-border rounded-md flex items-center gap-3">
                  <Monitor className="w-5 h-5 text-primary" />
                  <div className="text-sm">
                    <p className="font-medium">Return to Active Session</p>
                    <p className="text-muted-foreground">Cyberpunk 2077 - 45:21 remaining</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-3">
                <Button className="w-full">Start New Session</Button>
                <Button variant="outline" className="w-full">Resume Session</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Session;
