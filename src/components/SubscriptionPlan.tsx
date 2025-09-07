
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

type PlanFeature = {
  text: string;
  available: boolean;
};

type SubscriptionPlanProps = {
  title: string;
  price: number;
  period: 'month' | 'year';
  features: PlanFeature[];
  isPopular?: boolean;
  isActive?: boolean;
};

const SubscriptionPlan = ({ 
  title, 
  price, 
  period, 
  features, 
  isPopular = false,
  isActive = false
}: SubscriptionPlanProps) => {
  return (
    <Card className={`border ${isActive ? 'border-primary glow-effect' : isPopular ? 'border-accent glow-accent' : 'border-border/50'} relative h-full flex flex-col`}>
      {isPopular && (
        <Badge className="absolute top-0 right-0 translate-x-1/4 -translate-y-1/2 bg-accent text-white">
          Most Popular
        </Badge>
      )}
      {isActive && (
        <Badge className="absolute top-0 right-0 translate-x-1/4 -translate-y-1/2 bg-primary text-white">
          Current Plan
        </Badge>
      )}
      <CardHeader className="pb-2 pt-6">
        <h3 className="text-xl font-bold">{title}</h3>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="mb-4">
          <span className="text-3xl font-bold">${price}</span>
          <span className="text-sm text-muted-foreground">/{period}</span>
        </div>
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2">
              <Check className={`w-5 h-5 mt-0.5 ${feature.available ? 'text-primary' : 'text-muted-foreground'}`} />
              <span className={feature.available ? '' : 'text-muted-foreground line-through'}>
                {feature.text}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button 
          variant={isActive ? "outline" : isPopular ? "default" : "secondary"} 
          className="w-full"
        >
          {isActive ? "Manage Plan" : "Get Started"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SubscriptionPlan;
