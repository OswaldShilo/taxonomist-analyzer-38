
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calculator, PieChart, Brain, Shield, ChartBarIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";

const LearnMore = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <div className="pt-32 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-12"
          >
            <section>
              <h1 className="text-4xl font-bold text-primary mb-6">Understanding Taxonomist</h1>
              <p className="text-xl text-secondary leading-relaxed">
                Taxonomist is an advanced analytics platform that leverages machine learning algorithms to analyze historical trends and patterns, helping users make data-driven decisions with accurate predictions and estimations.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">How It Works</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-accent/50 p-6 rounded-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <Brain className="w-10 h-10 text-primary" />
                    <h3 className="text-xl font-medium text-primary">Trend Analysis</h3>
                  </div>
                  <p className="text-secondary">
                    We collect and analyze historical data points to identify patterns and correlations that inform our prediction models.
                  </p>
                </div>
                <div className="bg-accent/50 p-6 rounded-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <ChartBarIcon className="w-10 h-10 text-primary" />
                    <h3 className="text-xl font-medium text-primary">Data-Driven Predictions</h3>
                  </div>
                  <p className="text-secondary">
                    Our machine learning models process the analyzed data to generate accurate estimates and predictions for future trends.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">Our Tools</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-accent/50 p-6 rounded-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <Calculator className="w-10 h-10 text-primary" />
                    <h3 className="text-xl font-medium text-primary">GDP Calculator</h3>
                  </div>
                  <p className="text-secondary mb-6">
                    Calculate estimated GDP based on key economic indicators including unemployment rate, consumption expenditure, and more.
                  </p>
                  <Button 
                    onClick={() => navigate("/calculator")}
                    className="w-full bg-primary hover:bg-primary/90"
                  >
                    Try GDP Calculator
                  </Button>
                </div>
                <div className="bg-accent/50 p-6 rounded-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <PieChart className="w-10 h-10 text-primary" />
                    <h3 className="text-xl font-medium text-primary">Investment Allocation</h3>
                  </div>
                  <p className="text-secondary mb-6">
                    Optimize investment portfolios based on risk tolerance, market conditions, and financial goals.
                  </p>
                  <Button 
                    onClick={() => navigate("/investment-allocation")}
                    className="w-full bg-primary hover:bg-primary/90"
                  >
                    Try Investment Allocation
                  </Button>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">Security Analysis</h2>
              <div className="bg-accent/50 p-6 rounded-lg">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="w-10 h-10 text-primary" />
                  <h3 className="text-xl font-medium text-primary">Model Security</h3>
                </div>
                <p className="text-secondary mb-6">
                  Our system employs advanced techniques to detect and prevent data poisoning attacks, ensuring the reliability of our predictions and analysis.
                </p>
                <Button 
                  onClick={() => navigate("/#security")}
                  className="w-full bg-primary hover:bg-primary/90"
                >
                  View Security Analysis
                </Button>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">Key Benefits</h2>
              <ul className="space-y-4 text-secondary">
                <li className="flex items-start gap-3">
                  <span className="font-semibold">1.</span>
                  <p>Make informed decisions based on historical data analysis</p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-semibold">2.</span>
                  <p>Identify emerging trends and patterns before they become obvious</p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-semibold">3.</span>
                  <p>Optimize resource allocation based on predictive analytics</p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-semibold">4.</span>
                  <p>Track and monitor prediction accuracy in real-time</p>
                </li>
              </ul>
            </section>

            <section className="bg-primary/5 p-8 rounded-xl">
              <h2 className="text-2xl font-semibold text-primary mb-4">Get Started Today</h2>
              <p className="text-secondary mb-6">
                Ready to leverage the power of data-driven predictions? Try our GDP Calculator and Investment Allocation tools to see Taxonomist in action.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button 
                  onClick={() => navigate("/calculator")}
                  className="bg-primary hover:bg-primary/90"
                >
                  <Calculator className="mr-2 h-4 w-4" />
                  GDP Calculator
                </Button>
                <Button 
                  onClick={() => navigate("/investment-allocation")}
                  className="bg-primary hover:bg-primary/90"
                >
                  <PieChart className="mr-2 h-4 w-4" />
                  Investment Allocation
                </Button>
                <Button 
                  onClick={() => navigate("/")}
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary/5"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Home
                </Button>
              </div>
            </section>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LearnMore;
