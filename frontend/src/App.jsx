import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import StoryPage from "./pages/StoryPage";

const App = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    // using h-[100dvh] handles mobile browser address bars better than h-screen
    <div className="h-[100dvh] w-full bg-slate-50 overflow-hidden flex flex-col">
      {/* We only show the header on the Story Page. 
          On Home, we want a full-screen immersive experience. */}
      {!isHome && (
        <header className="bg-white/90 backdrop-blur-md border-b border-slate-100 z-20 sticky top-0">
          <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-center">
            <span className="text-lg font-bold tracking-tight text-slate-800">
              LingoStories
            </span>
          </div>
        </header>
      )}

      <main className="flex-1 overflow-hidden relative">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/story/:slug" element={<StoryPage />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
