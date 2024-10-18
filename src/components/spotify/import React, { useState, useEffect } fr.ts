import React, { useState, useEffect } from "react";
import { AiFillAudio, AiFillSound } from "react-icons/ai";
import { CiHeadphones } from "react-icons/ci";
import { PiHeadphonesFill } from "react-icons/pi";
import { SiSpotify } from "react-icons/si";

interface TrackData {
  artists: string[];
  track: string;
  album: string;
  albumArt: string;
}

interface ApiResponse {
  currentlyPlaying: TrackData | null;
  top10: TrackData[] | null;
}

const TopTracks = () => {
  const [currentlyPlaying, setCurrentlyPlaying] = useState<TrackData | null>(
    null
  );
  const [top10, setTop10] = useState<TrackData[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const fetchCurrentlyPlaying = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/spotify"); // Adjust the endpoint if necessary
        const data: ApiResponse = await response.json();

        if (response.ok) {
          // setCurrentlyPlaying(data.currentlyPlaying);
          setTop10(data.top10);
        } else {
          setError("Error fetching currently playing track");
        }
      } catch (err) {
        setError("Failed to fetch currently playing track");
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentlyPlaying();
  }, []);

  useEffect(() => {
    console.log(top10);
    console.log(currentlyPlaying);
  }, [top10]);

  const NowPlaying = () => {
    const [showInfo, setShowInfo] = useState(true);

    return (
      <div className="flex flex-col items-center justify-center gap-8">
        <div className="flex flex-1 flex-col mb-6 w-full">
          <h4 className="flex items-center mb-6">
            <PiHeadphonesFill className="text-burn text-2xl" />
            <span className="font-bold ml-2 flex flex-row items-center">
              Top 10 on <SiSpotify className="ml-2" />
            </span>
          </h4>

          <div className="flex-1 flex flex-col">
            {/* Display only 3 items when showMore is false, or all items when true */}
            {top10
              ?.slice(0, showMore ? top10.length : 3)
              .map((track: any, index: number) => (
                <div
                  key={index}
                  className="bg-zinc-700 rounded flex flex-row items-center group justify-between pb-2 px-2 pt-2 mb-2 cursor-pointer relative overflow-hidden hover:overflow-visible"
                >
                  <div className="flex flex-row items-center justify-between gap-2 w-full z-10">
                    <div className="flex flex-row items-center gap-2">
                      <span className="text-burnLight font-bold">
                        {index + 1}.
                      </span>
                      <div className="flex flex-col">
                        <p className="text-[10px] font-semibold">{track.track}</p>
                        <p className="text-[9px] font-normal">
                          {track.artists.join(", ")}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="group-hover:block absolute left-2/3 rounded-full group-hover:rounded-none w-[35%] h-auto z-[1] group-hover:z-10">
                    <img
                      src={track.albumArt}
                      alt="Track Album art"
                      className="rounded-full group-hover:rounded-none w-full h-full z-0"
                    />
                    {/* Overlay to darken the image */}
                    <div className="absolute inset-0 bg-zinc-900 opacity-70 group-hover:opacity-0 rounded-full z-10"></div>
                  </div>
                </div>
              ))}

            {/* "Show more" button */}
            {!showMore && (
              <button
                className="text-burn mt-1 text-[10px] font-semibold underline"
                onClick={() => setShowMore(true)}
              >
                Gimmie the rest...
              </button>
            )}
          </div>
          import React, { useState, useEffect } from "react";
import { AiFillAudio, AiFillSound } from "react-icons/ai";
import { CiHeadphones } from "react-icons/ci";
import { PiHeadphonesFill } from "react-icons/pi";
import { SiSpotify } from "react-icons/si";

interface TrackData {
  artists: string[];
  track: string;
  album: string;
  albumArt: string;
}

interface ApiResponse {
  currentlyPlaying: TrackData | null;
  top10: TrackData[] | null;
}

const TopTracks = () => {
  const [currentlyPlaying, setCurrentlyPlaying] = useState<TrackData | null>(
    null
  );
  const [top10, setTop10] = useState<TrackData[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const fetchCurrentlyPlaying = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/spotify"); // Adjust the endpoint if necessary
        const data: ApiResponse = await response.json();

        if (response.ok) {
          // setCurrentlyPlaying(data.currentlyPlaying);
          setTop10(data.top10);
        } else {
          setError("Error fetching currently playing track");
        }
      } catch (err) {
        setError("Failed to fetch currently playing track");
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentlyPlaying();
  }, []);

  useEffect(() => {
    console.log(top10);
    console.log(currentlyPlaying);
  }, [top10]);

  const NowPlaying = () => {
    const [showInfo, setShowInfo] = useState(true);

    return (
      <div className="flex flex-col items-center justify-center gap-8">
        <div className="flex flex-1 flex-col mb-6 w-full">
          <h4 className="flex items-center mb-6">
            <PiHeadphonesFill className="text-burn text-2xl" />
            <span className="font-bold ml-2 flex flex-row items-center">
              Top 10 on <SiSpotify className="ml-2" />
            </span>
          </h4>

          <div className="flex-1 flex flex-col">
            {/* Display only 3 items when showMore is false, or all items when true */}
            {top10
              ?.slice(0, showMore ? top10.length : 3)
              .map((track: any, index: number) => (
                <div
                  key={index}
                  className="bg-zinc-700 rounded flex flex-row items-center group justify-between pb-2 px-2 pt-2 mb-2 cursor-pointer relative overflow-hidden hover:overflow-visible"
                >
                  <div className="flex flex-row items-center justify-between gap-2 w-full z-10">
                    <div className="flex flex-row items-center gap-2">
                      <span className="text-burnLight font-bold">
                        {index + 1}.
                      </span>
                      <div className="flex flex-col">
                        <p className="text-[10px] font-semibold">{track.track}</p>
                        <p className="text-[9px] font-normal">
                          {track.artists.join(", ")}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="group-hover:block absolute left-2/3 rounded-full group-hover:rounded-none w-[35%] h-auto z-[1] group-hover:z-10">
                    <img
                      src={track.albumArt}
                      alt="Track Album art"
                      className="rounded-full group-hover:rounded-none w-full h-full z-0"
                    />
                    {/* Overlay to darken the image */}
                    <div className="absolute inset-0 bg-zinc-900 opacity-70 group-hover:opacity-0 rounded-full z-10"></div>
                  </div>
                </div>
              ))}

            {/* "Show more" button */}
            {!showMore && (
              <button
                className="text-burn mt-1 text-[10px] font-semibold underline"
                onClick={() => setShowMore(true)}
              >
                Gimmie the rest...
              </button>
            )}
          </div>
        </div>
        {/* <div
          className={`max-w-[200px] w-[200px] min-h-[200px] relative ${
            currentlyPlaying && "animate-pulse"
          }`}
        >
          {/* Largest circle (Black) */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[202px] h-[202px] bg-black rounded-full"></div>

          {currentlyPlaying && (
            <img
              src={currentlyPlaying.albumArt}
              alt="Track Album art"
              className="rounded-full w-full animate-rotate cursor-pointer z-10"
              onClick={() => setShowInfo(!showInfo)}
            />
          )}

          {/* Middle circle (White) */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[40px] h-[40px] bg-white rounded-full"></div>

          {/* Smallest circle (Center hole) */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[5px] h-[5px] bg-black rounded-full"></div>

          {showInfo && (
            <div
              className={`flex flex-col justify-between absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/4 w-full h-[70%] box-border border-2 ${
                currentlyPlaying ? "bg-zinc-700" : "bg-burnDark"
              } rounded p-2 z-20`}
            >
              <p className="self-start text-sm font-black">
                Now playing on Spotify:
              </p>
              {currentlyPlaying ? (
                <>
                  <h4 className="text-2xl text-burnLight mb-2">Now playing:</h4>
                  <p className="text-lg font-semibold mb-2">
                    {currentlyPlaying.artists.join(", ")}
                  </p>
                  <p className="text-xl font-bold mb-2">
                    {currentlyPlaying.track}
                  </p>
                  <p className="text-lg">{currentlyPlaying.album}</p>
                </>
              ) : (
                <h4 className="text-base text-white font-black">OFF AIR.</h4>
              )}
              <div></div>
            </div>
          )}
        </div> */}
      </div>
    );
  };

  return (
    <div>
      <NowPlaying />
    </div>
  );
};

export default TopTracks;

        </div>        
      </div>
    );
  };

  return (
    <div>
      <NowPlaying />
    </div>
  );
};

export default TopTracks;
