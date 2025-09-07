
import React from 'react';
import { Link } from "react-router-dom";
import { Monitor, Github, Twitter, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border/40 bg-background">
      <div className="container px-4 py-8 md:px-6 md:py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="flex flex-col gap-2">
            <Link to="/" className="flex items-center gap-2">
              <Monitor className="w-6 h-6 text-primary" />
              <span className="text-xl font-bold tracking-tight">CloudPlay</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Play any game remotely with high performance and full control.
            </p>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-medium">Product</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/games" className="transition-colors hover:text-primary">
                  Games
                </Link>
              </li>
              <li>
                <Link to="/session" className="transition-colors hover:text-primary">
                  Session
                </Link>
              </li>
              <li>
                <Link to="/subscription" className="transition-colors hover:text-primary">
                  Subscription
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-medium">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="transition-colors hover:text-primary">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="transition-colors hover:text-primary">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="transition-colors hover:text-primary">
                  Privacy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="transition-colors hover:text-primary">
                  Terms
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-medium">Connect</h3>
            <div className="flex space-x-4">
              <a href="#" className="p-2 rounded-full hover:bg-secondary">
                <Github className="w-5 h-5" />
                <span className="sr-only">GitHub</span>
              </a>
              <a href="#" className="p-2 rounded-full hover:bg-secondary">
                <Twitter className="w-5 h-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="p-2 rounded-full hover:bg-secondary">
                <Mail className="w-5 h-5" />
                <span className="sr-only">Email</span>
              </a>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between gap-2 pt-8 mt-8 border-t border-border/40 md:flex-row">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} CloudPlay. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Crafted with care for gamers worldwide
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
