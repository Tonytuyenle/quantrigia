import React, { useState } from 'react';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import MobileBottomNav from './components/layout/MobileBottomNav';
import CeoDashboard from './views/CeoDashboard';
import ProductCenter from './views/ProductCenter';
import ProductDetailModal from './views/ProductDetailModal';
import CompetitorsView from './views/CompetitorsView';
import ProductMappingView from './views/ProductMappingView';
import CompareProductsView from './views/CompareProductsView';
import NewProductIntelligence from './views/NewProductIntelligence';
import PricingIntelligenceView from './views/PricingIntelligenceView';
import MarketPriceView from './views/MarketPriceView';
import PriceHistoryView from './views/PriceHistoryView';
import MarketGapView from './views/MarketGapView';
import ProductOpportunityView from './views/ProductOpportunityView';
import WhatIfSimulator from './views/WhatIfSimulator';
import InventoryIntelligence from './views/InventoryIntelligence';
import PriceWarDetector from './views/PriceWarDetector';
import AlertCenterView from './views/AlertCenterView';
import AiAdvisorView from './views/AiAdvisorView';
import ReportsView from './views/ReportsView';
import DataCenterView from './views/DataCenterView';
import SettingsView from './views/SettingsView';
import UserPermissionView from './views/UserPermissionView';
import { mockProducts } from './data/mockData';

export default function App() {
  const [currentTab, setCurrentTab] = useState('dashboard');
  const [activeRole, setActiveRole] = useState('CEO');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProductForModal, setSelectedProductForModal] = useState(null);
  const [selectedProductForSimulator, setSelectedProductForSimulator] = useState(null);

  const handleOpenProductDetail = (product) => {
    setSelectedProductForModal(product);
  };

  const handleOpenSimulator = (product) => {
    setSelectedProductForSimulator(product);
    setSelectedProductForModal(null);
    setCurrentTab('what-if-simulator');
  };

  const handleCompareWithCompetitor = (product) => {
    setSelectedProductForModal(null);
    setCurrentTab('compare-products');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-rose-500 selection:text-white text-slate-900 pb-16 lg:pb-0">
      {/* Dark Navy Sidebar with Mobile Drawer */}
      <Sidebar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        isCollapsed={isSidebarCollapsed}
        isOpenMobile={isMobileDrawerOpen}
        onCloseMobile={() => setIsMobileDrawerOpen(false)}
      />

      {/* Main Content Area */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarCollapsed ? 'lg:ml-20' : 'lg:ml-72'}`}>
        {/* Top Header */}
        <Header
          activeRole={activeRole}
          onSelectRole={setActiveRole}
          isSidebarCollapsed={isSidebarCollapsed}
          onToggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          onOpenMobileSidebar={() => setIsMobileDrawerOpen(true)}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onOpenAlerts={() => setCurrentTab('alerts')}
          onOpenAiCommand={() => setCurrentTab('ai-advisor')}
        />

        {/* Dynamic Page Views */}
        <main className="flex-1 p-3.5 sm:p-6 max-w-7xl w-full mx-auto">
          {currentTab === 'dashboard' && (
            <CeoDashboard
              onSelectProduct={handleOpenProductDetail}
              onNavigate={setCurrentTab}
            />
          )}

          {currentTab === 'product-center' && (
            <ProductCenter
              onSelectProduct={handleOpenProductDetail}
              onAddNewProduct={() => setCurrentTab('new-product')}
            />
          )}

          {currentTab === 'competitors' && (
            <CompetitorsView
              onSelectCompetitorToCompare={() => setCurrentTab('compare-products')}
            />
          )}

          {currentTab === 'product-mapping' && (
            <ProductMappingView
              onCompareSelected={() => setCurrentTab('compare-products')}
            />
          )}

          {currentTab === 'compare-products' && (
            <CompareProductsView />
          )}

          {currentTab === 'new-product' && (
            <NewProductIntelligence />
          )}

          {currentTab === 'pricing-intelligence' && (
            <PricingIntelligenceView
              onOpenSimulator={handleOpenSimulator}
            />
          )}

          {currentTab === 'market-price' && (
            <MarketPriceView />
          )}

          {currentTab === 'price-history' && (
            <PriceHistoryView />
          )}

          {currentTab === 'market-gap' && (
            <MarketGapView
              onNavigateNewProduct={() => setCurrentTab('new-product')}
            />
          )}

          {currentTab === 'product-opportunity' && (
            <ProductOpportunityView
              onNavigateNewProduct={() => setCurrentTab('new-product')}
            />
          )}

          {currentTab === 'what-if-simulator' && (
            <WhatIfSimulator
              selectedProduct={selectedProductForSimulator}
            />
          )}

          {currentTab === 'inventory-intelligence' && (
            <InventoryIntelligence
              onSelectProduct={handleOpenProductDetail}
            />
          )}

          {currentTab === 'price-war' && (
            <PriceWarDetector />
          )}

          {currentTab === 'alerts' && (
            <AlertCenterView
              onNavigatePriceWar={() => setCurrentTab('price-war')}
              onNavigateInventory={() => setCurrentTab('inventory-intelligence')}
              onSelectProduct={handleOpenProductDetail}
            />
          )}

          {currentTab === 'ai-advisor' && (
            <AiAdvisorView
              onSelectProduct={handleOpenProductDetail}
            />
          )}

          {currentTab === 'reports' && (
            <ReportsView />
          )}

          {currentTab === 'data-center' && (
            <DataCenterView />
          )}

          {currentTab === 'settings' && (
            <SettingsView />
          )}

          {currentTab === 'user-permission' && (
            <UserPermissionView />
          )}
        </main>
      </div>

      {/* Global Product Detail Modal */}
      {selectedProductForModal && (
        <ProductDetailModal
          product={selectedProductForModal}
          onClose={() => setSelectedProductForModal(null)}
          onOpenSimulator={handleOpenSimulator}
          onCompareWithCompetitor={handleCompareWithCompetitor}
        />
      )}

      {/* Mobile Bottom Navigation Bar */}
      <MobileBottomNav
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        onOpenMenu={() => setIsMobileDrawerOpen(true)}
      />
    </div>
  );
}
