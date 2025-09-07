
import React from 'react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  CreditCard, 
  Users,
  MonitorSmartphone, 
  Zap,
  Clock,
  Activity
} from "lucide-react";
import SubscriptionPlan from "@/components/SubscriptionPlan";

const Subscription = () => {
  // Plan features
  const basicFeatures = [
    { text: "720p streaming", available: true },
    { text: "30 FPS maximum", available: true },
    { text: "1-hour session length", available: true },
    { text: "Standard games library", available: true },
    { text: "Standard support", available: true },
    { text: "1080p streaming", available: false },
    { text: "Premium games access", available: false },
    { text: "Priority support", available: false },
  ];
  
  const proFeatures = [
    { text: "1080p streaming", available: true },
    { text: "60 FPS maximum", available: true },
    { text: "1.5-hour session length", available: true },
    { text: "Full games library", available: true },
    { text: "Priority support", available: true },
    { text: "4K streaming", available: false },
    { text: "Exclusive early access", available: false },
    { text: "Dedicated hardware", available: false },
  ];
  
  const ultimateFeatures = [
    { text: "4K streaming", available: true },
    { text: "144 FPS maximum", available: true },
    { text: "2-hour session length", available: true },
    { text: "Full games library + early access", available: true },
    { text: "24/7 premium support", available: true },
    { text: "Offline downloads", available: true },
    { text: "Dedicated hardware", available: true },
    { text: "No wait times", available: true },
  ];

  return (
    <div className="min-h-screen pt-16 pb-16">
      <div className="container px-4 py-8 md:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-4 flex items-center justify-center gap-2">
            <CreditCard className="w-7 h-7 text-primary" />
            <span>Choose Your Plan</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Select the subscription that best fits your gaming needs. All plans include access to our cloud gaming platform with different performance tiers.
          </p>
        </div>
        
        {/* Subscription toggle */}
        <div className="mb-10">
          <Tabs defaultValue="monthly" className="w-full max-w-md mx-auto">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
              <TabsTrigger value="yearly">Yearly (Save 20%)</TabsTrigger>
            </TabsList>
            
            <TabsContent value="monthly" className="mt-6">
              <div className="grid gap-6 md:grid-cols-3">
                <SubscriptionPlan
                  title="Basic"
                  price={9.99}
                  period="month"
                  features={basicFeatures}
                  isPopular={false}
                />
                <SubscriptionPlan
                  title="Pro"
                  price={14.99}
                  period="month"
                  features={proFeatures}
                  isPopular={true}
                  isActive={true}
                />
                <SubscriptionPlan
                  title="Ultimate"
                  price={24.99}
                  period="month"
                  features={ultimateFeatures}
                  isPopular={false}
                />
              </div>
            </TabsContent>
            
            <TabsContent value="yearly" className="mt-6">
              <div className="grid gap-6 md:grid-cols-3">
                <SubscriptionPlan
                  title="Basic"
                  price={95.88}
                  period="year"
                  features={basicFeatures}
                  isPopular={false}
                />
                <SubscriptionPlan
                  title="Pro"
                  price={143.88}
                  period="year"
                  features={proFeatures}
                  isPopular={true}
                />
                <SubscriptionPlan
                  title="Ultimate"
                  price={239.88}
                  period="year"
                  features={ultimateFeatures}
                  isPopular={false}
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Feature comparison */}
        <div className="mt-20 mb-10">
          <h2 className="text-2xl font-bold text-center mb-10">Plan Features Comparison</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="text-left p-4">Feature</th>
                  <th className="p-4 text-center">Basic</th>
                  <th className="p-4 text-center bg-primary/5 border-x border-border/50">Pro</th>
                  <th className="p-4 text-center">Ultimate</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border/50">
                  <td className="p-4 flex items-center gap-2">
                    <MonitorSmartphone className="w-4 h-4 text-primary" />
                    <span>Resolution</span>
                  </td>
                  <td className="p-4 text-center">720p</td>
                  <td className="p-4 text-center bg-primary/5 border-x border-border/50">1080p</td>
                  <td className="p-4 text-center">Up to 4K</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="p-4 flex items-center gap-2">
                    <Activity className="w-4 h-4 text-primary" />
                    <span>Max FPS</span>
                  </td>
                  <td className="p-4 text-center">30 FPS</td>
                  <td className="p-4 text-center bg-primary/5 border-x border-border/50">60 FPS</td>
                  <td className="p-4 text-center">144 FPS</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="p-4 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-primary" />
                    <span>Session Duration</span>
                  </td>
                  <td className="p-4 text-center">1 hour</td>
                  <td className="p-4 text-center bg-primary/5 border-x border-border/50">1.5 hours</td>
                  <td className="p-4 text-center">2 hours</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="p-4 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-primary" />
                    <span>Hardware Priority</span>
                  </td>
                  <td className="p-4 text-center">Standard</td>
                  <td className="p-4 text-center bg-primary/5 border-x border-border/50">Priority</td>
                  <td className="p-4 text-center">Dedicated</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        {/* FAQ */}
        <div className="mt-20">
          <h2 className="text-2xl font-bold text-center mb-10">Frequently Asked Questions</h2>
          
          <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
            <div className="space-y-3">
              <h3 className="text-lg font-medium">How does cloud gaming work?</h3>
              <p className="text-muted-foreground">
                Our cloud gaming service runs games on powerful remote servers and streams the gameplay to your device in real-time. You control the game with minimal latency.
              </p>
            </div>
            
            <div className="space-y-3">
              <h3 className="text-lg font-medium">What internet speed do I need?</h3>
              <p className="text-muted-foreground">
                We recommend at least 15 Mbps for 720p, 25 Mbps for 1080p, and 35 Mbps for 4K streaming. A wired connection or strong Wi-Fi is preferred.
              </p>
            </div>
            
            <div className="space-y-3">
              <h3 className="text-lg font-medium">Can I play on any device?</h3>
              <p className="text-muted-foreground">
                Yes, you can play on computers, tablets, smartphones, and smart TVs with a web browser and internet connection. No powerful hardware needed.
              </p>
            </div>
            
            <div className="space-y-3">
              <h3 className="text-lg font-medium">Can I change my plan later?</h3>
              <p className="text-muted-foreground">
                Absolutely! You can upgrade or downgrade your subscription at any time. Changes take effect at the beginning of your next billing cycle.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Button size="lg" className="px-8">
              <Users className="mr-2 h-5 w-5" />
              <span>Get Started</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
