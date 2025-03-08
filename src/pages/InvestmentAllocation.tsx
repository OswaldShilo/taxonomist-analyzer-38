
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowLeft, PieChart, TrendingUp, AlertCircle, BarChart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Logo from "@/components/Logo";
import { 
  PieChart as RechartsPie, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip, 
  BarChart as RechartsBar, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid 
} from "recharts";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

const InvestmentAllocation = () => {
  const navigate = useNavigate();
  const [budget, setBudget] = useState("");
  const [results, setResults] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleCalculate = async () => {
    const budgetNum = Number(budget);
    if (budgetNum < 5000) {
      setError("Minimum budget should be ₹5000 crores");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("https://taxonomi-backend.onrender.com/api/allocate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ budget: budgetNum })
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || "Failed to calculate allocation");
      }

      setResults(data);
      setError("");

    } catch (err) {
      setError(err.message);
      setResults(null);
    } finally {
      setIsLoading(false);
    }
  };

  const formatCurrency = (value: number) => 
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(value);

  const formatPercentage = (value: number) => 
    `${value?.toFixed(2)}%`;

  return (
    <div className="min-h-screen bg-cover bg-center bg-fixed" style={{ 
      backgroundImage: 'url("/photo-1486312338219-ce68d2c6f44d")',
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      backgroundBlendMode: 'overlay'
    }}>
      <div className="min-h-screen backdrop-blur-sm py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <Button variant="ghost" onClick={() => navigate("/")} className="flex items-center gap-2 bg-white/80 hover:bg-white/90">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
            <div className="flex items-center">
              <Logo />
            </div>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-12">
            <div className="text-center max-w-2xl mx-auto bg-white/80 p-8 rounded-2xl backdrop-blur-md">
              <h1 className="text-4xl font-bold text-primary mb-4">Investment Allocation</h1>
              <p className="text-secondary text-lg">
                Enter your budget to get AI-powered expenditure recommendations
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Input Section */}
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="bg-white/90 p-8 rounded-2xl shadow-lg backdrop-blur-md">
                <div className="space-y-6">
                  <div>
                    <label className="text-lg font-medium mb-3 block text-primary">
                      Investment Budget (₹ Crores)
                    </label>
                    <Input
                      type="number"
                      value={budget}
                      onChange={(e) => {
                        setBudget(e.target.value);
                        setError("");
                      }}
                      placeholder="Enter amount (min. ₹5000 crores)"
                      min="5000"
                      className="text-lg py-6"
                    />
                    {error && (
                      <div className="flex items-center gap-2 text-red-500 mt-2">
                        <AlertCircle className="h-4 w-4" />
                        <span>{error}</span>
                      </div>
                    )}
                  </div>

                  <Button 
                    size="lg" 
                    className="w-full bg-primary hover:bg-primary/90 py-6 text-lg"
                    onClick={handleCalculate}
                    disabled={isLoading}
                  >
                    <PieChart className="mr-3 h-5 w-5" />
                    {isLoading ? "Analyzing..." : "Generate Allocation"}
                  </Button>
                </div>
              </motion.div>

              {/* Results Section */}
              {results && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                  {/* Main Allocation Pie Chart */}
                  <div className="bg-white/90 p-8 rounded-2xl shadow-lg backdrop-blur-md">
                    <h3 className="text-2xl font-semibold mb-6 text-primary">Main Sector Allocation</h3>
                    <div className="h-64 mb-8">
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartsPie>
                          <Pie
                            data={Object.entries(results.main_allocations).map(([name, value]) => ({
                              name,
                              value
                            }))}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            label
                          >
                            {Object.keys(results.main_allocations).map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip formatter={formatCurrency} />
                        </RechartsPie>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Historical vs Recent Trends */}
                  <div className="bg-white/90 p-8 rounded-2xl shadow-lg backdrop-blur-md">
                    <h3 className="text-2xl font-semibold mb-6 text-primary">Historical vs Recent Trends</h3>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartsBar 
                          data={Object.keys(results.main_allocations).map(sector => ({
                            sector,
                            historical: results.historical[sector],
                            recent: results.recent_trends[sector]
                          }))}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="sector" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="historical" fill="#8884d8" name="Historical Average" />
                          <Bar dataKey="recent" fill="#82ca9d" name="Recent Trend" />
                        </RechartsBar>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Insights and Growth Rates */}
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-green-50/90 p-6 rounded-xl border border-green-200">
                      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-green-700">
                        <TrendingUp className="h-5 w-5" /> Key Insights
                      </h3>
                      <ul className="space-y-2">
                        {results.insights.map((insight: string, index: number) => (
                          <li key={index} className="text-green-600">• {insight}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-blue-50/90 p-6 rounded-xl border border-blue-200">
                      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-blue-700">
                        <BarChart className="h-5 w-5" /> Growth Rates
                      </h3>
                      <div className="space-y-2">
                        {Object.entries(results.growth_rates).map(([sector, rate]) => (
                          <div key={sector} className="flex justify-between">
                            <span className="text-blue-600">{sector}</span>
                            <span className="font-semibold">{Number(rate).toFixed(2)}%</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Subsector Allocations */}
                  <div className="bg-white/90 p-8 rounded-2xl shadow-lg backdrop-blur-md">
                    <h3 className="text-2xl font-semibold mb-6 text-primary">Top Subsector Allocations</h3>
                    <div className="space-y-4">
                      {Object.entries(results.subsectors).map(([subsector, amount], index) => (
                        <div key={subsector} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                            <span className="font-medium">{subsector}</span>
                          </div>
                          <span className="font-semibold">{formatCurrency(amount as number)}</span>
                        </div>
                      ))}
                    </div>
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
