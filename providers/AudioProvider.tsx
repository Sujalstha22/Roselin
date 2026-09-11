"use client";

import React, {
    createContext,
    useContext,
    useRef,
    useState,
    useEffect,
    useCallback,
} from "react";

interface AudioContextType {
    isPlaying: boolean;
    isMuted: boolean;
    toggleAudio: () => void;
    playAudio: () => void;
    pauseAudio: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(true);

    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        const audio = new Audio("/audio/audio.mp3");

        audio.loop = true;
        audio.preload = "auto";
        audio.volume = 0.5;
        audio.muted = true;

        audioRef.current = audio;

        const handlePlay = () => setIsPlaying(true);
        const handlePause = () => setIsPlaying(false);

        audio.addEventListener("play", handlePlay);
        audio.addEventListener("pause", handlePause);

        return () => {
            audio.removeEventListener("play", handlePlay);
            audio.removeEventListener("pause", handlePause);
            audio.pause();
            audioRef.current = null;
        };
    }, []);

    const playAudio = useCallback(() => {
        const audio = audioRef.current;

        if (!audio) return;

        audio.muted = false;
        setIsMuted(false);

        audio.play().catch(() => { });
    }, []);

    const pauseAudio = useCallback(() => {
        const audio = audioRef.current;

        if (!audio) return;

        audio.pause();
        setIsPlaying(false);
    }, []);

    const toggleAudio = useCallback(() => {
        const audio = audioRef.current;

        if (!audio) return;

        if (audio.paused) {
            audio.muted = false;
            setIsMuted(false);

            audio.play().catch(() => { });
            return;
        }

        audio.muted = !audio.muted;
        setIsMuted(audio.muted);
    }, []);

    return (
        <AudioContext.Provider
            value={{
                isPlaying,
                isMuted,
                toggleAudio,
                playAudio,
                pauseAudio,
            }}
        >
            {children}
        </AudioContext.Provider>
    );
};

export const useAudio = (): AudioContextType => {
    const context = useContext(AudioContext);

    if (!context) {
        throw new Error("useAudio must be used within an AudioProvider");
    }

    return context;
};

export default AudioProvider;