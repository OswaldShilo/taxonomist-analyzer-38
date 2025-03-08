
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer
} from "recharts";
import { AlertTriangle, CheckCircle, XCircle, Activity, Shield } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

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

const ModelSecurityTester = () => {
  const [showTester, setShowTester] = useState(false);
  const [taxRate, setTaxRate] = useState("15");
  const [gdpGrowth, setGdpGrowth] = useState("5.2");
  const [inflation, setInflation] = useState("3.5");
  const [unemployment, setUnemployment] = useState("4.1");
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [anomalyData, setAnomalyData] = useState(initialAnomalyData);
  const [confidenceData, setConfidenceData] = useState(initialConfidenceData);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  // Function to get current time in string format
  const getCurrentTime = () => {
    const now = new Date();
    return `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
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

  // Normal data submission
  const handleSubmitNormal = () => {
    setIsProcessing(true);
    
    // Simulate processing delay
    setTimeout(() => {
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
    
    // Simulate processing delay
    setTimeout(() => {
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
  };

  return (
    <div className="py-8">
      <div className="text-center mb-8">
        <Button 
          size="lg" 
          onClick={() => setShowTester(!showTester)}
          className="bg-blue-500 hover:bg-blue-600"
        >
          <Shield className="mr-2 h-4 w-4" />
          {showTester ? "Hide Security Tester" : "Check Our Model (Live Security Testing)"}
        </Button>
      </div>
      
      {showTester && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-lg overflow-hidden"
        >
          <div className="p-6 border-b">
            <h3 className="text-xl font-semibold mb-2">Model Security Testing Interface</h3>
            <p className="text-gray-600">
              Test our model's security by submitting normal data or injecting outliers to simulate attacks.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
            {/* Input Form */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="text-lg font-medium mb-4">Input Parameters</h4>
              
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
                  />
                </div>
                
                <div className="pt-2 flex flex-col space-y-3">
                  <Button 
                    onClick={handleSubmitNormal}
                    disabled={isProcessing}
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
              </div>
            </div>
            
            {/* Log Panel */}
            <div className="bg-black rounded-lg p-4 h-96 overflow-y-auto text-sm">
              <h4 className="text-white text-lg font-medium mb-4">Security Logs</h4>
              
              {logs.length === 0 ? (
                <div className="text-gray-500 italic">No logs to display. Submit data to begin testing.</div>
              ) : (
                <div className="space-y-2">
                  {logs.map((log) => (
                    <div key={log.id} className="border-b border-gray-800 pb-2">
                      {log.type === "success" && (
                        <div className="flex text-green-400">
                          <CheckCircle className="mr-2 h-4 w-4 flex-shrink-0 mt-0.5" />
                          <div>
                            <div className="font-mono text-xs text-gray-500">{log.timestamp}</div>
                            {log.message}
                          </div>
                        </div>
                      )}
                      
                      {log.type === "warning" && (
                        <div className="flex text-yellow-400">
                          <AlertTriangle className="mr-2 h-4 w-4 flex-shrink-0 mt-0.5" />
                          <div>
                            <div className="font-mono text-xs text-gray-500">{log.timestamp}</div>
                            {log.message}
                          </div>
                        </div>
                      )}
                      
                      {log.type === "error" && (
                        <div className="flex text-red-400">
                          <XCircle className="mr-2 h-4 w-4 flex-shrink-0 mt-0.5" />
                          <div>
                            <div className="font-mono text-xs text-gray-500">{log.timestamp}</div>
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
              <div className="bg-white p-4 rounded-lg shadow">
                <h4 className="text-lg font-medium mb-2">Anomaly Score (Real-time)</h4>
                <div className="h-36">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={anomalyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis domain={[0, 1]} />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="score" 
                        stroke="#ff0000" 
                        activeDot={{ r: 8 }}
                        isAnimationActive={true}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow">
                <h4 className="text-lg font-medium mb-2">Model Confidence (Real-time)</h4>
                <div className="h-36">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={confidenceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis domain={[0, 1]} />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="confidence" 
                        stroke="#2D3648" 
                        activeDot={{ r: 8 }}
                        isAnimationActive={true}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 border-t">
            <p className="text-sm text-gray-600 italic">
              <Activity className="inline h-4 w-4 text-blue-500 mr-1" />
              The model continuously monitors input data for anomalies and potential security threats.
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ModelSecurityTester;
