
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import { ArrowRight, Brain, ChartBarIcon, Shield } from "lucide-react";
import { motion } from "framer-motion";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center">
          <div className="inline-block mb-4 px-4 py-1 bg-accent rounded-full text-sm font-medium text-primary animate-fade-in">
            Introducing Taxonomist
          </div>
          <h1 className="text-5xl font-bold text-primary mb-6 max-w-3xl mx-auto leading-tight animate-fade-up">
            Predict Tax Policy Success with Machine Learning
          </h1>
          <p className="text-secondary text-xl mb-8 max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: "0.1s" }}>
            Make informed decisions about tax policies using our advanced ML model. Get instant predictions and comprehensive analysis.
          </p>
          <div className="flex gap-4 justify-center animate-fade-up" style={{ animationDelay: "0.2s" }}>
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-accent">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-primary text-center mb-12">Key Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Brain className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">ML-Powered Analysis</h3>
              <p className="text-secondary">Advanced machine learning algorithms analyze tax policy effectiveness.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <ChartBarIcon className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Accurate Predictions</h3>
              <p className="text-secondary">Get detailed predictions based on historical data and economic indicators.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Shield className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Reliable Results</h3>
              <p className="text-secondary">Trust in our validated model with proven accuracy rates.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-primary text-center mb-12">Meet Our Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-accent p-6 rounded-lg text-center">
              <img src="https://api.dicebear.com/7.x/initials/svg?seed=AK" alt="Abishai KC" className="w-24 h-24 rounded-full mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Abishai KC</h3>
              <p className="text-secondary mb-4">ML Engineer</p>
              <a href="https://www.linkedin.com/in/abishai-k-c-6a5288271/" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80">
                View LinkedIn
              </a>
            </div>
            <div className="bg-accent p-6 rounded-lg text-center">
              <img src="https://api.dicebear.com/7.x/initials/svg?seed=MA" alt="Mohamed Ahsan" className="w-24 h-24 rounded-full mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Mohamed Ahsan</h3>
              <p className="text-secondary mb-4">Data Scientist</p>
              <a href="https://www.linkedin.com/in/mohamedahsan037/" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80">
                View LinkedIn
              </a>
            </div>
            <div className="bg-accent p-6 rounded-lg text-center">
              <img src="https://api.dicebear.com/7.x/initials/svg?seed=JS" alt="Jai Surya" className="w-24 h-24 rounded-full mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Jai Surya</h3>
              <p className="text-secondary mb-4">Backend Developer</p>
              <a href="https://www.linkedin.com/in/jai-surya-1801abc/" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80">
                View LinkedIn
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
