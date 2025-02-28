
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowLeft, PieChart, TrendingUp, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { PieChart as RechartsChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { useToast } from "@/hooks/use-toast";

const InvestmentAllocation = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [budget, setBudget] = useState("");
  const [results, setResults] = useState<{ name: string; value: number }[] | null>(null);
  const [gdpIncrease, setGdpIncrease] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  const handleCalculate = async () => {
    const budgetNum = Number(budget);
    if (budgetNum < 5000) {
      setError("Minimum budget should be 5000 crores");
      return;
    }
    
    setIsLoading(true);
    setError("");
    
    try {
      // Replace this URL with your actual Colab API endpoint
      const response = await fetch('https://your-colab-api-endpoint.com/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ budget: budgetNum }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch data from the model');
      }
      
      const data = await response.json();
      
      // Assuming the API returns an object with allocation data and gdp impact
      // Adjust this according to your actual API response structure
      if (data.allocations && data.gdpImpact) {
        const formattedResults = data.allocations.map((item: any) => ({
          name: item.sector,
          value: item.amount
        }));
        
        setResults(formattedResults);
        setGdpIncrease(data.gdpImpact);
        
        toast({
          title: "Calculation Successful",
          description: "Investment allocation has been calculated based on the model.",
        });
      } else {
        throw new Error('Invalid response format from the model');
      }
    } catch (error) {
      console.error('Error fetching data from the model:', error);
      setError("Failed to get allocation data. Using fallback calculations.");
      
      // Fallback to the previous mock calculations if API fails
      const mockResults = [
        { name: "Metallurgical Industries", value: (budgetNum * 8829.48) / 50000 },
        { name: "Mining", value: (budgetNum * 9437.07) / 50000 },
        { name: "Power", value: (budgetNum * 9614.16) / 50000 },
        { name: "Non-conventional Energy", value: (budgetNum * 9751.16) / 50000 },
        { name: "Petroleum & Natural Gas", value: (budgetNum * 12368.13) / 50000 }
      ];
      
      setResults(mockResults);
      const mockGdpIncrease = (budgetNum / 50000) * 2.5;
      setGdpIncrease(mockGdpIncrease);
      
      toast({
        title: "Using Fallback Data",
        description: "Could not connect to the AI model. Using estimated calculations instead.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{ 
        backgroundImage: 'url("/photo-1486312338219-ce68d2c6f44d")',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        backgroundBlendMode: 'overlay'
      }}
    >
      <div className="min-h-screen backdrop-blur-sm py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <Button 
              variant="ghost" 
              onClick={() => navigate("/")}
              className="flex items-center gap-2 bg-white/80 hover:bg-white/90"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
            <div className="text-xl font-semibold text-primary bg-white/80 px-4 py-2 rounded-full">
              Taxonomist
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-12"
          >
            <div className="text-center max-w-2xl mx-auto bg-white/80 p-8 rounded-2xl backdrop-blur-md">
              <h1 className="text-4xl font-bold text-primary mb-4">Investment Allocation</h1>
              <p className="text-secondary text-lg">
                Enter your budget to get ML-powered sector-wise investment recommendations.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white/90 p-8 rounded-2xl shadow-lg backdrop-blur-md"
              >
                <div className="space-y-6">
                  <div>
                    <label className="text-lg font-medium mb-3 block text-primary">
                      Investment Budget (Crores)
                    </label>
                    <Input
                      type="number"
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      placeholder="Enter amount (min. 5000 crores)"
                      min="5000"
                      className="text-lg py-6"
                    />
                    {error && (
                      <p className="text-red-500 text-sm mt-2">{error}</p>
                    )}
                  </div>

                  <Button 
                    size="lg" 
                    className="w-full bg-primary hover:bg-primary/90 py-6 text-lg"
                    onClick={handleCalculate}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                    ) : (
                      <PieChart className="mr-3 h-5 w-5" />
                    )}
                    {isLoading ? "Calculating..." : "Calculate Allocation"}
                  </Button>
                </div>

                {gdpIncrease !== null && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-8 bg-green-50/90 rounded-xl p-6 border border-green-200"
                  >
                    <div className="flex items-center gap-3 text-green-700 mb-3">
                      <TrendingUp className="h-6 w-6" />
                      <h3 className="text-xl font-semibold">Projected GDP Impact</h3>
                    </div>
                    <p className="text-4xl font-bold text-green-700 mb-2">
                      +{gdpIncrease.toFixed(2)}% GDP Growth
                    </p>
                    <p className="text-sm text-green-600">
                      Estimated annual GDP growth based on optimal sector allocation
                    </p>
                  </motion.div>
                )}
              </motion.div>

              {results && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white/90 p-8 rounded-2xl shadow-lg backdrop-blur-md"
                >
                  <h3 className="text-2xl font-semibold mb-6 text-primary">Recommended Allocation</h3>
                  <div className="h-[300px] mb-8">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsChart>
                        <Pie
                          data={results}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ value }) => `${Math.round(value)} Cr`}
                          outerRadius={120}
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
                  <div className="space-y-3">
                    {results.map((item, index) => (
                      <div key={index} className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg transition-colors">
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-4 h-4 rounded-full" 
                            style={{ backgroundColor: COLORS[index % COLORS.length] }}
                          />
                          <span className="font-medium">{item.name}</span>
                        </div>
                        <span className="text-lg font-semibold">{Math.round(item.value)} Cr</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default InvestmentAllocation;
