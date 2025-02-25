
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calculator } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const GdpCalculator = () => {
  const navigate = useNavigate();
  const [result, setResult] = useState<number | null>(null);
  const [inputs, setInputs] = useState({
    unemploymentRate: "",
    personalConsumption: "",
    governmentExpenditure: "",
    m1: "",
    m2: "",
    federalDebt: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value
    });
  };

  const calculateGDP = () => {
    // This is a placeholder calculation - will be replaced later
    const staticMultiplier = 1.5;
    const sum = Object.values(inputs).reduce((acc, val) => acc + Number(val), 0);
    setResult(sum * staticMultiplier);
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{ 
        backgroundImage: 'url("/photo-1498050108023-c5249f4df085")',
        backgroundColor: 'rgba(255, 255, 255, 0.97)',
        backgroundBlendMode: 'overlay'
      }}
    >
      <div className="min-h-screen backdrop-blur-sm py-8 px-4">
        <div className="max-w-2xl mx-auto">
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
            className="space-y-8 bg-white/90 p-8 rounded-2xl shadow-lg backdrop-blur-md"
          >
            <div>
              <h1 className="text-4xl font-bold text-primary mb-4">GDP Calculator</h1>
              <p className="text-secondary text-lg">
                Enter the economic indicators below to calculate the estimated GDP (in ₹ Crores).
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="text-lg font-medium mb-3 block text-primary">
                  Unemployment Rate (%)
                </label>
                <Input
                  type="number"
                  name="unemploymentRate"
                  value={inputs.unemploymentRate}
                  onChange={handleInputChange}
                  placeholder="Enter unemployment rate"
                  step="0.1"
                  className="text-lg py-6"
                />
              </div>

              <div>
                <label className="text-lg font-medium mb-3 block text-primary">
                  Personal Consumption Expenditure (₹ Crores)
                </label>
                <Input
                  type="number"
                  name="personalConsumption"
                  value={inputs.personalConsumption}
                  onChange={handleInputChange}
                  placeholder="Enter personal consumption"
                  className="text-lg py-6"
                />
              </div>

              <div>
                <label className="text-lg font-medium mb-3 block text-primary">
                  Government Expenditure (₹ Crores)
                </label>
                <Input
                  type="number"
                  name="governmentExpenditure"
                  value={inputs.governmentExpenditure}
                  onChange={handleInputChange}
                  placeholder="Enter government expenditure"
                  className="text-lg py-6"
                />
              </div>

              <div>
                <label className="text-lg font-medium mb-3 block text-primary">
                  M1 Money Supply (₹ Crores)
                </label>
                <Input
                  type="number"
                  name="m1"
                  value={inputs.m1}
                  onChange={handleInputChange}
                  placeholder="Enter M1 money supply"
                  className="text-lg py-6"
                />
              </div>

              <div>
                <label className="text-lg font-medium mb-3 block text-primary">
                  M2 Money Supply (₹ Crores)
                </label>
                <Input
                  type="number"
                  name="m2"
                  value={inputs.m2}
                  onChange={handleInputChange}
                  placeholder="Enter M2 money supply"
                  className="text-lg py-6"
                />
              </div>

              <div>
                <label className="text-lg font-medium mb-3 block text-primary">
                  Federal Debt (₹ Crores)
                </label>
                <Input
                  type="number"
                  name="federalDebt"
                  value={inputs.federalDebt}
                  onChange={handleInputChange}
                  placeholder="Enter federal debt"
                  className="text-lg py-6"
                />
              </div>
            </div>

            <Button 
              size="lg" 
              className="w-full bg-primary hover:bg-primary/90 py-8 text-lg"
              onClick={calculateGDP}
            >
              <Calculator className="mr-3 h-5 w-5" />
              Calculate GDP
            </Button>

            {result !== null && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-8 bg-accent rounded-xl border border-accent"
              >
                <h3 className="text-xl font-semibold mb-2 text-primary">Estimated GDP</h3>
                <p className="text-4xl font-bold text-primary">
                  ₹{result.toLocaleString()} Crores
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default GdpCalculator;
