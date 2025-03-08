
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <img 
            src="/lovable-uploads/19a83dc0-8198-4795-aa66-ad45a5b5f9be.png" 
            alt="Taxonomist Logo" 
            className="h-12"
          />
        </Link>
        <div className="flex items-center gap-6">
          <a href="#features" className="text-secondary hover:text-primary transition-colors">Features</a>
          <a href="#security" className="text-secondary hover:text-primary transition-colors">
            Security Analysis
          </a>
          <a href="#team" className="text-secondary hover:text-primary transition-colors">Team</a>
          <Button className="bg-primary hover:bg-primary/90">
            Get Started <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
