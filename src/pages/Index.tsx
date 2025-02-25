
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import { ArrowRight, Brain, ChartBarIcon, Shield, Linkedin, Calculator, PieChart, Info } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6 }}
          className="container mx-auto text-center"
        >
          <div className="inline-block mb-4 px-4 py-1 bg-accent rounded-full text-sm font-medium text-primary">
            Introducing Taxonomist
          </div>
          <h1 className="text-5xl font-bold text-primary mb-6 max-w-3xl mx-auto leading-tight">
            Predict Tax Policy Success with Machine Learning
          </h1>
          <p className="text-secondary text-xl mb-8 max-w-2xl mx-auto">
            Make informed decisions about tax policies using our advanced ML model. Get instant predictions and comprehensive analysis.
          </p>
          <div className="flex gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90"
              onClick={() => navigate("/calculator")}
            >
              <Calculator className="mr-2 h-4 w-4" />
              GDP Calculator
            </Button>
            <div className="flex gap-2">
              <Button 
                size="lg" 
                className="bg-blue-500 hover:bg-blue-600"
                onClick={() => navigate("/investment-allocation")}
              >
                <PieChart className="mr-2 h-4 w-4" />
                Investment Allocation
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-blue-500 text-blue-500 hover:bg-blue-50"
                onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Info className="mr-2 h-4 w-4" />
                Learn More
              </Button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-accent">
        <div className="container mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold text-primary text-center mb-12"
          >
            Key Features
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Brain className="w-12 h-12 text-primary mb-4" />,
                title: "ML-Powered Analysis",
                description: "Advanced machine learning algorithms analyze tax policy effectiveness."
              },
              {
                icon: <ChartBarIcon className="w-12 h-12 text-primary mb-4" />,
                title: "Accurate Predictions",
                description: "Get detailed predictions based on historical data and economic indicators."
              },
              {
                icon: <Shield className="w-12 h-12 text-primary mb-4" />,
                title: "Reliable Results",
                description: "Trust in our validated model with proven accuracy rates."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                {feature.icon}
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-secondary">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-20">
        <div className="container mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold text-primary text-center mb-12"
          >
            Meet Our Team
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Abishai KC",
                role: "ML Engineer",
                image: "https://api.dicebear.com/7.x/initials/svg?seed=AK&backgroundColor=2D3648&textColor=ffffff",
                linkedin: "https://www.linkedin.com/in/abishai-k-c-6a5288271/"
              },
              {
                name: "Mohamed Ahsan",
                role: "Data Scientist",
                image: "https://api.dicebear.com/7.x/initials/svg?seed=MA&backgroundColor=2D3648&textColor=ffffff",
                linkedin: "https://www.linkedin.com/in/mohamedahsan037/"
              },
              {
                name: "Jai Surya",
                role: "UX/UI Designer",
                image: "https://api.dicebear.com/7.x/initials/svg?seed=JS&backgroundColor=2D3648&textColor=ffffff",
                linkedin: "https://www.linkedin.com/in/jai-surya-1801abc/"
              }
            ].map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-32 h-32 rounded-full mx-auto mb-6 filter grayscale hover:grayscale-0 transition-all duration-300" 
                />
                <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                <p className="text-secondary mb-6">{member.role}</p>
                <Button 
                  variant="outline" 
                  className="w-full hover:bg-primary hover:text-white transition-colors"
                  onClick={() => window.open(member.linkedin, '_blank')}
                >
                  <Linkedin className="mr-2 h-4 w-4" />
                  Connect on LinkedIn
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
