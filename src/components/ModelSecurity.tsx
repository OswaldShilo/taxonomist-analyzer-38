
import React, { useState } from "react";
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer, AreaChart, Area,
  ScatterChart, Scatter, Cell, RadarChart, PolarGrid,
  PolarAngleAxis, PolarRadiusAxis, Radar
} from "recharts";
import { Shield, AlertTriangle, CheckCircle, Lock } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Sample data for the visualizations
const anomalyScoreData = [
  { name: "Day 1", normal: 0.2, poisoned: 0.2 },
  { name: "Day 2", normal: 0.25, poisoned: 0.25 },
  { name: "Day 3", normal: 0.22, poisoned: 0.22 },
  { name: "Day 4", normal: 0.24, poisoned: 0.24 },
  { name: "Day 5", normal: 0.26, poisoned: 0.27 },
  { name: "Day 6", normal: 0.23, poisoned: 0.3 },
  { name: "Day 7", normal: 0.25, poisoned: 0.45 },
  { name: "Day 8", normal: 0.24, poisoned: 0.65 },
  { name: "Day 9", normal: 0.26, poisoned: 0.85 },
  { name: "Day 10", normal: 0.23, poisoned: 0.95 },
];

const predictionDeviationData = [
  { name: "GDP Growth", normal: 5.4, poisoned: 2.1 },
  { name: "Inflation", normal: 3.2, poisoned: 8.7 },
  { name: "Investment", normal: 12.5, poisoned: 4.3 },
  { name: "Employment", normal: 3.8, poisoned: 1.5 },
  { name: "Tax Revenue", normal: 7.6, poisoned: 3.2 },
];

const confidenceData = [
  { name: "Day 1", confidence: 0.95 },
  { name: "Day 2", confidence: 0.93 },
  { name: "Day 3", confidence: 0.94 },
  { name: "Day 4", confidence: 0.92 },
  { name: "Day 5", confidence: 0.91 },
  { name: "Day 6", confidence: 0.85 },
  { name: "Day 7", confidence: 0.75 },
  { name: "Day 8", confidence: 0.62 },
  { name: "Day 9", confidence: 0.52 },
  { name: "Day 10", confidence: 0.41 },
];

const anomalousInputsData = [
  { feature: "Tax Rate", score: 0.2 },
  { feature: "GDP Growth", score: 0.8 },
  { feature: "Inflation", score: 0.5 },
  { feature: "Unemployment", score: 0.3 },
  { feature: "Investment", score: 0.9 },
];

const precisionRecallData = [
  { name: "0.1", precision: 1.0, recall: 0.3 },
  { name: "0.2", precision: 0.95, recall: 0.4 },
  { name: "0.3", precision: 0.9, recall: 0.55 },
  { name: "0.4", precision: 0.85, recall: 0.65 },
  { name: "0.5", precision: 0.8, recall: 0.7 },
  { name: "0.6", precision: 0.75, recall: 0.75 },
  { name: "0.7", precision: 0.7, recall: 0.85 },
  { name: "0.8", precision: 0.6, recall: 0.9 },
  { name: "0.9", precision: 0.5, recall: 0.95 },
  { name: "1.0", precision: 0.4, recall: 1.0 },
];

const radarData = [
  {
    subject: "Detection",
    normal: 85,
    poisoned: 45,
    fullMark: 100,
  },
  {
    subject: "Prevention",
    normal: 90,
    poisoned: 40,
    fullMark: 100,
  },
  {
    subject: "Recovery",
    normal: 75,
    poisoned: 30,
    fullMark: 100,
  },
  {
    subject: "Monitoring",
    normal: 95,
    poisoned: 55,
    fullMark: 100,
  },
  {
    subject: "Response",
    normal: 80,
    poisoned: 35,
    fullMark: 100,
  },
];

