import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');
const appFile = path.join(rootDir, 'src', 'App.tsx');
const monolithFile = path.join(rootDir, 'src', 'Monolith.tsx');
const pagesDir = path.join(rootDir, 'src', 'pages');

if (!fs.existsSync(pagesDir)) fs.mkdirSync(pagesDir, { recursive: true });

let content = fs.readFileSync(appFile, 'utf8');

const componentsToExport = [
  'HomePage', 'AboutPage', 'EventsPage', 'DirectoryPage', 'ResourcesPage', 
  'MembershipPage', 'ContactPage', 'SpotlightPage', 'NewsDetailPage', 'ComingSoonPage',
  'Navbar', 'Footer', 'ScrollToTop'
];

let monolithContent = content;
for (const comp of componentsToExport) {
  const regex = new RegExp("const " + comp + " = \\(\\) =>");
  monolithContent = monolithContent.replace(regex, "export const " + comp + " = () =>");
}
monolithContent = monolithContent.replace(/export default function App\(\) \{[\s\S]*$/, '');
fs.writeFileSync(monolithFile, monolithContent);
console.log('[split-app] Created Monolith.tsx');

const pages = [
  'HomePage', 'AboutPage', 'EventsPage', 'DirectoryPage', 'ResourcesPage', 
  'MembershipPage', 'ContactPage', 'SpotlightPage', 'NewsDetailPage', 'ComingSoonPage'
];

for (const page of pages) {
  const pageContent = "export { " + page + " as default } from '../Monolith';\n";
  fs.writeFileSync(path.join(pagesDir, page + ".tsx"), pageContent);
  console.log("[split-app] Created " + page + ".tsx");
}

const lazyImports = pages.map(p => "const " + p + " = lazy(() => import('./pages/" + p + "'));").join('\n');

const newAppTsx = `
import React, { lazy, Suspense, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { Navbar, Footer, ScrollToTop } from './Monolith';

${lazyImports}

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-white">
    <div className="w-8 h-8 border-4 border-lbbc-green border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const AppContent = () => {
  const { language } = useLanguage();

  if (language === 'ar') {
    return (
      <Suspense fallback={<PageLoader />}>
        <ComingSoonPage />
      </Suspense>
    );
  }

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-white flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Suspense fallback={<PageLoader />}>
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
              <Route path="*" element={<HomePage />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default function App() {
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      if (event.message === 'Script error.' || !event.message) return;
      if (event.message.includes('ResizeObserver loop')) return;
      console.error('Global Error caught:', event.error || event.message);
    };
    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  return (
    <HelmetProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </HelmetProvider>
  );
}
`;

fs.writeFileSync(appFile, newAppTsx);
console.log('[split-app] Rewrote App.tsx for Code Splitting');
