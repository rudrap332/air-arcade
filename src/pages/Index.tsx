
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Monitor, 
  Gamepad2, 
  Zap, 
  ArrowRight, 
  Globe, 
  Shield, 
  Settings, 
  Users,
  Radio,
  Server
} from "lucide-react";
import { Link } from "react-router-dom";
import GameCard from "@/components/GameCard";
import PerformanceDashboard from "@/components/PerformanceDashboard";

const Index = () => {
  // Featured games
  const featuredGames = [
    {
      id: '1',
      title: 'Cyberpunk 2077',
      imageUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1091500/header.jpg',
      category: 'RPG',
      isPopular: true
    },
    {
      id: '2',
      title: 'Red Dead Redemption 2',
      imageUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1174180/header.jpg',
      category: 'Adventure',
      isPopular: true
    },
    {
      id: '3',
      title: 'Call of Duty: Modern Warfare',
      imageUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1938090/header.jpg',
      category: 'FPS',
      isPopular: false
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero section */}
      <section className="relative overflow-hidden pt-16">
        <div className="absolute inset-0 z-0 bg-grid-pattern opacity-20"></div>
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-accent/20 to-primary/20 animate-pulse-slow"></div>
        
        <div className="container relative z-10 px-4 py-20 md:py-32 md:px-6">
          <div className="grid gap-12 md:grid-cols-2 md:gap-8 items-center">
            <div>
              <Badge className="mb-4 px-3 py-1 bg-accent text-white">
                Next Generation Cloud Gaming
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl mb-6">
                Welcome to <span className="text-primary glow-text">Adda Arcade</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-md">
                Access top games through screen sharing with full control. No downloads, no waiting, just gaming.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild>
                  <Link to="/games">
                    <Gamepad2 className="mr-2 h-5 w-5" />
                    Browse Games
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/streaming">
                    <Radio className="mr-2 h-5 w-5" />
                    Start Streaming
                  </Link>
                </Button>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative w-full max-w-lg">
                <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-primary to-accent opacity-75 blur-lg animate-pulse-slow"></div>
                <Card className="relative z-10 border-border/50 overflow-hidden">
                  <CardContent className="p-0">
                    <img 
                      src="https://cdn.akamai.steamstatic.com/steam/apps/1091500/ss_d09106060fb7de9010a6c0526d3a605ac7ae03b3.1920x1080.jpg" 
                      alt="Cloud Gaming" 
                      className="w-full object-cover"
                    />
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features section */}
      <section className="py-16 bg-secondary/30">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">Platform Features</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our cloud gaming platform delivers high performance with complete transparency.
            </p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-4">
            <Card className="bg-card/50 border border-border/50">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 p-3 rounded-full bg-primary/10">
                    <Globe className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Play Anywhere</h3>
                  <p className="text-muted-foreground">
                    Stream games directly to your device without needing powerful hardware.
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-card/50 border border-border/50">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 p-3 rounded-full bg-primary/10">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Secure Sandbox</h3>
                  <p className="text-muted-foreground">
                    Advanced security ensures games don't affect host system integrity.
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-card/50 border border-border/50">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 p-3 rounded-full bg-primary/10">
                    <Settings className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Custom Settings</h3>
                  <p className="text-muted-foreground">
                    Adjust FPS, session duration, and other settings to optimize your experience.
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-card/50 border border-border/50">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 p-3 rounded-full bg-primary/10">
                    <Server className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Host Games</h3>
                  <p className="text-muted-foreground">
                    Share your games with friends and let them play through screen sharing.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Performance dashboard */}
      <section className="py-16">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">Real-Time Performance</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Monitor your connection and system performance in real-time for an optimal gaming experience.
            </p>
          </div>
          
          <PerformanceDashboard />
        </div>
      </section>

      {/* Featured games */}
      <section className="py-16 bg-secondary/30">
        <div className="container px-4 md:px-6">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold mb-2">Featured Games</h2>
              <p className="text-muted-foreground">
                The latest and greatest titles ready to play instantly.
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link to="/games">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <div className="grid gap-6 md:grid-cols-3">
            {featuredGames.map((game) => (
              <GameCard 
                key={game.id}
                id={game.id}
                title={game.title}
                imageUrl={game.imageUrl}
                category={game.category}
                isPopular={game.isPopular}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="py-16">
        <div className="container px-4 md:px-6">
          <div className="relative overflow-hidden rounded-lg p-8 md:p-12">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 animate-pulse-slow"></div>
            <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
            
            <div className="relative z-10 text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to Start Gaming?</h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join thousands of gamers who are already enjoying the freedom of cloud gaming.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button size="lg" asChild>
                  <Link to="/streaming">
                    <Radio className="mr-2 h-5 w-5" />
                    Start Streaming
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/hosting">
                    <Server className="mr-2 h-5 w-5" />
                    Host a Game
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
