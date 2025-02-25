
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const LearnMore = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/")}
          className="mb-8 hover:bg-accent"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-12"
        >
          <section>
            <h1 className="text-4xl font-bold text-primary mb-6">Understanding Our Estimation System</h1>
            <p className="text-xl text-secondary leading-relaxed">
              Our platform leverages advanced machine learning algorithms to analyze historical trends and patterns, helping users make data-driven decisions with accurate predictions and estimations.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-4">How It Works</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-accent/50 p-6 rounded-lg">
                <h3 className="text-xl font-medium mb-3">Data Analysis</h3>
                <p className="text-secondary">
                  We collect and analyze historical data points and trends to identify patterns and correlations that inform our prediction models.
                </p>
              </div>
              <div className="bg-accent/50 p-6 rounded-lg">
                <h3 className="text-xl font-medium mb-3">ML Predictions</h3>
                <p className="text-secondary">
                  Our machine learning models process the analyzed data to generate accurate estimates and predictions for future trends.
                </p>
              </div>
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
              Ready to leverage the power of data-driven predictions? Try our GDP Calculator and Investment Allocation tools to see the system in action.
            </p>
            <div className="flex gap-4">
              <Button 
                onClick={() => navigate("/calculator")}
                className="bg-primary hover:bg-primary/90"
              >
                Try GDP Calculator
              </Button>
              <Button 
                onClick={() => navigate("/investment-allocation")}
                variant="outline"
                className="border-primary text-primary hover:bg-primary/5"
              >
                Investment Allocation
              </Button>
            </div>
          </section>
        </motion.div>
      </div>
    </div>
  );
};

export default LearnMore;
