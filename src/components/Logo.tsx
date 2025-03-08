
import { Link } from "react-router-dom";

const Logo = ({ className = "" }: { className?: string }) => {
  return (
    <Link to="/" className="inline-block">
      <h1 className={`text-2xl font-bold text-gray-800 ${className}`}>
        Taxonomist
      </h1>
    </Link>
  );
};

export default Logo;
