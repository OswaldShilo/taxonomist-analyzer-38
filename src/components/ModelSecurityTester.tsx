
import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer
} from "recharts";
import { AlertTriangle, CheckCircle, XCircle, Activity, Shield, Lock, Server } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { useSecurityDataStore } from "@/store/securityDataStore";

// Initial data for the charts
const initialAnomalyData = [
  { time: "0s", score: 0.2 },
  { time: "5s", score: 0.21 },
  { time: "10s", score: 0.22 },
  { time: "15s", score: 0.2 },
  { time: "20s", score: 0.19 },
];

const initialConfidenceData = [
  { time: "0s", confidence: 0.94 },
  { time: "5s", confidence: 0.94 },
  { time: "10s", confidence: 0.95 },
  { time: "15s", confidence: 0.94 },
  { time: "20s", confidence: 0.96 },
];

type LogEntry = {
  id: number;
  type: "success" | "warning" | "error";
  message: string;
  timestamp: string;
};

// Simulate a server-side storage
type StoredInput = {
  taxRate: string;
  gdpGrowth: string;
  inflation: string;
  unemployment: string;
  timestamp: string;
};

const ModelSecurityTester = () => {
  // Use our shared store
  const { addDataPoint, updateAnomalousInputs } = useSecurityDataStore();
  
  const [taxRate, setTaxRate] = useState("15");
  const [gdpGrowth, setGdpGrowth] = useState("5.2");
  const [inflation, setInflation] = useState("3.5");
  const [unemployment, setUnemployment] = useState("4.1");
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [anomalyData, setAnomalyData] = useState(initialAnomalyData);
  const [confidenceData, setConfidenceData] = useState(initialConfidenceData);
  const [isProcessing, setIsProcessing] = useState(false);
  const [serverVerification, setServerVerification] = useState(true);
  const [showBackendLogs, setShowBackendLogs] = useState(false);
  const { toast } = useToast();

  // Reference to store original inputs (simulates server-side storage)
  const originalInputsRef = useRef<StoredInput | null>(null);

  // Function to get current time in string format
  const getCurrentTime = () => {
    const now = new Date();
    return `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
  };

  // Add a log entry
  const addLog = (type: "success" | "warning" | "error", message: string) => {
    const newLog: LogEntry = {
      id: Date.now(),
      type,
      message,
      timestamp: getCurrentTime(),
    };
    setLogs(prev => [newLog, ...prev].slice(0, 50)); // Keep last 50 logs
  };

  // Simulate storing inputs on the server
  const storeOriginalInputs = () => {
    addLog("success", "Server: Original inputs stored securely.");
    console.log("Storing original inputs:", { taxRate, gdpGrowth, inflation, unemployment });
    
    // Store the original inputs
    originalInputsRef.current = {
      taxRate,
      gdpGrowth,
      inflation,
      unemployment,
      timestamp: getCurrentTime()
    };
  };

  // Validate inputs against stored originals
  const validateInputs = () => {
    if (!originalInputsRef.current) {
      addLog("error", "Server: No original inputs found for validation!");
      return false;
    }

    const original = originalInputsRef.current;
    const current = { taxRate, gdpGrowth, inflation, unemployment };
    
    const isValid = 
      original.taxRate === current.taxRate &&
      original.gdpGrowth === current.gdpGrowth &&
      original.inflation === current.inflation &&
      original.unemployment === current.unemployment;

    if (!isValid) {
      addLog("warning", `Server: Input tampering detected! Original: ${JSON.stringify(original)}, Current: ${JSON.stringify(current)}`);
      console.log("Validation failed:", { original, current });
    } else {
      addLog("success", "Server: Input validation passed. Processing request.");
    }

    return isValid;
  };

  // Normal data submission
  const handleSubmitNormal = () => {
    setIsProcessing(true);
    
    // Store original inputs (simulate server-side storage)
    storeOriginalInputs();
    
    // Simulate processing delay
    setTimeout(() => {
      if (serverVerification && !validateInputs()) {
        toast({
          title: "Security Alert",
          description: "Input validation failed! Request blocked.",
          variant: "destructive",
        });
        updateChartsBreach();
        setIsProcessing(false);
        return;
      }
      
      addLog("success", "Normal input processed successfully. No anomalies detected.");
      toast({
        title: "Success",
        description: "Normal input processed successfully.",
      });
      
      // Update charts with normal pattern
      updateChartsNormal();
      setIsProcessing(false);
    }, 1500);
  };

  // Outlier data submission
  const handleSubmitOutlier = () => {
    setIsProcessing(true);
    
    // First, store original inputs
    if (!originalInputsRef.current) {
      storeOriginalInputs();
    }
    
    // Then simulate client-side tampering
    const originalTaxRate = taxRate;
    const originalGdpGrowth = gdpGrowth;
    
    // Simulate processing delay
    setTimeout(() => {
      // Simulate tampering with inputs for demonstration
      if (serverVerification) {
        addLog("warning", "Client: Attempting to tamper with inputs before processing...");
        const tamperedTaxRate = (parseFloat(taxRate) * 3).toString();
        const tamperedGdpGrowth = (parseFloat(gdpGrowth) * 2).toString();
        
        addLog("warning", `Client: Changing tax rate from ${taxRate} to ${tamperedTaxRate}`);
        addLog("warning", `Client: Changing GDP growth from ${gdpGrowth} to ${tamperedGdpGrowth}`);
        
        // Update anomalous inputs in the shared store
        updateAnomalousInputs("Tax Rate", 0.4);
        updateAnomalousInputs("GDP Growth", 0.8);
        
        // Validate against original inputs
        if (!validateInputs()) {
          addLog("error", "Server: Input tampering detected! Request blocked.");
          toast({
            title: "Security Alert",
            description: "Input tampering detected and blocked by server validation!",
            variant: "destructive",
          });
          
          // Update charts with breach pattern
          updateChartsBreach();
          setIsProcessing(false);
          return;
        }
      }
      
      // If server verification is off or validation passes
      if (Math.random() > 0.2) { // 80% chance to detect the outlier
        addLog("warning", "Anomaly detected! Potential attack prevented. Unusual patterns in GDP growth and inflation.");
        toast({
          title: "Warning",
          description: "Anomaly detected! Potential attack prevented.",
          variant: "destructive",
        });
        
        // Update charts with anomaly pattern
        updateChartsAnomaly();
      } else {
        addLog("error", "Critical breach attempt! Outlier values have affected model predictions.");
        toast({
          title: "Critical Error",
          description: "Critical breach attempt logged!",
          variant: "destructive",
        });
        
        // Update charts with breach pattern
        updateChartsBreach();
      }
      setIsProcessing(false);
    }, 2000);
  };

  // Update charts with normal pattern
  const updateChartsNormal = () => {
    const newTime = getCurrentTime();
    
    // Update anomaly chart
    setAnomalyData(prev => {
      const newData = [...prev.slice(1), { time: newTime, score: 0.2 + Math.random() * 0.05 }];
      return newData;
    });
    
    // Update confidence chart
    setConfidenceData(prev => {
      const newData = [...prev.slice(1), { time: newTime, confidence: 0.92 + Math.random() * 0.05 }];
      return newData;
    });

    // Update shared store for ModelSecurity component to use
    const score = 0.2 + Math.random() * 0.05;
    const confidence = 0.92 + Math.random() * 0.05;
    addDataPoint({ time: `Day ${Math.floor(Math.random() * 10) + 1}`, score, confidence });
  };

  // Update charts with anomaly pattern
  const updateChartsAnomaly = () => {
    const newTime = getCurrentTime();
    
    // Update anomaly chart with spike
    setAnomalyData(prev => {
      const newData = [...prev.slice(1), { time: newTime, score: 0.6 + Math.random() * 0.2 }];
      return newData;
    });
    
    // Update confidence chart with drop
    setConfidenceData(prev => {
      const newData = [...prev.slice(1), { time: newTime, confidence: 0.6 - Math.random() * 0.2 }];
      return newData;
    });

    // Update shared store for ModelSecurity component to use
    const score = 0.6 + Math.random() * 0.2;
    const confidence = 0.6 - Math.random() * 0.2;
    addDataPoint({ time: `Day ${Math.floor(Math.random() * 10) + 1}`, score, confidence });
    
    // Update anomalous inputs
    updateAnomalousInputs("Tax Rate", 0.4);
    updateAnomalousInputs("GDP Growth", 0.5);
    updateAnomalousInputs("Inflation", 0.3);
    updateAnomalousInputs("Unemployment", 0.2);
  };

  // Update charts with breach pattern
  const updateChartsBreach = () => {
    const newTime = getCurrentTime();
    
    // Update anomaly chart with extreme spike
    setAnomalyData(prev => {
      const newData = [...prev.slice(1), { time: newTime, score: 0.85 + Math.random() * 0.1 }];
      return newData;
    });
    
    // Update confidence chart with severe drop
    setConfidenceData(prev => {
      const newData = [...prev.slice(1), { time: newTime, confidence: 0.4 - Math.random() * 0.2 }];
      return newData;
    });

    // Update shared store for ModelSecurity component to use
    const score = 0.85 + Math.random() * 0.1;
    const confidence = 0.4 - Math.random() * 0.2;
    addDataPoint({ time: `Day ${Math.floor(Math.random() * 10) + 1}`, score, confidence });
    
    // Update anomalous inputs with high values
    updateAnomalousInputs("Tax Rate", 0.7);
    updateAnomalousInputs("GDP Growth", 0.9);
    updateAnomalousInputs("Inflation", 0.8);
    updateAnomalousInputs("Unemployment", 0.6);
  };

  return (
    <div className="py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
        {/* Input Form */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
          <h4 className="text-lg font-medium mb-4 flex items-center">
            <Activity className="text-gray-800 mr-2 h-4 w-4" />
            Input Parameters
          </h4>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tax Rate (%)
              </label>
              <Input
                type="number"
                value={taxRate}
                onChange={(e) => setTaxRate(e.target.value)}
                placeholder="Enter tax rate"
                className="border-gray-300 focus-visible:ring-gray-800"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                GDP Growth (%)
              </label>
              <Input
                type="number"
                value={gdpGrowth}
                onChange={(e) => setGdpGrowth(e.target.value)}
                placeholder="Enter GDP growth"
                className="border-gray-300 focus-visible:ring-gray-800"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Inflation (%)
              </label>
              <Input
                type="number"
                value={inflation}
                onChange={(e) => setInflation(e.target.value)}
                placeholder="Enter inflation"
                className="border-gray-300 focus-visible:ring-gray-800"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Unemployment (%)
              </label>
              <Input
                type="number"
                value={unemployment}
                onChange={(e) => setUnemployment(e.target.value)}
                placeholder="Enter unemployment"
                className="border-gray-300 focus-visible:ring-gray-800"
              />
            </div>
            
            <div className="pt-2 flex flex-col space-y-3">
              <Button 
                onClick={handleSubmitNormal}
                disabled={isProcessing}
                variant="dark"
                className="w-full"
              >
                <CheckCircle className="mr-2 h-4 w-4" />
                Process Normal Data
              </Button>
              
              <Button 
                onClick={handleSubmitOutlier}
                disabled={isProcessing}
                variant="destructive"
                className="w-full"
              >
                <AlertTriangle className="mr-2 h-4 w-4" />
                Inject Outliers (Simulate Attack)
              </Button>
            </div>
            
            <div className="border-t pt-3 mt-2">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700 flex items-center">
                  <Server className="h-4 w-4 mr-1 text-gray-800" />
                  Server Security Settings
                </span>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setShowBackendLogs(!showBackendLogs)} 
                  className="text-xs text-gray-800 hover:text-gray-600 p-0"
                >
                  {showBackendLogs ? "Hide Details" : "Show Details"}
                </Button>
              </div>
              
              {showBackendLogs && (
                <div className="bg-[#221F26] text-white text-xs p-3 rounded mb-3 font-mono">
                  <p className="text-green-400">
                    <span className="text-gray-400"># Server-side security measures:</span>
                  </p>
                  <p className="text-white">
                    - Original inputs stored in secure database<br />
                    - Input re-validation before model execution<br />
                    - Attack detection with anomaly scoring<br />
                    - Secure API endpoints with input validation
                  </p>
                </div>
              )}
              
              <div className="flex items-center">
                <button 
                  onClick={() => setServerVerification(!serverVerification)}
                  className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${serverVerification ? 'bg-gray-800' : 'bg-gray-300'}`}
                >
                  <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${serverVerification ? 'translate-x-5' : 'translate-x-0'}`} />
                </button>
                <span className="ml-2 text-sm font-medium text-gray-700">
                  Server-side Validation {serverVerification ? "Enabled" : "Disabled"}
                </span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Log Panel */}
        <div className="bg-[#221F26] rounded-lg p-4 h-96 overflow-y-auto text-sm shadow-md">
          <h4 className="text-white text-lg font-medium mb-4 flex items-center">
            <Activity className="text-gray-300 mr-2 h-4 w-4" />
            Security Logs
          </h4>
          
          {logs.length === 0 ? (
            <div className="text-gray-500 italic">No logs to display. Submit data to begin testing.</div>
          ) : (
            <div className="space-y-2">
              {logs.map((log) => (
                <div key={log.id} className="border-b border-[#403E43] pb-2">
                  {log.type === "success" && (
                    <div className="flex text-green-400">
                      <CheckCircle className="mr-2 h-4 w-4 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-mono text-xs text-[#9F9EA1]">{log.timestamp}</div>
                        {log.message}
                      </div>
                    </div>
                  )}
                  
                  {log.type === "warning" && (
                    <div className="flex text-yellow-400">
                      <AlertTriangle className="mr-2 h-4 w-4 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-mono text-xs text-[#9F9EA1]">{log.timestamp}</div>
                        {log.message}
                      </div>
                    </div>
                  )}
                  
                  {log.type === "error" && (
                    <div className="flex text-red-400">
                      <XCircle className="mr-2 h-4 w-4 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-mono text-xs text-[#9F9EA1]">{log.timestamp}</div>
                        {log.message}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Real-time Graphs */}
        <div className="space-y-6">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <h4 className="text-lg font-medium mb-2 flex items-center">
              <Activity className="text-gray-800 mr-2 h-4 w-4" />
              Anomaly Score (Real-time)
            </h4>
            <div className="h-36">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={anomalyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f1f1" />
                  <XAxis dataKey="time" />
                  <YAxis domain={[0, 1]} />
                  <Tooltip contentStyle={{ borderRadius: '8px' }} />
                  <Line 
                    type="monotone" 
                    dataKey="score" 
                    stroke="#ff0000" 
                    activeDot={{ r: 8 }}
                    strokeWidth={2}
                    isAnimationActive={true}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <h4 className="text-lg font-medium mb-2 flex items-center">
              <Activity className="text-gray-800 mr-2 h-4 w-4" />
              Model Confidence (Real-time)
            </h4>
            <div className="h-36">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={confidenceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f1f1" />
                  <XAxis dataKey="time" />
                  <YAxis domain={[0, 1]} />
                  <Tooltip contentStyle={{ borderRadius: '8px' }} />
                  <Line 
                    type="monotone" 
                    dataKey="confidence" 
                    stroke="#2D3648" 
                    activeDot={{ r: 8 }}
                    strokeWidth={2}
                    isAnimationActive={true}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-50 p-4 border-t">
        <p className="text-sm text-gray-600 italic flex items-center">
          <Shield className="inline h-4 w-4 text-gray-800 mr-1" />
          The model continuously monitors input data for anomalies and potential security threats.
        </p>
      </div>
    </div>
  );
};

export default ModelSecurityTester;
