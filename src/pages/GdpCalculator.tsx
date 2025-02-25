
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calculator } from "lucide-react";
import { useNavigate } from "react-router-dom";

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
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-2xl mx-auto">
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

        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-primary mb-2">GDP Calculator</h1>
            <p className="text-secondary mb-6">
              Enter the economic indicators below to calculate the estimated GDP.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Unemployment Rate (%)</label>
              <Input
                type="number"
                name="unemploymentRate"
                value={inputs.unemploymentRate}
                onChange={handleInputChange}
                placeholder="Enter unemployment rate"
                step="0.1"
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Personal Consumption Expenditure ($B)</label>
              <Input
                type="number"
                name="personalConsumption"
                value={inputs.personalConsumption}
                onChange={handleInputChange}
                placeholder="Enter personal consumption"
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Federal Government Current Expenditure ($B)</label>
              <Input
                type="number"
                name="governmentExpenditure"
                value={inputs.governmentExpenditure}
                onChange={handleInputChange}
                placeholder="Enter government expenditure"
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">M1 Money Supply ($B)</label>
              <Input
                type="number"
                name="m1"
                value={inputs.m1}
                onChange={handleInputChange}
                placeholder="Enter M1 money supply"
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">M2 Money Supply ($B)</label>
              <Input
                type="number"
                name="m2"
                value={inputs.m2}
                onChange={handleInputChange}
                placeholder="Enter M2 money supply"
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Federal Debt ($B)</label>
              <Input
                type="number"
                name="federalDebt"
                value={inputs.federalDebt}
                onChange={handleInputChange}
                placeholder="Enter federal debt"
              />
            </div>
          </div>

          <Button 
            size="lg" 
            className="w-full bg-primary hover:bg-primary/90"
            onClick={calculateGDP}
          >
            <Calculator className="mr-2 h-4 w-4" />
            Calculate GDP
          </Button>

          {result !== null && (
            <div className="mt-6 p-6 bg-accent rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Estimated GDP</h3>
              <p className="text-3xl font-bold text-primary">
                ${result.toLocaleString()} Billion
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GdpCalculator;
