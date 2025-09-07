
import React from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play } from "lucide-react";

type GameCardProps = {
  id: string;
  title: string;
  imageUrl: string;
  category: string;
  isPopular?: boolean;
};

const GameCard = ({ id, title, imageUrl, category, isPopular = false }: GameCardProps) => {
  return (
    <Card className="overflow-hidden border border-border/50 bg-card/50 transition-all duration-300 hover:shadow-md hover:shadow-primary/20 hover:border-primary/50">
      <div className="relative aspect-video overflow-hidden">
        <img 
          src={imageUrl} 
          alt={title} 
          className="object-cover w-full h-full transition-transform duration-500 hover:scale-105" 
        />
        {isPopular && (
          <Badge 
            variant="default" 
            className="absolute top-2 right-2 bg-accent text-white"
          >
            Popular
          </Badge>
        )}
      </div>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-bold text-lg">{title}</h3>
            <p className="text-xs text-muted-foreground">{category}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full gap-2">
          <Play className="w-4 h-4" />
          <span>Play Now</span>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default GameCard;
