"use client";

import { useRef, useState } from "react";
import RevealText from "../UI/RevealText";
import TextDivider from "../UI/TextDivider";

const VideoSection = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(true);

    const togglePlay = () => {
        if (!videoRef.current) return;

        if (videoRef.current.paused) {
            videoRef.current.play();
            setIsPlaying(true);
        } else {
            videoRef.current.pause();
            setIsPlaying(false);
        }
    };

    return (
        <>
            <TextDivider text="More than pigment, more than color. \n A little expression you carry with you." />

            <section className="flex h-screen items-center justify-center bg-burgundy">

                <div className="relative h-[90vh] w-[85vw] overflow-hidden">
                    <video
                        ref={videoRef}
                        src="/videos/gallery-video.mp4"
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="h-full w-full object-cover"
                    />

                    <button
                        onClick={togglePlay}
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white px-6 py-6 text-black"
                    >
                        {isPlaying ? "❚❚" : "▶"}
                    </button>
                </div>
            </section>
        </>
    );
};

export default VideoSection;