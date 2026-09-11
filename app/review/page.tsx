import Hero from "@/components/review/Hero";
import Videosection from "@/components/review/VideoSection";
import Review from "@/components/review/Review";
import { Metadata } from "next";
import Hero2 from "@/components/review/Hero-2";

export const metadata: Metadata = {
    title: "Reviews | Roselin",
    description: "Real experiences and quiet moments of beauty shared by our community.",
};

export default function ReviewPage() {
    return (
        <main>
            <Hero />
            <Videosection />
            <Hero2 />
            <Review />

        </main>
    );
}