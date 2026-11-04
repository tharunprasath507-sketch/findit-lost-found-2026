import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { Toast } from './components/common/Toast';
import { Home } from './pages/Home';
import { BrowseItems } from './pages/BrowseItems';
import { ItemDetails } from './pages/ItemDetails';
import { ReportLost } from './pages/ReportLost';
import { ReportFound } from './pages/ReportFound';
import { Auth } from './pages/Auth';
import { UserDashboard } from './pages/UserDashboard';
import { AdminDashboard } from './pages/AdminDashboard';

const MainContent = () => {
  const { currentPage } = useApp();

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home />;
      case 'browse':
        return <BrowseItems />;
      case 'item-details':
        return <ItemDetails />;
      case 'report-lost':
        return <ReportLost />;
      case 'report-found':
        return <ReportFound />;
      case 'auth':
        return <Auth />;
      case 'user-dashboard':
        return <UserDashboard />;
      case 'admin-dashboard':
        return <AdminDashboard />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-800">
      <Navbar />
      <main className="flex-1">
        {renderPage()}
      </main>
      <Footer />
      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
