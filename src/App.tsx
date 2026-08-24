import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/context/ThemeContext";
import { LangProvider } from "@/context/LangContext";
import RootLayout from "@/components/layout/RootLayout";
import ComingSoonPage from "./pages/ComingSoonPage";

// Lazy load pages for code splitting
const HomePage = lazy(() => import("@/pages/HomePage"));
const ArticlesPage = lazy(() => import("@/pages/ArticlesPage"));
const ArticlePage = lazy(() => import("@/pages/ArticlePage"));
const ImpactPage = lazy(() => import("@/pages/ImpactPage"));
const CollaboratePage = lazy(() => import("@/pages/CollaboratePage"));
const ResourcesPage = lazy(() => import("@/pages/ResourcesPage"));
const NotFoundPage = lazy(() => import("@/pages/NotFoundPage"));

const PageLoader: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="flex flex-col items-center gap-4">
      <div className="w-10 h-10 border-2 border-cyber-green/30 border-t-cyber-green rounded-full animate-spin" />
      <span className="font-display text-xs tracking-widest text-cyber-green/60">
        LOADING...
      </span>
    </div>
  </div>
);

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <LangProvider>
        <BrowserRouter>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<RootLayout />}>
                <Route index element={<HomePage />} />
                <Route path="articles" element={<ArticlesPage />} />
                <Route path="articles/:slug" element={<ArticlePage />} />
                <Route path="/coming-soon" element={<ComingSoonPage />} />
                <Route path="/coming-soon/:name" element={<ComingSoonPage />} />
                <Route path="impact" element={<ImpactPage />} />
                <Route path="collaborate" element={<CollaboratePage />} />
                <Route path="resources" element={<ResourcesPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
      </LangProvider>
    </ThemeProvider>
  );
};

export default App;
