
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowLeft, PieChart, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { PieChart as RechartsChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const InvestmentAllocation = () => {
  const navigate = useNavigate();
  const [budget, setBudget] = useState("");
  const [results, setResults] = useState<{ name: string; value: number }[] | null>(null);
  const [gdpIncrease, setGdpIncrease] = useState<number | null>(null);
  const [error, setError] = useState("");

  // Colors for the sectors
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  const handleCalculate = async () => {
    const budgetNum = Number(budget);
    if (budgetNum < 5000) {
      setError("Minimum budget should be 5000 crores");
      return;
    }
    
    // Using the exact output from your ML model
    const mockResults = [
      { name: "Metallurgical Industries", value: (budgetNum * 8829.48) / 50000 },
      { name: "Mining", value: (budgetNum * 9437.07) / 50000 },
      { name: "Power", value: (budgetNum * 9614.16) / 50000 },
      { name: "Non-conventional Energy", value: (budgetNum * 9751.16) / 50000 },
      { name: "Petroleum & Natural Gas", value: (budgetNum * 12368.13) / 50000 }
    ];
    
    setResults(mockResults);
    // Calculate a mock GDP increase based on the investment
    // This is a placeholder calculation - replace with actual model prediction
    const mockGdpIncrease = (budgetNum / 50000) * 2.5; // 2.5% increase for 50000 crores
    setGdpIncrease(mockGdpIncrease);
    setError("");
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/")}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>
          <div className="text-xl font-semibold text-primary">Taxonomist</div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div>
            <h1 className="text-3xl font-bold text-primary mb-2">Investment Allocation</h1>
            <p className="text-secondary mb-6">
              Enter your budget to get ML-powered sector-wise investment recommendations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Investment Budget (Crores)
                </label>
                <Input
                  type="number"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  placeholder="Enter amount (min. 5000 crores)"
                  min="5000"
                />
                {error && (
                  <p className="text-red-500 text-sm mt-1">{error}</p>
                )}
              </div>

              <Button 
                size="lg" 
                className="w-full bg-primary hover:bg-primary/90"
                onClick={handleCalculate}
              >
                <PieChart className="mr-2 h-4 w-4" />
                Calculate Allocation
              </Button>
            </div>

            {results && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-6"
              >
                <div className="bg-accent rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4">Recommended Allocation</h3>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsChart>
                        <Pie
                          data={results}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, value }) => `${Math.round(value)} Cr`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {results.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </RechartsChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-4 space-y-2">
                    {results.map((item, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div 
                            className="w-3 h-3 rounded-full" 
                            style={{ backgroundColor: COLORS[index % COLORS.length] }}
                          />
                          <span>{item.name}</span>
                        </div>
                        <span className="font-medium">{Math.round(item.value)} Cr</span>
                      </div>
                    ))}
                  </div>
                </div>

                {gdpIncrease !== null && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-green-50 rounded-lg p-6 border border-green-200"
                  >
                    <div className="flex items-center gap-2 text-green-700 mb-2">
                      <TrendingUp className="h-5 w-5" />
                      <h3 className="text-lg font-semibold">Projected GDP Impact</h3>
                    </div>
                    <p className="text-3xl font-bold text-green-700">
                      +{gdpIncrease.toFixed(2)}% GDP Growth
                    </p>
                    <p className="text-sm text-green-600 mt-2">
                      Estimated annual GDP growth based on optimal sector allocation
                    </p>
                  </motion.div>
                )}
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default InvestmentAllocation;
