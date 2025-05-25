import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import ErrorBoundary from "./components/ErrorBoundary";
import LandingPage from "./pages/landing-page-with-login-signup";
import MarketplaceDashboard from "./pages/marketplace-dashboard";
import CropDoctorAiAnalysis from "./pages/crop-doctor-ai-analysis";
import ProductDetailChat from "./pages/product-detail-chat";
import NotFound from "./pages/NotFound";
import Profile from "pages/marketplace-dashboard/components/Profile_data";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/landing-page-with-login-signup" element={<LandingPage />} />
          <Route path="/marketplace-dashboard" element={<MarketplaceDashboard />} />
          <Route path="/crop-doctor-ai-analysis" element={<CropDoctorAiAnalysis />} />
          <Route path="/product-detail-chat" element={<ProductDetailChat />} />
          <Route path="/profile_data" element = {<Profile/>} /> 
          <Route path="*" element={<NotFound />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;