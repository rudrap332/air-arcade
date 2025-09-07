
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Gamepad2, 
  Settings, 
  Users, 
  LogIn, 
  Menu, 
  X,
  Radio,
  Server,
  UserCircle,
  LogOut
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/contexts/AuthContext";

const Navbar = () => {
  const isMobile = useIsMobile();
  const { isAuthenticated, user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-md">
      <div className="container flex items-center justify-between h-16 px-4 md:px-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="relative w-8 h-8">
            <img 
              src="/lovable-uploads/b9eaf087-3290-43de-a2a1-006953c80d80.png" 
              alt="Adda Arcade Logo" 
              className="w-full h-full object-contain filter brightness-0 invert opacity-80" 
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-70 mix-blend-screen"></div>
          </div>
          <span className="text-xl font-bold tracking-tight glow-text text-primary">Adda Arcade</span>
        </Link>

        {isMobile ? (
          <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        ) : (
          <nav className="flex items-center gap-6">
            <Link to="/games" className="text-sm font-medium transition-colors hover:text-primary">
              <div className="flex items-center gap-2">
                <Gamepad2 className="w-4 h-4" />
                <span>Games</span>
              </div>
            </Link>
            <Link to="/streaming" className="text-sm font-medium transition-colors hover:text-primary">
              <div className="flex items-center gap-2">
                <Radio className="w-4 h-4" />
                <span>Streaming</span>
              </div>
            </Link>
            <Link to="/hosting" className="text-sm font-medium transition-colors hover:text-primary">
              <div className="flex items-center gap-2">
                <Server className="w-4 h-4" />
                <span>Hosting</span>
              </div>
            </Link>
            <Link to="/session" className="text-sm font-medium transition-colors hover:text-primary">
              <div className="flex items-center gap-2">
                <Settings className="w-4 h-4" />
                <span>Session</span>
              </div>
            </Link>
            <Link to="/subscription" className="text-sm font-medium transition-colors hover:text-primary">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>Subscription</span>
              </div>
            </Link>
            
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <Link to="/profile">
                  <Button variant="outline" size="sm">
                    <UserCircle className="w-4 h-4 mr-2" />
                    {user?.name}
                  </Button>
                </Link>
                <Button variant="ghost" size="sm" onClick={() => logout()}>
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <Link to="/login">
                <Button variant="default">
                  <LogIn className="w-4 h-4 mr-2" />
                  <span>Sign In</span>
                </Button>
              </Link>
            )}
          </nav>
        )}
      </div>

      {isMobile && mobileMenuOpen && (
        <div className="fixed inset-0 top-16 z-40 flex flex-col bg-background border-t border-border/40">
          <nav className="flex flex-col gap-4 p-6">
            <Link 
              to="/games" 
              className="flex items-center gap-2 p-3 rounded-md hover:bg-secondary"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Gamepad2 className="w-5 h-5 text-primary" />
              <span className="text-lg font-medium">Games</span>
            </Link>
            <Link 
              to="/streaming" 
              className="flex items-center gap-2 p-3 rounded-md hover:bg-secondary"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Radio className="w-5 h-5 text-primary" />
              <span className="text-lg font-medium">Streaming</span>
            </Link>
            <Link 
              to="/hosting" 
              className="flex items-center gap-2 p-3 rounded-md hover:bg-secondary"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Server className="w-5 h-5 text-primary" />
              <span className="text-lg font-medium">Hosting</span>
            </Link>
            <Link 
              to="/session" 
              className="flex items-center gap-2 p-3 rounded-md hover:bg-secondary"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Settings className="w-5 h-5 text-primary" />
              <span className="text-lg font-medium">Session</span>
            </Link>
            <Link 
              to="/subscription" 
              className="flex items-center gap-2 p-3 rounded-md hover:bg-secondary"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Users className="w-5 h-5 text-primary" />
              <span className="text-lg font-medium">Subscription</span>
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link 
                  to="/profile" 
                  className="flex items-center gap-2 p-3 rounded-md hover:bg-secondary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <UserCircle className="w-5 h-5 text-primary" />
                  <span className="text-lg font-medium">Profile ({user?.name})</span>
                </Link>
                <Button 
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }} 
                  className="mt-4"
                  variant="outline"
                >
                  <LogOut className="w-5 h-5 mr-2" />
                  Sign Out
                </Button>
              </>
            ) : (
              <Button 
                className="mt-4 w-full" 
                size="lg"
                onClick={() => {
                  setMobileMenuOpen(false);
                  // Navigation will happen via the Link
                }}
              >
                <Link to="/login" className="flex items-center w-full justify-center">
                  <LogIn className="w-5 h-5 mr-2" />
                  <span>Sign In</span>
                </Link>
              </Button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
