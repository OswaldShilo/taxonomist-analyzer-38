
import { Link } from "react-router-dom";

const Logo = ({ className = "" }: { className?: string }) => {
  return (
    <Link to="/" className="inline-block">
      <img 
        src="/lovable-uploads/19a83dc0-8198-4795-aa66-ad45a5b5f9be.png" 
        alt="Taxonomist Logo" 
        className={`h-10 ${className}`}
      />
    </Link>
  );
};

export default Logo;
