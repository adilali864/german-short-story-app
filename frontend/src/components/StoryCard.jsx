import { Link } from "react-router-dom";

const StoryCard = ({ s, isLast, showOverlay, isFirst, showBounce }) => {
  return (
    <div
      className={`relative size-full bg-slate-900 text-white overflow-hidden z-10 ${
        showBounce ? "animate-bounce-up" : ""
      }`}
    >
      <img
        src={
          s.coverImageUrl ||
          "https://images.unsplash.com/photo-1519681393798-3828fb4090bb?q=80&w=1000&auto=format&fit=crop"
        }
        alt={s.title}
        className="absolute inset-0 w-full h-full object-cover opacity-80"
      />

      <div className="absolute inset-0 bg-linear-to-b from-black/30 via-transparent to-black/90" />

      <div className="absolute bottom-0 left-0 w-full p-6 pb-10 flex flex-col gap-3 z-10">
        <span className="bg-white/20 backdrop-blur-sm text-white text-[10px] font-medium px-2 py-1 rounded w-18">
          5 min read
        </span>

        <h2 className="text-3xl font-bold leading-tight shadow-black drop-shadow-md">
          {s.title}
        </h2>

        <p className="text-slate-200 text-sm line-clamp-2 leading-relaxed opacity-90">
          {s.description}
        </p>

        <Link
          to={`/story/${s.slug}`}
          className="mt-4 w-full bg-white text-slate-900 font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-slate-100 transition active:scale-95"
        >
          Read Story
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        </Link>
      </div>

      {showOverlay && (
        <div className="absolute inset-0 flex flex-col items-end pr-5 justify-start pt-5 pointer-events-none">
          {!isLast && (
            <>
              <button className="bg-white/90 text-slate-900 shadow-lg px-4 py-2 rounded-full flex items-center gap-1 animate-bounce backdrop-blur-md pointer-events-auto">
                <span className="text-sm font-medium">Scroll</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 5v14m0 0l-6-6m6 6l6-6" />
                </svg>
              </button>
              <p className="text-xs text-white/80 mt-2">More stories below</p>
            </>
          )}

          {isLast && (
            <div className="bg-white/90 text-slate-900 shadow-lg px-4 py-2 rounded-full backdrop-blur-md animate-pulse">
              <span className="text-sm font-semibold">
                That's all for now 🎉
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StoryCard;
