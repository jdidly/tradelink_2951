import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import { RoleContextProvider } from "components/ui/RoleContextProvider";
import NotFound from "pages/NotFound";
import HomeDashboard from './pages/home-dashboard';
import SuburbSelectionMapView from './pages/suburb-selection-map-view';
import TradieProfileQuoteRequest from './pages/tradie-profile-quote-request';
import AdminVettingDashboard from './pages/admin-vetting-dashboard';
import PriceEstimator from './pages/price-estimator';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <RoleContextProvider>
          <ScrollToTop />
          <RouterRoutes>
            {/* Define your route here */}
            <Route path="/" element={<HomeDashboard />} />
            <Route path="/home-dashboard" element={<HomeDashboard />} />
            <Route path="/suburb-selection-map-view" element={<SuburbSelectionMapView />} />
            <Route path="/suburb-selection" element={<SuburbSelectionMapView />} />
            <Route path="/tradie-profile-quote-request" element={<TradieProfileQuoteRequest />} />
            <Route path="/admin-vetting-dashboard" element={<AdminVettingDashboard />} />
            <Route path="/price-estimator" element={<PriceEstimator />} />
            <Route path="*" element={<NotFound />} />
          </RouterRoutes>
        </RoleContextProvider>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;