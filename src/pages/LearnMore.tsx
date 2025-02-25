
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
            <h1 className="text-4xl font-bold text-primary mb-6">Understanding Tax Policy Success</h1>
            <p className="text-xl text-secondary leading-relaxed">
              Our platform leverages advanced machine learning algorithms to analyze and predict the success of tax policies, helping policymakers and analysts make data-driven decisions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-4">How It Works</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-accent/50 p-6 rounded-lg">
                <h3 className="text-xl font-medium mb-3">Data Collection</h3>
                <p className="text-secondary">
                  We aggregate historical tax policy data, economic indicators, and implementation outcomes from reliable sources to build our prediction models.
                </p>
              </div>
              <div className="bg-accent/50 p-6 rounded-lg">
                <h3 className="text-xl font-medium mb-3">ML Analysis</h3>
                <p className="text-secondary">
                  Our ML models analyze patterns in historical data to identify key success factors and potential risks in tax policy implementation.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-4">Key Benefits</h2>
            <ul className="space-y-4 text-secondary">
              <li className="flex items-start gap-3">
                <span className="font-semibold">1.</span>
                <p>Make informed decisions based on historical data and ML predictions</p>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-semibold">2.</span>
                <p>Identify potential risks and challenges before implementation</p>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-semibold">3.</span>
                <p>Optimize resource allocation for maximum policy effectiveness</p>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-semibold">4.</span>
                <p>Track and analyze policy performance in real-time</p>
              </li>
            </ul>
          </section>

          <section className="bg-primary/5 p-8 rounded-xl">
            <h2 className="text-2xl font-semibold text-primary mb-4">Get Started Today</h2>
            <p className="text-secondary mb-6">
              Ready to enhance your tax policy decision-making? Use our GDP Calculator and Investment Allocation tools to get started.
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
