import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import StoryPage from "./pages/StoryPage";

const App = () => {
  const location = useLocation();

  return (
    <div className="h-100dvh w-full bg-slate-50 overflow-hidden flex flex-col">
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