const ModelSecurity = () => {
  const [activeTab, setActiveTab] = useState("detection");

  return (
    <div className="py-8">
      <div className="flex justify-center mb-6">
        <div className="inline-flex rounded-md shadow-sm" role="group">
          <Button
            variant={activeTab === "detection" ? "default" : "outline"}
            onClick={() => setActiveTab("detection")}
            className={cn(
              "rounded-l-md rounded-r-none",
              activeTab === "detection" ? "bg-primary text-white" : ""
            )}
          >
            <Shield className="mr-2 h-4 w-4" />
            Detection
          </Button>
          <Button
            variant={activeTab === "prevention" ? "default" : "outline"}
            onClick={() => setActiveTab("prevention")}
            className={cn(
              "rounded-none border-x-0",
              activeTab === "prevention" ? "bg-primary text-white" : ""
            )}
          >
            <Lock className="mr-2 h-4 w-4" />
            Prevention
          </Button>
          <Button
            variant={activeTab === "visualization" ? "default" : "outline"}
            onClick={() => setActiveTab("visualization")}
            className={cn(
              "rounded-r-md rounded-l-none",
              activeTab === "visualization" ? "bg-primary text-white" : ""
            )}
          >
            <AlertTriangle className="mr-2 h-4 w-4" />
            Visualization
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {activeTab === "detection" && (
          <>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <h3 className="text-lg font-semibold mb-4">Anomaly Score Over Time</h3>
              <p className="text-sm text-gray-600 mb-4">
                This graph shows how anomaly scores change when poisoned data is introduced into the model.
              </p>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={anomalyScoreData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="normal"
                      stroke="#2D3648"
                      activeDot={{ r: 8 }}
                    />
                    <Line type="monotone" dataKey="poisoned" stroke="#ff0000" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <h3 className="text-lg font-semibold mb-4">Confidence Interval Plot</h3>
              <p className="text-sm text-gray-600 mb-4">
                Shows how model confidence changes before and after poisoning. A sudden drop indicates a potential attack.
              </p>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={confidenceData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="confidence"
                      stroke="#2D3648"
                      fill="#7C8BA1"
                      fillOpacity={0.3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </>
        )}

        {activeTab === "prevention" && (
          <>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <h3 className="text-lg font-semibold mb-4">Heatmap of Anomalous Inputs</h3>
              <p className="text-sm text-gray-600 mb-4">
                Shows which input features are most affected by data poisoning attempts.
              </p>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    layout="vertical"
                    data={anomalousInputsData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="feature" type="category" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="score" fill="#ff0000">
                      {anomalousInputsData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={entry.score > 0.6 ? "#ff0000" : "#FFA07A"}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <h3 className="text-lg font-semibold mb-4">Precision-Recall Curve</h3>
              <p className="text-sm text-gray-600 mb-4">
                Shows how well the model detects poisoned data without overreacting to normal variations.
              </p>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={precisionRecallData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="precision"
                      stroke="#2D3648"
                      activeDot={{ r: 8 }}
                    />
                    <Line type="monotone" dataKey="recall" stroke="#7C8BA1" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </>
        )}

        {activeTab === "visualization" && (
          <>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <h3 className="text-lg font-semibold mb-4">Prediction Deviation Graph</h3>
              <p className="text-sm text-gray-600 mb-4">
                Compares normal vs. poisoned predictions to visualize the impact of attacks.
              </p>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={predictionDeviationData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="normal" fill="#2D3648" />
                    <Bar dataKey="poisoned" fill="#ff0000" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <h3 className="text-lg font-semibold mb-4">Security Radar</h3>
              <p className="text-sm text-gray-600 mb-4">
                Visualizes security metrics across different dimensions before and after attacks.
              </p>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart outerRadius={90} data={radarData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} />
                    <Radar
                      name="Normal Operation"
                      dataKey="normal"
                      stroke="#2D3648"
                      fill="#2D3648"
                      fillOpacity={0.6}
                    />
                    <Radar
                      name="Under Attack"
                      dataKey="poisoned"
                      stroke="#ff0000"
                      fill="#ff0000"
                      fillOpacity={0.6}
                    />
                    <Legend />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </>
        )}
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center mb-4">
          <CheckCircle className="text-green-500 mr-2 h-5 w-5" />
          <h3 className="text-lg font-semibold">Security Assessment</h3>
        </div>
        <p className="text-gray-700 mb-4">
          Our model employs multiple layers of security to detect and prevent data poisoning attacks:
        </p>
        <ul className="list-disc pl-5 mb-4 space-y-2">
          <li className="text-gray-700">
            <span className="font-medium">Anomaly Detection:</span> Monitors input data for unusual patterns or outliers
          </li>
          <li className="text-gray-700">
            <span className="font-medium">Confidence Tracking:</span> Alerts when model confidence drops suddenly
          </li>
          <li className="text-gray-700">
            <span className="font-medium">Input Validation:</span> Ensures data consistency and prevents extreme values
          </li>
          <li className="text-gray-700">
            <span className="font-medium">Periodic Retraining:</span> Maintains model health with verified data
          </li>
        </ul>
        <p className="text-gray-700">
          These measures ensure our trend analysis and estimations remain reliable even in the face of potential attacks or data corruption.
        </p>
      </div>
    </div>
  );
};

export default ModelSecurity;
