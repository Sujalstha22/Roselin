"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";

interface VideoData {
    id: number;
    title: string;
    src: string;
    initialLikes: number;
}

const VIDEO_ITEMS: VideoData[] = [
    {
        id: 1,
        title: "Hydration Routine",
        src: "/videos/exp-video.mp4",
        initialLikes: 308,
    },
    {
        id: 2,
        title: "Roselin Serum Texture",
        src: "/videos/hero-video-optimized.mp4",
        initialLikes: 252,
    },
    {
        id: 3,
        title: "Conscious Skincare Essentials",
        src: "/videos/hero-video.mp4",
        initialLikes: 407,
    },
    {
        id: 4,
        title: "Glowing Skin Review",
        src: "/videos/exp-video.mp4",
        initialLikes: 203,
    },
    {
        id: 5,
        title: "Night Routine Application",
        src: "/videos/hero-video-optimized.mp4",
        initialLikes: 195,
    },
];

const TOTAL_SEGMENTS = 5;
// Only render 5 cards: center + 2 on each side → no ±3 bleed
const VISIBLE_OFFSETS = [-2, -1, 0, 1, 2];

const Videosection: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState<number>(2);
    const [isPlaying, setIsPlaying] = useState<boolean>(true);
    const [isMuted, setIsMuted] = useState<boolean>(true);
    const [likesState, setLikesState] = useState<{ [key: number]: { count: number; liked: boolean } }>(() => {
        const initial: { [key: number]: { count: number; liked: boolean } } = {};
        VIDEO_ITEMS.forEach((item) => {
            initial[item.id] = { count: item.initialLikes, liked: false };
        });
        return initial;
    });

    const [activeProgress, setActiveProgress] = useState<number>(0);
    const [currentSegment, setCurrentSegment] = useState<number>(0);
    const [cardWidth, setCardWidth] = useState<number>(300);
    const [cardGap, setCardGap] = useState<number>(25);
    const [isMobileView, setIsMobileView] = useState<boolean>(false);
    const [showPlayPulse, setShowPlayPulse] = useState<boolean>(false);

    const videoRefs = useRef<Map<number, HTMLVideoElement>>(new Map());
    const containerRef = useRef<HTMLDivElement>(null);
    const touchStartX = useRef<number | null>(null);

    useEffect(() => {
        const updateDimensions = () => {
            const width = window.innerWidth;
            if (width < 640) {
                // Full-width card; non-active opacity forced to 0 → only 1 visible
                setCardWidth(Math.round(width * 0.88));
                setCardGap(16);
                setIsMobileView(true);
            } else if (width < 1024) {
                setCardWidth(200);
                setCardGap(14);
                setIsMobileView(false);
            } else if (width < 1440) {
                // 230px: ±2 right-edge = 2*(230+18)+115 = 611 < 640 (half of 1280) ✓
                setCardWidth(230);
                setCardGap(18);
                setIsMobileView(false);
            } else {
                // 250px: ±2 right-edge = 2*(250+20)+125 = 665 < 720 (half of 1440) ✓
                setCardWidth(250);
                setCardGap(20);
                setIsMobileView(false);
            }
        };

        updateDimensions();
        window.addEventListener("resize", updateDimensions);
        return () => window.removeEventListener("resize", updateDimensions);
    }, []);

    useEffect(() => {
        videoRefs.current.forEach((video, vIdx) => {
            if (!video) return;

            if (vIdx === activeIndex) {
                video.muted = isMuted;
                if (isPlaying) {
                    const playPromise = video.play();
                    if (playPromise !== undefined) {
                        playPromise.catch(() => { });
                    }
                } else {
                    video.pause();
                }
            } else {
                video.pause();
            }
        });
    }, [activeIndex, isPlaying, isMuted]);

    const handleTimeUpdate = (vIdx: number) => {
        if (vIdx !== activeIndex) return;
        const video = videoRefs.current.get(vIdx);
        if (!video || !video.duration) return;

        const totalRatio = Math.min(1, Math.max(0, video.currentTime / video.duration));
        const segmentIndex = Math.min(
            TOTAL_SEGMENTS - 1,
            Math.floor(totalRatio * TOTAL_SEGMENTS)
        );
        const segmentProgressRatio = (totalRatio * TOTAL_SEGMENTS) % 1;

        setCurrentSegment(segmentIndex);
        setActiveProgress(segmentProgressRatio * 100);
    };

    const handlePrev = useCallback(() => {
        setActiveIndex((prev) => prev - 1);
        setIsPlaying(true);
        setCurrentSegment(0);
        setActiveProgress(0);
    }, []);

    const handleNext = useCallback(() => {
        setActiveIndex((prev) => prev + 1);
        setIsPlaying(true);
        setCurrentSegment(0);
        setActiveProgress(0);
    }, []);

    const handleVideoEnded = (vIdx: number) => {
        if (vIdx !== activeIndex) return;
        handleNext();
    };

    const selectCard = (offset: number) => {
        if (offset === 0) {
            setIsPlaying((prev) => !prev);
            setShowPlayPulse(true);
            setTimeout(() => setShowPlayPulse(false), 600);
        } else {
            setActiveIndex((prev) => prev + offset);
            setIsPlaying(true);
            setCurrentSegment(0);
            setActiveProgress(0);
        }
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "ArrowLeft") {
                handlePrev();
            } else if (e.key === "ArrowRight") {
                handleNext();
            } else if (e.key === " " && document.activeElement === document.body) {
                e.preventDefault();
                setIsPlaying((prev) => !prev);
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [handlePrev, handleNext]);

    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        if (touchStartX.current === null) return;
        const touchEndX = e.changedTouches[0].clientX;
        const diff = touchStartX.current - touchEndX;

        if (Math.abs(diff) > 45) {
            if (diff > 0) {
                handleNext();
            } else {
                handlePrev();
            }
        }
        touchStartX.current = null;
    };

    const toggleLike = (e: React.MouseEvent, id: number) => {
        e.stopPropagation();
        setLikesState((prev) => {
            const current = prev[id];
            const newLiked = !current.liked;
            return {
                ...prev,
                [id]: {
                    liked: newLiked,
                    count: newLiked ? current.count + 1 : current.count - 1,
                },
            };
        });
    };

    const toggleMute = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsMuted((prev) => !prev);
    };

    const handleSegmentClick = (e: React.MouseEvent, segIdx: number) => {
        e.stopPropagation();
        const video = videoRefs.current.get(activeIndex);
        if (!video || !video.duration) return;
        const newTime = (segIdx / TOTAL_SEGMENTS) * video.duration;
        video.currentTime = newTime;
        setCurrentSegment(segIdx);
        setActiveProgress(0);
        if (!isPlaying) {
            setIsPlaying(true);
        }
    };

    return (
        <section
            ref={containerRef}
            className="relative w-full h-dvh bg-burgundy text-white flex flex-col justify-center items-center py-6 md:py-10 overflow-hidden select-none"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >
            <div className="relative w-full flex-1 flex items-center justify-center">
                <button
                    onClick={handlePrev}
                    aria-label="Previous video"
                    className="absolute left-1 sm:left-3 md:left-6 lg:left-10 z-40 p-2.5 sm:p-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md text-white/80 hover:text-white transition-all duration-300 hover:scale-105 active:scale-95 group flex items-center justify-center cursor-pointer"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2.2"
                        stroke="currentColor"
                        className="w-5 h-5 -translate-x-0.5 group-hover:-translate-x-1 transition-transform duration-200"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                </button>

                <button
                    onClick={handleNext}
                    aria-label="Next video"
                    className="absolute right-1 sm:right-3 md:right-6 lg:right-10 z-40 p-2.5 sm:p-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md text-white/80 hover:text-white transition-all duration-300 hover:scale-105 active:scale-95 group flex items-center justify-center cursor-pointer"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2.2"
                        stroke="currentColor"
                        className="w-5 h-5 translate-x-0.5 group-hover:translate-x-1 transition-transform duration-200"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                </button>

                <div
                    className="relative w-full h-full flex items-center justify-center"
                    style={{ perspective: "1000px" }}
                >
                    {VISIBLE_OFFSETS.map((offset) => {
                        const virtualIndex = activeIndex + offset;
                        const itemIndex =
                            ((virtualIndex % VIDEO_ITEMS.length) + VIDEO_ITEMS.length) %
                            VIDEO_ITEMS.length;
                        const item = VIDEO_ITEMS[itemIndex];
                        const isActive = offset === 0;
                        const distance = Math.abs(offset);
                        const translateX = offset * (cardWidth + cardGap);

                        const scale = isActive ? 1 : Math.max(0.82, 0.94 - distance * 0.05);
                        // On mobile: force side cards invisible; on desktop: fade by distance
                        const opacity = isActive
                            ? 1
                            : isMobileView
                                ? 0
                                : Math.max(0.18, 0.62 - distance * 0.18);
                        const zIndex = 30 - distance * 5;

                        return (
                            <div
                                key={virtualIndex}
                                onClick={() => selectCard(offset)}
                                className={`absolute top-1/2 left-1/2  rounded-2xl overflow-hidden cursor-pointer shadow-2xl transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group ${isActive
                                    ? "ring-1 ring-white/30 shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
                                    : "hover:opacity-85"
                                    }`}
                                style={{
                                    width: `${cardWidth}px`,
                                    height: `${cardWidth * 1.2 * (16 / 9)}px`,
                                    maxHeight: "88%",
                                    transform: `translate(calc(-50% + ${translateX}px), -50%) scale(${scale})`,
                                    zIndex,
                                    opacity,
                                }}
                            >
                                <video
                                    ref={(el) => {
                                        if (el) {
                                            videoRefs.current.set(virtualIndex, el);
                                        } else {
                                            videoRefs.current.delete(virtualIndex);
                                        }
                                    }}
                                    src={item.src}
                                    playsInline
                                    muted={isMuted}
                                    loop={false}
                                    preload="auto"
                                    onTimeUpdate={() => handleTimeUpdate(virtualIndex)}
                                    onEnded={() => handleVideoEnded(virtualIndex)}
                                    className={`w-full h-full object-cover transition-all duration-700 ${isActive
                                        ? "filter-none"
                                        : "filter grayscale contrast-110 brightness-60 group-hover:brightness-75"
                                        }`}
                                />

                                <div
                                    className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${isActive
                                        ? "bg-gradient-to-t from-black/85 via-black/20 to-black/30"
                                        : "bg-black/50 group-hover:bg-black/40"
                                        }`}
                                />

                                {isActive && (
                                    <div className="absolute top-3.5 left-3 right-3 z-30 flex items-center gap-1.5 px-0.5">
                                        {Array.from({ length: TOTAL_SEGMENTS }).map((_, segIdx) => {
                                            let fillPercentage = 0;
                                            if (segIdx < currentSegment) {
                                                fillPercentage = 100;
                                            } else if (segIdx === currentSegment) {
                                                fillPercentage = activeProgress;
                                            }

                                            return (
                                                <div
                                                    key={segIdx}
                                                    onClick={(e) => handleSegmentClick(e, segIdx)}
                                                    className="h-[3px] flex-1 bg-white/30 rounded-full overflow-hidden cursor-pointer hover:h-[4px] transition-all duration-150 relative"
                                                    title={`Part ${segIdx + 1}`}
                                                >
                                                    <div
                                                        className="h-full bg-white rounded-full transition-[width] duration-100 ease-linear"
                                                        style={{ width: `${fillPercentage}%` }}
                                                    />
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}

                                {!isActive && (
                                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                        <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-black/45 backdrop-blur-md border border-white/25 flex items-center justify-center text-white/90 shadow-xl group-hover:scale-110 group-hover:bg-black/60 group-hover:border-white/40 transition-all duration-300">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                fill="currentColor"
                                                className="w-5 h-5 md:w-6 md:h-6 translate-x-0.5 text-white"
                                            >
                                                <path d="M8 5v14l11-7z" />
                                            </svg>
                                        </div>
                                    </div>
                                )}

                                {isActive && showPlayPulse && (
                                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30 animate-out fade-out zoom-out-90 duration-500">
                                        <div className="w-16 h-16 rounded-full bg-black/60 backdrop-blur-md border border-white/30 flex items-center justify-center text-white">
                                            {isPlaying ? (
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 24 24"
                                                    fill="currentColor"
                                                    className="w-7 h-7 translate-x-0.5"
                                                >
                                                    <path d="M8 5v14l11-7z" />
                                                </svg>
                                            ) : (
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 24 24"
                                                    fill="currentColor"
                                                    className="w-7 h-7"
                                                >
                                                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                                                </svg>
                                            )}
                                        </div>
                                    </div>
                                )}

                                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5 z-30 flex items-end justify-between gap-3">
                                    <div className="flex-1 pr-2">
                                        <h3
                                            className={`text-sm md:text-base font-normal tracking-wide leading-snug drop-shadow transition-colors duration-300 ${isActive ? "text-white font-medium" : "text-white/80"
                                                }`}
                                        >
                                            {item.title}
                                        </h3>
                                    </div>

                                    <div className="flex flex-col items-center gap-3 shrink-0">
                                        <div className="flex flex-col items-center group/btn">
                                            <button
                                                type="button"
                                                onClick={(e) => toggleLike(e, item.id)}
                                                aria-label="Like video"
                                                className="p-1 text-white hover:scale-115 active:scale-90 transition-transform duration-200 cursor-pointer"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 24 24"
                                                    fill={likesState[item.id]?.liked ? "#c9184a" : "none"}
                                                    stroke={likesState[item.id]?.liked ? "#c9184a" : "currentColor"}
                                                    strokeWidth="1.8"
                                                    className={`w-6 h-6 transition-all duration-200 ${likesState[item.id]?.liked
                                                        ? "scale-110 drop-shadow-[0_0_8px_rgba(201,24,74,0.6)]"
                                                        : ""
                                                        }`}
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                                                    />
                                                </svg>
                                            </button>
                                            <span className="text-[11px] font-light text-white/90 tracking-tight leading-none mt-0.5">
                                                {likesState[item.id]?.count ?? item.initialLikes}
                                            </span>
                                        </div>

                                        <button
                                            type="button"
                                            onClick={toggleMute}
                                            aria-label={isMuted ? "Unmute sound" : "Mute sound"}
                                            className="p-1 text-white/90 hover:text-white hover:scale-110 active:scale-90 transition-all duration-200 cursor-pointer"
                                        >
                                            {isMuted ? (
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth="1.8"
                                                    stroke="currentColor"
                                                    className="w-5 h-5"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25m-2.25 2.25l-2.25 2.25m-10.5-6l4.72-4.72a.75.75 0 011.28.531V19.94a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.506-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.395C2.806 8.757 3.63 8.25 4.51 8.25H6.75z"
                                                    />
                                                </svg>
                                            ) : (
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth="1.8"
                                                    stroke="currentColor"
                                                    className="w-5 h-5 text-rose-300"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.506-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.395C2.806 8.757 3.63 8.25 4.51 8.25H6.75z"
                                                    />
                                                </svg>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Mobile swipe hint */}
            <p className="sm:hidden mt-4 text-white/40 text-xs tracking-widest uppercase text-center select-none">
                Swipe to browse
            </p>
        </section>
    );
};

export default Videosection;
