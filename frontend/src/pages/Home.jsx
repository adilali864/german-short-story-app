import { useEffect, useState } from "react";
import StoryCard from "../components/StoryCard.jsx";

const API = "http://localhost:4000/api";

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
    <div className="h-full w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth no-scrollbar">
      <div className="absolute top-0 left-0 w-full z-10 p-6 bg-linear-to-b from-black/60 to-transparent pointer-events-none">
        <h1 className="text-white font-bold text-xl">Discover</h1>
        <p className="text-white/80 text-xs">German words in context</p>
      </div>

      {stories.length === 0 ? (
        <div className="h-full flex items-center justify-center text-slate-500">
          No stories yet.
        </div>
      ) : (
        <>
          {stories.map((s) => (
            <StoryCard s={s} key={s.slug} />
          ))}

          {stories.map((s) => (
            <StoryCard s={s} key={`${s.slug}-b`} />
          ))}
        </>
      )}
    </div>
  );
};

export default Home;
