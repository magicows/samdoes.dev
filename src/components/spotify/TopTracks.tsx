import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { PiHeadphonesFill } from "react-icons/pi";
import { SiSpotify } from "react-icons/si";
import useMediaQuery from "../util/Hooks";
import { ShuffleLoader } from "./Loader";
import Reveal from "../util/Reveal";

interface TrackData {
  artists: string[];
  track: string;
  album: string;
  albumArt: string;
}

type Range = "short_term" | "medium_term" | "long_term";

const TRACK_SKELETON_COUNT = 10;

interface NowPlayingProps {
  currentlyPlaying: TrackData | null;
  top10: TrackData[] | null;
  showMore: boolean;
  setShowMore: (show: boolean) => void;
  isMediumScreen: boolean;
  range: Range;
  isTopTracksUpdating: boolean;
  setRange: (range: Range) => void;
}

const NowPlaying: React.FC<NowPlayingProps> = ({
  currentlyPlaying,
  top10,
  showMore,
  setShowMore,
  isMediumScreen,
  range,
  isTopTracksUpdating,
  setRange,
}) => {
  const [showInfo, setShowInfo] = useState(true);
  const visibleTrackCount = showMore || isMediumScreen ? TRACK_SKELETON_COUNT : 3;

  return (
    <div className="section-panel relative overflow-hidden px-5 py-6 md:px-6 md:py-7">
      <div className="absolute right-4 top-4 h-5 w-20 border-[3px] border-black bg-[var(--accent-secondary)] shadow-[4px_4px_0px_0px_#000]" />
      <div className="absolute bottom-4 left-4 h-4 w-4 border-[3px] border-black bg-[var(--accent-tertiary)] shadow-[3px_3px_0px_0px_#000]" />
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="section-kicker mb-4">Spotify feed</div>
          <h4 className="flex items-center gap-3 text-2xl font-black uppercase tracking-tight text-zinc-100 md:text-3xl">
            <span className="flex h-10 w-10 items-center justify-center border-[3px] border-black bg-[var(--accent-primary)] text-white shadow-[4px_4px_0px_0px_#000]">
              <PiHeadphonesFill className="text-2xl" />
            </span>
            <span className="flex flex-row items-center gap-2">
              Top tracks
              <SiSpotify className="text-[var(--accent-secondary)]" />
            </span>
          </h4>
        </div>

        <div className="flex w-full items-center gap-2 md:w-auto md:ml-auto">
          <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Range</span>
          <div className="flex overflow-hidden border-[3px] border-black shadow-[4px_4px_0px_0px_#000]">
            {["short_term", "medium_term", "long_term"].map((r) => (
              <button
                key={r}
                disabled={isTopTracksUpdating}
                className={`px-3 py-2 text-[10px] font-black uppercase tracking-[0.16em] transition-colors ${
                  range === r
                    ? "bg-[var(--accent-primary)] text-white"
                    : "bg-zinc-100 text-black hover:bg-[var(--accent-tertiary)]"
                } ${isTopTracksUpdating ? "cursor-not-allowed opacity-50" : ""}`}
                onClick={() => setRange(r as Range)}
              >
                {r === "short_term" ? "4w" : r === "medium_term" ? "6m" : "All"}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col items-stretch justify-center gap-8 md:flex-row">
        {((showMore && !isMediumScreen) || isMediumScreen) && (
          <div className="order-2 flex flex-col justify-between md:order-1 md:w-[280px]">
            <Reveal width="w-full">
              <div className="section-panel-soft mx-auto mb-[6px] flex w-full max-w-[300px] justify-center p-4">
                <div className="relative flex min-h-[full] min-w-[full] justify-center">
                  <div className="absolute top-1/2 left-1/2 aspect-square w-[calc(90%+2px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-black"></div>
                  {currentlyPlaying ? (
                    <img
                      src={currentlyPlaying.albumArt}
                      alt="Track Album art"
                      className="rounded-full w-[90%] animate-rotate cursor-pointer z-[1]"
                      onClick={() => setShowInfo(!showInfo)}
                      style={{ animationDelay: "2.6s" }}
                    />
                  ) : (
                    <img
                      src="https://static.wikia.nocookie.net/watchmen/images/2/2b/Comedian%27s_Badge.jpg/revision/latest/scale-to-width-down/1200?cb=20250521210137"
                      alt="Static Noise"
                      className="rounded-full w-[90%] z-[1] rotate-45 animate-rotate "
                    />
                  )}
                  <div className="absolute top-1/2 left-1/2 aspect-square w-[25%] -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-black bg-zinc-100 z-[2]"></div>
                  <div className="absolute top-1/2 left-1/2 aspect-square w-[2%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-black z-[3]"></div>
                  {showInfo && (
                    <div className={`absolute top-1/2 left-1/2 box-border flex min-h-[53%] w-full -translate-x-1/2 flex-col justify-between border-[3px] border-black p-3 z-20 shadow-[5px_5px_0px_0px_#000] ${currentlyPlaying ? "bg-zinc-100 text-black" : "bg-[var(--accent-primary)] text-white"}`}>
                      <div className="flex w-full flex-row items-center justify-between self-start text-sm font-black">
                        <span className={`${currentlyPlaying ? "text-[var(--accent-primary)]" : "text-white"} font-black uppercase tracking-[0.18em]`}>Listening now</span>
                      </div>
                      <div className={`absolute right-[8px] bottom-[73px] max-w-[100px] rotate-[50deg] ${currentlyPlaying && "animate-rotateonefour delay-300"}`} style={{ transformOrigin: "81% 80%", animationDelay: "0.4s" }}>
                        <img src="/record-arm.png" alt="A graphic depicting a tone arm of a turntable." />
                      </div>
                      {currentlyPlaying ? (
                        <div className="flex flex-col">
                          <p className="line-clamp-1 text-base font-black uppercase">{currentlyPlaying.track}</p>
                          <p className="line-clamp-1 text-[14px] font-semibold">{currentlyPlaying.artists.join(", ")}</p>
                          <p className="line-clamp-1 text-[10px] font-bold uppercase tracking-[0.14em] text-zinc-600">{currentlyPlaying.album}</p>
                        </div>
                      ) : (
                        <h4 className="text-base font-black uppercase">Off air</h4>
                      )}
                      <SiSpotify className="absolute bottom-[10px] right-[10px]" />
                    </div>
                  )}
                </div>
              </div>
            </Reveal>
          </div>
        )}

        <div className="order-1 flex w-full flex-1 flex-col md:order-2">
          <div className="grid flex-1 grid-cols-1 gap-3 md:grid-flow-col md:grid-cols-2 md:grid-rows-5">
            {(top10
              ? top10.slice(0, showMore || isMediumScreen ? top10.length : 3)
              : Array.from({ length: visibleTrackCount }, (_, index) => index)
            ).map((track, index) => (
              typeof track === "number" ? (
                <div
                  key={`${range}-skeleton-${track}`}
                  className="relative flex min-h-[61.5px] flex-row items-center justify-between overflow-hidden border-[3px] border-black bg-zinc-100 px-3 pb-3 pt-3 shadow-[5px_5px_0px_0px_#000]"
                >
                  <div className="flex w-full min-w-0 flex-row items-center justify-between gap-2 pr-[30%]">
                    <div className="flex min-w-0 flex-row items-center gap-3">
                      <motion.div
                        className="h-7 w-7 bg-zinc-300"
                        animate={skeletonPulse}
                        transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut", delay: index * 0.05 }}
                      />
                      <div className="flex min-w-0 flex-col gap-2">
                        <motion.div
                          className="h-3 w-40 max-w-[18vw] bg-zinc-300 md:w-52"
                          animate={skeletonPulse}
                          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut", delay: index * 0.05 + 0.08 }}
                        />
                        <motion.div
                          className="h-2.5 w-24 bg-zinc-300 md:w-32"
                          animate={skeletonPulse}
                          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut", delay: index * 0.05 + 0.16 }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="absolute right-0 top-1/2 h-[calc(100%+6px)] w-[31%] -translate-y-1/2">
                    <motion.div
                      className="h-full w-full bg-zinc-300"
                      animate={skeletonPulse}
                      transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut", delay: index * 0.05 + 0.24 }}
                    />
                  </div>
                </div>
              ) : (
                <div key={`${range}-${index}`} className="group relative z-0 flex cursor-pointer flex-row items-center justify-between overflow-hidden border-[3px] border-black bg-zinc-100 px-3 pb-3 pt-3 shadow-[5px_5px_0px_0px_#000] transition-all hover:z-20 hover:-translate-y-0.5 hover:translate-x-0.5 hover:overflow-visible">
                  <div className="z-10 flex w-full min-w-0 flex-row items-center justify-between gap-2 pr-[30%]">
                    <Reveal>
                      <div className="flex min-w-0 flex-row items-center gap-3">
                        <span className={`flex h-7 w-7 items-center justify-center border-2 border-black text-[11px] font-black shadow-[2px_2px_0px_0px_#000] ${index % 3 === 0 ? "bg-[var(--accent-primary)] text-white" : index % 3 === 1 ? "bg-[var(--accent-secondary)] text-black" : "bg-[var(--accent-tertiary)] text-black"}`}>{index + 1}</span>
                        <div className="flex min-w-0 flex-col">
                          <p className="truncate text-[11px] font-black uppercase text-black">{track.track}</p>
                          <p className="line-clamp-1 text-[10px] font-semibold text-zinc-700">{track.artists.join(", ")}</p>
                        </div>
                      </div>
                    </Reveal>
                  </div>
                  <motion.div
                    className="absolute top-[-3px] right-[-3px] bottom-[-3px] w-[31%] z-[1] group-hover:z-10 group-hover:block group-hover:rounded-none"
                    initial={{ x: 36, opacity: 0, scale: 0.94 }}
                    animate={{ x: 0, opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.38,
                      ease: "easeOut",
                      delay: 0.04 * index,
                    }}
                  >
                    <img src={track.albumArt} alt="Track Album art" className="h-full w-full border-[3px] border-black object-cover group-hover:rounded-none z-0" />
                    <motion.div
                      className="absolute inset-0 bg-zinc-900 z-10 group-hover:opacity-0 group-hover:rounded-none"
                      initial={{ opacity: 0.9 }}
                      animate={{ opacity: 0.5 }}
                      transition={{
                        duration: 0.42,
                        ease: "easeOut",
                        delay: 0.04 * index,
                      }}
                    />
                  </motion.div>
                </div>
              )
            ))}
          </div>
          {!showMore && (
            <button className="mt-4 w-fit border-[3px] border-black bg-[var(--accent-tertiary)] px-4 py-2 text-[10px] font-black uppercase tracking-[0.16em] text-black shadow-[4px_4px_0px_0px_#000] md:hidden" onClick={() => setShowMore(true)}>
              Gimme the rest
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const TopTracks = () => {
  const [currentlyPlaying, setCurrentlyPlaying] = useState<TrackData | null>(null);
  const [top10, setTop10] = useState<TrackData[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isTopTracksUpdating, setIsTopTracksUpdating] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showMore, setShowMore] = useState(false);
  const [range, setRange] = useState<Range>("short_term");
  const isMediumScreen = useMediaQuery("(min-width: 768px)");

  // Use refs to track inflight requests to avoid race conditions
  const topTracksAbortRef = useRef<AbortController | null>(null);
  const isInitialMount = useRef(true);

  const fetchNowPlaying = useCallback(async (opts?: { signal?: AbortSignal }) => {
    try {
      const response = await fetch(`/api/spotify?type=now-playing`, { signal: opts?.signal });
      const data = await response.json();
      if (response.ok) {
        setCurrentlyPlaying(data.currentlyPlaying);
      }
    } catch (err: any) {
      if (err?.name === "AbortError") return;
      console.error("Failed to fetch now playing", err);
    }
  }, []);

  const fetchTopTracks = useCallback(async (opts?: { range: Range; showSpinner?: boolean; signal?: AbortSignal }) => {
    const showSpinner = opts?.showSpinner ?? false;
    try {
      if (showSpinner) {
        setIsTopTracksUpdating(true);
        setTop10(null);
      }
      setError(null);

      const response = await fetch(`/api/spotify?type=top-tracks&range=${opts?.range}`, { signal: opts?.signal });
      const data = await response.json();

      if (response.ok) {
        setTop10(data.top10);
      } else {
        setError("Error fetching top tracks");
      }
    } catch (err: any) {
      if (err?.name === "AbortError") return;
      setError("Failed to fetch top tracks");
    } finally {
      if (showSpinner) setIsTopTracksUpdating(false);
    }
  }, []);

  // Initial load: Fetch both
  useEffect(() => {
    const init = async () => {
      setLoading(true);
      await Promise.all([
        fetchNowPlaying(),
        fetchTopTracks({ range, showSpinner: false })
      ]);
      setLoading(false);
    };
    init();
  }, [fetchNowPlaying, fetchTopTracks]);

  // Range change: Fetch only top tracks
  useEffect(() => {
    // Skip on initial mount - initial load useEffect handles first fetch
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    if (topTracksAbortRef.current) topTracksAbortRef.current.abort();
    topTracksAbortRef.current = new AbortController();

    fetchTopTracks({ range, showSpinner: true, signal: topTracksAbortRef.current.signal });

    return () => topTracksAbortRef.current?.abort();
  }, [range, fetchTopTracks]);

  // Polling: Fetch only now-playing every 30s
  useEffect(() => {
    const interval = setInterval(() => {
      fetchNowPlaying();
    }, 30_000);

    const onVis = () => {
      if (document.visibilityState === "visible") {
        fetchNowPlaying();
      }
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      clearInterval(interval);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [fetchNowPlaying]);

  return (
    <div>
      {loading ? (
        <div className="flex min-h-[220px] items-center justify-center md:min-h-[270px]">
          <ShuffleLoader />
        </div>
      ) : error ? (
        <p className="section-panel mx-auto w-fit p-4 text-center font-black text-red-400">{error}</p>
      ) : (
        <NowPlaying
          currentlyPlaying={currentlyPlaying}
          top10={top10}
          showMore={showMore}
          setShowMore={setShowMore}
          isMediumScreen={isMediumScreen}
          range={range}
          isTopTracksUpdating={isTopTracksUpdating}
          setRange={setRange}
        />
      )}
    </div>
  );
};

export default TopTracks;
const skeletonPulse = {
  opacity: [0.35, 0.65, 0.35],
};
