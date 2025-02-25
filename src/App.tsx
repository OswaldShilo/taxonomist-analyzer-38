
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import GdpCalculator from "./pages/GdpCalculator";
import InvestmentAllocation from "./pages/InvestmentAllocation";
import NotFound from "./pages/NotFound";
import LearnMore from "./pages/LearnMore";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/calculator" element={<GdpCalculator />} />
          <Route path="/investment-allocation" element={<InvestmentAllocation />} />
          <Route path="/learn-more" element={<LearnMore />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
