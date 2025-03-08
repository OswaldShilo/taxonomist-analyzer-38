
import { create } from 'zustand';

export type SecurityDataPoint = {
  time: string;
  score: number;
  confidence: number;
  normal?: number;
  poisoned?: number;
};

export type AnomalyInputData = {
  feature: string;
  score: number;
};

type SecurityDataState = {
  anomalyTimeSeriesData: SecurityDataPoint[];
  confidenceData: SecurityDataPoint[];
  anomalousInputsData: AnomalyInputData[];
  addDataPoint: (dataPoint: SecurityDataPoint) => void;
  updateAnomalousInputs: (feature: string, score: number) => void;
  resetData: () => void;
};

// Initial data for the charts
const initialAnomalyData: SecurityDataPoint[] = [
  { time: "Day 1", score: 0.2, confidence: 0.95, normal: 0.2, poisoned: 0.2 },
  { time: "Day 2", score: 0.21, confidence: 0.94, normal: 0.21, poisoned: 0.21 },
  { time: "Day 3", score: 0.22, confidence: 0.95, normal: 0.22, poisoned: 0.22 },
  { time: "Day 4", score: 0.2, confidence: 0.94, normal: 0.2, poisoned: 0.2 },
  { time: "Day 5", score: 0.19, confidence: 0.96, normal: 0.19, poisoned: 0.19 },
];

const initialAnomalousInputs: AnomalyInputData[] = [
  { feature: "Tax Rate", score: 0.2 },
  { feature: "GDP Growth", score: 0.3 },
  { feature: "Inflation", score: 0.2 },
  { feature: "Unemployment", score: 0.2 },
  { feature: "Investment", score: 0.3 },
];

export const useSecurityDataStore = create<SecurityDataState>((set) => ({
  anomalyTimeSeriesData: [...initialAnomalyData],
  confidenceData: [...initialAnomalyData],
  anomalousInputsData: [...initialAnomalousInputs],
  
  addDataPoint: (dataPoint) => set((state) => {
    // Add new data point to both datasets
    const newAnomalyData = [...state.anomalyTimeSeriesData.slice(1), {
      time: dataPoint.time,
      score: dataPoint.score,
      confidence: dataPoint.confidence,
      normal: dataPoint.score < 0.3 ? dataPoint.score : 0.25, // Normal line stays relatively stable
      poisoned: dataPoint.score > 0.5 ? dataPoint.score : dataPoint.score < 0.3 ? dataPoint.score : 0.25 // Poisoned line spikes if anomaly score is high
    }];
    
    const newConfidenceData = [...state.confidenceData.slice(1), {
      time: dataPoint.time,
      score: dataPoint.score,
      confidence: dataPoint.confidence,
      normal: dataPoint.confidence,
      poisoned: dataPoint.confidence
    }];
    
    return {
      anomalyTimeSeriesData: newAnomalyData,
      confidenceData: newConfidenceData,
    };
  }),
  
  updateAnomalousInputs: (feature, score) => set((state) => {
    // Find and update the feature score, or add a new one
    const existingIndex = state.anomalousInputsData.findIndex(item => item.feature === feature);
    let newAnomalousInputs = [...state.anomalousInputsData];
    
    if (existingIndex >= 0) {
      newAnomalousInputs[existingIndex] = { ...newAnomalousInputs[existingIndex], score };
    } else {
      newAnomalousInputs.push({ feature, score });
    }
    
    return { anomalousInputsData: newAnomalousInputs };
  }),
  
  resetData: () => set({
    anomalyTimeSeriesData: [...initialAnomalyData],
    confidenceData: [...initialAnomalyData],
    anomalousInputsData: [...initialAnomalousInputs]
  })
}));
