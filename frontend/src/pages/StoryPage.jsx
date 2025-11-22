import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const API = import.meta.env.VITE_API;

const HighlightGerman = ({ text }) => {
  const regex = /(\b[A-Za-zÄÖÜäöüß]+)\s*\(([^)]+)\)/g;

  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    const [fullMatch, germanWord, meaning] = match;

    parts.push(text.slice(lastIndex, match.index));

    parts.push(
      <span key={match.index} className="font-medium text-blue-700">
        {germanWord}
        <span className="text-blue-500"> ({meaning})</span>
      </span>
    );

    lastIndex = regex.lastIndex;
  }

  parts.push(text.slice(lastIndex));

  return <>{parts}</>;
};

const Paragraph = ({ text }) => {
  return (
    <p className="text-lg leading-8 text-slate-700 mb-6 font-serif">
      <HighlightGerman text={text} />
    </p>
  );
};

const StoryPage = () => {
  const { slug } = useParams();
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`${API}/stories/${slug}`);
        const json = await res.json();
        if (json.data) setStory(json.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [slug]);

  if (loading)
    return <div className="p-10 text-center text-slate-400">Loading...</div>;

  if (!story)
    return (
      <div className="p-10 text-center">
        <p>Story not found.</p>
        <Link to="/" className="text-blue-500 underline mt-4 block">
          Go Home
        </Link>
      </div>
    );

  const paragraphs = story.story
    .split("\n\n")
    .filter((p) => p.trim().length > 0);

  return (
    <>
      <nav className="bg-white shadow-sm px-6 md:px-12 shrink-0 border-b border-[#9c9c9c]/40">
        <div className="max-w-7xl mx-auto">
          <img src="/mainlogo.png" alt="logo" className="h-20 w-20" />
        </div>
      </nav>
      <article className="h-full overflow-y-auto bg-white pb-20">
        <div className="relative w-full h-64">
          <img
            src={story.heroImageUrl || story.coverImageUrl}
            alt={story.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-white via-transparent to-transparent" />

          <Link
            to="/"
            className="absolute top-4 left-4 bg-white/80 backdrop-blur p-2 rounded-full shadow-sm z-10"
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
              <path d="m15 18-6-6 6-6" />
            </svg>
          </Link>
        </div>

        <div className="max-w-xl mx-auto px-6 -mt-12 relative z-10">
          <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 p-6 mb-8 border border-slate-50">
            <div className="flex justify-between items-start mb-4">
              <span className="bg-amber-100 text-amber-800 text-xs font-bold px-2 py-1 rounded uppercase">
                {story.level}
              </span>
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              {story.title}
            </h1>
            <p className="text-slate-500 text-sm">{story.description}</p>
          </div>

          <div className="prose prose-slate prose-lg max-w-none">
            {paragraphs.map((p, i) => (
              <Paragraph key={i} text={p} />
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-slate-100 text-center">
            <p className="text-slate-400 text-sm italic">Great job reading!</p>
            <Link
              to="/"
              className="mt-4 inline-block text-blue-600 font-semibold"
            >
              Read another story &rarr;
            </Link>
          </div>
        </div>
      </article>
    </>
  );
};

export default StoryPage;
