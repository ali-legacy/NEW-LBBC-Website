import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';

// Lazy load pages for performance
const HomePage = React.lazy(() => import('./pages/HomePage'));
const AboutPage = React.lazy(() => import('./pages/AboutPage'));
const EventsPage = React.lazy(() => import('./pages/EventsPage'));
const DirectoryPage = React.lazy(() => import('./pages/DirectoryPage'));
const ResourcesPage = React.lazy(() => import('./pages/ResourcesPage'));
const MembershipPage = React.lazy(() => import('./pages/MembershipPage'));
const ContactPage = React.lazy(() => import('./pages/ContactPage'));
const SpotlightPage = React.lazy(() => import('./pages/SpotlightPage'));
const NewsDetailPage = React.lazy(() => import('./pages/NewsDetailPage'));
const ComingSoonPage = React.lazy(() => import('./pages/ComingSoonPage'));

const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-white">
    <div className="w-12 h-12 border-4 border-lbbc-green/20 border-t-lbbc-green rounded-full animate-spin"></div>
  </div>
);

const AppContent = () => {
  const { language } = useLanguage();

  if (language === 'ar') {
    return (
      <Suspense fallback={<LoadingFallback />}>
        <ComingSoonPage />
      </Suspense>
    );
  }

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-white">
        <Navbar />
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/directory" element={<DirectoryPage />} />
            <Route path="/resources" element={<ResourcesPage />} />
            <Route path="/membership" element={<MembershipPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/spotlight/capterio" element={<SpotlightPage />} />
            <Route path="/news/:id" element={<NewsDetailPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
        <Footer />
      </div>
    </Router>
  );
};

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;
