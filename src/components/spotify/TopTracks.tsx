import React, { useState, useEffect, useCallback, useRef } from "react";
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

interface NowPlayingProps {
  currentlyPlaying: TrackData | null;
  top10: TrackData[] | null;
  showMore: boolean;
  setShowMore: (show: boolean) => void;
  isMediumScreen: boolean;
  range: Range;
  isTopTracksUpdating: boolean;
  setRange: (range: Range) => void;
  fetchNowPlaying: () => void;
  fetchTopTracks: (opts: { range: Range; showSpinner: boolean }) => void;
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
  fetchNowPlaying,
  fetchTopTracks,
}) => {
  const [showInfo, setShowInfo] = useState(true);

  return (
    <div className="flex flex-col md:flex-row items-stretch justify-center gap-8">
      {((showMore && !isMediumScreen) || isMediumScreen) && (
        <div className="md:w-1/4 flex flex-col justify-between order-2 md:order-1">
          <h4 className="hidden md:flex items-center mb-6">
            <PiHeadphonesFill className="text-burn text-2xl" />
            <span className="font-bold ml-2 flex flex-row items-center">
              Top tracks <SiSpotify className="ml-2" />
            </span>
          </h4>

          <Reveal width="w-full">
            <div className={`min-w-[full] max-w-[300px] w-full min-h-[full] mx-auto relative mb-[6px] flex justify-center`}>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[calc(90%+2px)] aspect-square bg-black rounded-full"></div>
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
                  src="https://img.freepik.com/premium-vector/abstract-background-small-squares-pixels-black-gray-colors_444390-9763.jpg"
                  alt="Static Noise"
                  className="rounded-full w-[90%] z-[1]"
                />
              )}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[25%] aspect-square bg-white rounded-full z-[2]"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[2%] aspect-square bg-black rounded-full z-[3]"></div>
              {showInfo && (
                <div className={`flex flex-col justify-between absolute top-1/2 left-1/2 -translate-x-1/2 w-full min-h-[53%] box-border ${currentlyPlaying ? "bg-zinc-700" : "bg-burnDark"} rounded p-2 z-20`}>
                  <div className="flex flex-row items-center justify-between self-start text-sm font-black w-full ">
                    <span className="font-black text-burnLight">Listening now:</span>
                  </div>
                  <div className={`absolute right-[8px] bottom-[73px] max-w-[100px] rotate-[50deg] ${currentlyPlaying && "animate-rotateonefour delay-300"}`} style={{ transformOrigin: "81% 80%", animationDelay: "0.4s" }}>
                    <img src="/record-arm.png" alt="A graphic depicting a tone arm of a turntable." />
                  </div>
                  {currentlyPlaying ? (
                    <div className="flex flex-col">
                      <p className="text-normal font-semibold line-clamp-1">{currentlyPlaying.track}</p>
                      <p className="text-[14px] font-normal line-clamp-1">{currentlyPlaying.artists.join(", ")}</p>
                      <p className="text-[10px] font-light line-clamp-1">{currentlyPlaying.album}</p>
                    </div>
                  ) : (
                    <h4 className="text-base text-white font-black">OFF AIR.</h4>
                  )}
                  <SiSpotify className="absolute bottom-[10px] right-[10px]" />
                </div>
              )}
            </div>
          </Reveal>
        </div>
      )}

      <div className="flex flex-1 flex-col w-full order-1 md:order-2">
        <div className="flex items-start md:items-center justify-between gap-4 mb-6 flex-col md:flex-row">
          <h4 className="flex md:hidden items-center">
            <PiHeadphonesFill className="text-burn text-2xl" />
            <span className="font-bold ml-2 flex flex-row items-center">
              Top tracks <SiSpotify className="ml-2" />
            </span>
          </h4>

          <div className="w-full md:w-auto flex items-center gap-2 md:ml-auto">
            <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-black">Range</span>
            <div className="flex rounded-lg border border-zinc-700 overflow-hidden">
              {["short_term", "medium_term", "long_term"].map((r) => (
                <button
                  key={r}
                  disabled={isTopTracksUpdating}
                  className={`px-3 py-1 text-[10px] font-bold transition-colors ${range === r ? "bg-burn text-zinc-100" : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"} ${isTopTracksUpdating ? "opacity-50 cursor-not-allowed" : ""}`}
                  onClick={() => setRange(r as Range)}
                >
                  {r === "short_term" ? "4w" : r === "medium_term" ? "6m" : "All"}
                </button>
              ))}
            </div>                        
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 md:grid-rows-5 md:grid-flow-col gap-x-2 gap-y-2 flex-1">
          {top10
            ?.slice(0, showMore || isMediumScreen ? top10.length : 3)
            .map((track, index) => (
              <div key={`${range}-${index}`} className="bg-zinc-700 rounded flex flex-row items-center group justify-between pb-2 px-2 pt-2 cursor-pointer relative overflow-hidden hover:overflow-visible">
                <div className="flex flex-row items-center justify-between gap-2 w-full z-10">
                  <Reveal>
                    <div className="flex flex-row items-center gap-2">
                      <span className="text-burnLight font-bold">{index + 1}.</span>
                      <div className="flex flex-col">
                        <p className="text-[10px] font-semibold line-clamp-1">{track.track}</p>
                        <p className="text-[9px] font-normal line-clamp-1">{track.artists.join(", ")}</p>
                      </div>
                    </div>
                  </Reveal>
                </div>
                <div className="group-hover:block absolute left-2/3 rounded-full group-hover:rounded-none w-[35%] h-auto z-[1] group-hover:z-10">
                  <img src={track.albumArt} alt="Track Album art" className="rounded-full group-hover:rounded-none w-full h-full z-0" />
                  <div className="absolute inset-0 bg-zinc-900 opacity-70 group-hover:opacity-0 rounded-full z-10"></div>
                </div>
              </div>
            ))}
        </div>
        {!showMore && (
          <button className="md:hidden text-burn mt-2 text-[10px] font-semibold underline" onClick={() => setShowMore(true)}>
            Gimmie the rest...
          </button>
        )}
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
  const nowPlayingAbortRef = useRef<AbortController | null>(null);
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
      if (showSpinner) setIsTopTracksUpdating(true);
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
        <div className="flex justify-center min-h-[220px] md:min-h-[270px] items-center">
          <ShuffleLoader />
        </div>
      ) : error ? (
        <p className="text-center text-red-500 font-bold p-4">{error}</p>
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
          fetchNowPlaying={fetchNowPlaying}
          fetchTopTracks={fetchTopTracks}
        />
      )}
    </div>
  );
};

export default TopTracks;
