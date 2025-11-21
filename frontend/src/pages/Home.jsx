import React, { useEffect, useState } from "react";
import StoryCard from "../components/StoryCard.jsx";

const API = import.meta.env.VITE_API;

const Home = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showBounce, setShowBounce] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowBounce(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

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
    <div className="h-screen w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth no-scrollbar">
      <div className="absolute top-0 left-0 w-full z-12 bg-linear-to-b from-black/60 to-transparent pointer-events-none">
        <img
          src="/white_mainlogo.png"
          alt="logo"
          className="size-30 ml-5 mt-[-18px]"
        />
      </div>

      {stories.length === 0 ? (
        <div className="h-full flex items-center justify-center text-slate-500">
          No stories yet.
        </div>
      ) : (
        <>
          {stories.map((s, i) => {
            const isLast = i === stories.length - 1;
            const isFirst = i === 0;

            return (
              <div key={s.slug} className="relative size-full snap-start">
                <StoryCard
                  s={s}
                  isLast={isLast}
                  isFirst={isFirst}
                  showBounce={isFirst && showBounce}
                  showOverlay={true}
                />

                {isFirst && showBounce && (
                  <div className="absolute bottom-0 left-0 w-full h-20 flex items-center justify-center animate-fade-in-out z-0 bg-linear-to-br to-[#EDB843] from-white backdrop-blur-xl">
                    <div className="relative flex items-center gap-2 text-zinc-800  px-8 py-4 rounded-full shadow-2xl border border-black/10">
                      <div className="absolute inset-0 bg-linear-to-b from-black/20 via-transparent to-transparent rounded-full pointer-events-none" />
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="animate-bounce relative z-10"
                      >
                        <path d="M12 5v14m0 0l-6-6m6 6l6-6" />
                      </svg>
                      <span className="text-sm font-semibold relative z-10 bg-linear-to-r from-black via-slate-800 to-black bg-clip-text">
                        Scroll for more stories
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};

export default Home;
