import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import StoryPage from "./pages/StoryPage";
const App = () => {
  return (
    <main>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/story/:slug" element={<StoryPage />} />
      </Routes>
    </main>
  );
};

export default App;
