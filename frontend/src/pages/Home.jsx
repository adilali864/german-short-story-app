import { useEffect, useState } from "react";
import StoryCard from "../components/StoryCard.jsx";

const API = import.meta.env.VITE_API;

const Home = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`${API}/stories`);
        const json = await res.json();
        if (json.data) setStories(json.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-slate-900 text-white">
        <div className="animate-pulse">Loading Stories...</div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-slate-50">
      <nav className="bg-white shadow-sm px-6 md:px-12 shrink-0 border-b border-[#9c9c9c]/40">
        <div className="max-w-7xl mx-auto">
          <img src="/mainlogo.png" alt="logo" className="size-35 -my-9" />
        </div>
      </nav>

      <div className="bg-white shadow-sm px-2 md:px-12 py-3 shrink-0 border-b border-[#9c9c9c]/40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <a
            href="#"
            className="flex items-center gap-2 text-slate-700 hover:text-slate-900 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m12 19-7-7 7-7" />
            </svg>
          </a>
          <div className="text-center">
            <h1 className="text-xl font-bold tracking-tight text-[#153A72]">
              Short Stories
            </h1>
            <div className="flex items-center justify-center gap-1">
              <p>German ·</p>
              <span> A1 Level</span>
            </div>
          </div>
          <span className="pr-8" />
        </div>
      </div>

      <div className="flex-1 overflow-y-scroll px-4 md:px-8 py-6 max-w-4xl mx-auto bg-[#ecfbff] w-full">
        {stories.length === 0 ? (
          <div className="text-center text-slate-500 mt-8">No stories yet.</div>
        ) : (
          <div className="flex flex-col gap-6">
            {stories.map((s, idx) => (
              <StoryCard idx={idx} key={s.slug} s={s} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
