
import React from "react";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer, AreaChart, Area
} from "recharts";
import { Shield } from "lucide-react";
import { motion } from "framer-motion";
import { useSecurityDataStore } from "@/store/securityDataStore";

const ModelSecurity = () => {
  // Use our shared store data
  const { anomalyTimeSeriesData, confidenceData } = useSecurityDataStore();

  // Format confidence data for the area chart
  const formattedConfidenceData = confidenceData.map(item => ({
    name: item.time,
    confidence: item.confidence
  }));

  return (
    <div className="py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-8 rounded-lg shadow-md border border-gray-100"
        >
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Shield className="text-gray-800 mr-2 h-5 w-5" />
            Anomaly Score Over Time
          </h3>
          <p className="text-sm text-gray-600 mb-6">
            This graph shows how anomaly scores change when poisoned data is introduced into the model.
          </p>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={anomalyTimeSeriesData}
                margin={{ top: 5, right: 30, left: 20, bottom: 25 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f1f1" />
                <XAxis dataKey="time" />
                <YAxis domain={[0, 1]} />
                <Tooltip contentStyle={{ borderRadius: '8px' }} />
                <Legend wrapperStyle={{ paddingTop: '10px' }} />
                <Line
                  type="monotone"
                  dataKey="normal"
                  stroke="#2D3648"
                  strokeWidth={2}
                  activeDot={{ r: 8 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="poisoned" 
                  stroke="#ff0000" 
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white p-8 rounded-lg shadow-md border border-gray-100"
        >
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Shield className="text-gray-800 mr-2 h-5 w-5" />
            Confidence Interval Plot
          </h3>
          <p className="text-sm text-gray-600 mb-6">
            Shows how model confidence changes before and after poisoning. A sudden drop indicates a potential attack.
          </p>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={formattedConfidenceData}
                margin={{ top: 10, right: 30, left: 20, bottom: 25 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f1f1" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 1]} />
                <Tooltip contentStyle={{ borderRadius: '8px' }} />
                <Area
                  type="monotone"
                  dataKey="confidence"
                  stroke="#2D3648"
                  fill="#E5E7EB"
                  fillOpacity={0.6}
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
      
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">How Our Security Analysis Works</h3>
        <p className="text-gray-700">
          Our security analysis uses an anomaly detection model that identifies potential data poisoning attacks. 
          The system monitors input patterns and calculates an anomaly score based on statistical deviations from expected values.
          When suspicious inputs are detected, the model's confidence drops significantly, triggering security alerts.
          This approach helps protect against adversarial attacks that might attempt to manipulate model predictions.
        </p>
      </div>
    </div>
  );
};

export default ModelSecurity;
