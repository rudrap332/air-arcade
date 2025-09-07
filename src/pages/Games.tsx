
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Search, 
  Filter,
  GamepadIcon
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GameCard from "@/components/GameCard";

// Game categories
const categories = [
  "All",
  "Action",
  "Adventure",
  "RPG",
  "Strategy",
  "Sports",
  "Racing",
  "FPS",
  "Horror"
];

// Sample games data
const gamesData = [
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
  },
  {
    id: '4',
    title: 'FIFA 23',
    imageUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1811260/header.jpg',
    category: 'Sports',
    isPopular: false
  },
  {
    id: '5',
    title: 'Grand Theft Auto V',
    imageUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/271590/header.jpg',
    category: 'Action',
    isPopular: true
  },
  {
    id: '6',
    title: 'Forza Horizon 5',
    imageUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1551360/header.jpg',
    category: 'Racing',
    isPopular: false
  },
  {
    id: '7',
    title: 'The Witcher 3',
    imageUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/292030/header.jpg',
    category: 'RPG',
    isPopular: false
  },
  {
    id: '8',
    title: 'Resident Evil 4',
    imageUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/2050650/header.jpg',
    category: 'Horror',
    isPopular: false
  },
  {
    id: '9',
    title: 'Civilization VI',
    imageUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/289070/header.jpg',
    category: 'Strategy',
    isPopular: false
  }
];

const Games = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  // Filter games based on search query and active category
  const filteredGames = gamesData.filter((game) => {
    const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || game.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen pt-16 pb-16">
      <div className="container px-4 py-8 md:px-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
            <GamepadIcon className="w-7 h-7 text-primary" />
            <span>Game Library</span>
          </h1>
          <p className="text-muted-foreground">
            Browse and play from our extensive collection of games.
          </p>
        </div>
        
        {/* Search and filter */}
        <div className="flex flex-col gap-4 mb-8 md:flex-row md:items-center">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search games..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon" className="md:ml-2">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Categories tabs */}
        <Tabs defaultValue="All" value={activeCategory} onValueChange={setActiveCategory} className="mb-8">
          <TabsList className="mb-4 overflow-x-auto flex w-full py-2 overflow-y-hidden whitespace-nowrap">
            {categories.map((category) => (
              <TabsTrigger key={category} value={category} className="px-4">
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {/* Game grid */}
          <TabsContent value={activeCategory} className="mt-0">
            {filteredGames.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredGames.map((game) => (
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
            ) : (
              <div className="text-center py-20">
                <h3 className="text-xl font-medium mb-2">No games found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search or filters to find what you're looking for.
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Games;
