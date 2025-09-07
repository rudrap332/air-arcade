
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LogOut, UserCog } from 'lucide-react';

const Profile = () => {
  const { user, isAuthenticated, logout } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="container flex items-center justify-center min-h-screen py-20">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <Avatar className="h-24 w-24">
              <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${user?.name}`} alt={user?.name} />
              <AvatarFallback>{user?.name?.charAt(0) || 'U'}</AvatarFallback>
            </Avatar>
          </div>
          <CardTitle className="text-2xl font-bold">{user?.name}</CardTitle>
          <CardDescription>{user?.email}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border rounded-md p-4 bg-muted/50">
            <h3 className="font-medium flex items-center gap-2 mb-2">
              <UserCog className="h-4 w-4" />
              Account Information
            </h3>
            <div className="text-sm text-muted-foreground">
              <p>User ID: {user?.id}</p>
              <p>Account created: {new Date().toLocaleDateString()}</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button onClick={handleLogout} variant="outline" className="w-full">
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Profile;
