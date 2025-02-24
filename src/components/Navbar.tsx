
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="text-xl font-semibold text-primary">Taxonomist</div>
        <div className="flex items-center gap-6">
          <a href="#features" className="text-secondary hover:text-primary transition-colors">Features</a>
          <a href="#how-it-works" className="text-secondary hover:text-primary transition-colors">How it Works</a>
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
