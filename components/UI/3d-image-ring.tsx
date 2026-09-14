"use client";

import Image from "next/image";
import React, { useCallback, useEffect, useRef, useState } from "react";

export interface GalleryItemData {
  image: string;
  category?: string;
  title?: string;
}

export interface ThreeDImageRingProps {
  images: (string | GalleryItemData)[];
  width?: number;
  height?: number;
  perspective?: number;
  draggable?: boolean;
  autoRotate?: boolean;
  autoRotateSpeed?: number;
  containerClassName?: string;
  backgroundColor?: string;
}

const DEFAULT_METADATA = [
  { category: "EDITORIAL", title: "The First Light" },
  { category: "NATURE STUDY", title: "Bloom Beyond" },
  { category: "CAMPAIGN", title: "Midnight Elegance" },
  { category: "EDITORIAL", title: "Silent Grace" },
  { category: "PORTRAIT", title: "Eternal Radiance" },
  { category: "COUTURE", title: "Shadows of Dawn" },
];

const ThreeDImageRing: React.FC<ThreeDImageRingProps> = ({
  images,
  width = 380,
  height = 540,
  perspective = 1200,
  draggable = true,
  autoRotate = true,
  autoRotateSpeed = 0.04,
  containerClassName = "",
  backgroundColor = "#ededed",
}) => {
  // Normalize gallery items with titles and categories matching screenshot
  const normalizedItems: GalleryItemData[] = React.useMemo(() => {
    return images.map((item, index) => {
      const fallbackMeta = DEFAULT_METADATA[index % DEFAULT_METADATA.length];
      if (typeof item === "string") {
        return {
          image: item,
          category: fallbackMeta.category,
          title: fallbackMeta.title,
        };
      }
      return {
        image: item.image,
        category: item.category || fallbackMeta.category,
        title: item.title || fallbackMeta.title,
      };
    });
  }, [images]);

  // Expand items array to create a continuous cylindrical ring (minimum 12 slots)
  const ringItems = React.useMemo(() => {
    if (normalizedItems.length === 0) return [];
    let items = [...normalizedItems];
    while (items.length < 12) {
      items = [...items, ...normalizedItems];
    }
    return items;
  }, [normalizedItems]);

  const [rotationY, setRotationY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [dimensions, setDimensions] = useState({
    cardWidth: width,
    cardHeight: height,
    radius: 820,
  });

  const rotationRef = useRef(0);
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const lastXRef = useRef(0);
  const velocityRef = useRef(0);
  const animFrameIdRef = useRef<number | null>(null);

  // Responsive dimensions calculation
  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth < 640) {
        setDimensions({
          cardWidth: 260,
          cardHeight: 390,
          radius: 480,
        });
      } else if (screenWidth < 1024) {
        setDimensions({
          cardWidth: 320,
          cardHeight: 460,
          radius: 640,
        });
      } else if (screenWidth < 1440) {
        setDimensions({
          cardWidth: 360,
          cardHeight: 510,
          radius: 760,
        });
      } else {
        setDimensions({
          cardWidth: 380,
          cardHeight: 540,
          radius: 840,
        });
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Main animation loop (handles inertia damping and gentle auto-rotation)
  useEffect(() => {
    const updatePhysics = () => {
      if (isDraggingRef.current) {
        // Dragging is updating synchronously
      } else {
        // Apply inertia decay
        if (Math.abs(velocityRef.current) > 0.005) {
          rotationRef.current += velocityRef.current;
          velocityRef.current *= 0.94; // friction
        } else {
          velocityRef.current = 0;
          // Auto rotate when not dragging or hovering
          if (autoRotate && !isHovered) {
            rotationRef.current += autoRotateSpeed;
          }
        }
        setRotationY(rotationRef.current);
      }
      animFrameIdRef.current = requestAnimationFrame(updatePhysics);
    };

    animFrameIdRef.current = requestAnimationFrame(updatePhysics);
    return () => {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [autoRotate, autoRotateSpeed, isHovered]);

  // Pointer / Mouse / Touch Drag handlers
  const handleDragStart = useCallback(
    (clientX: number) => {
      if (!draggable) return;
      isDraggingRef.current = true;
      dragStartXRef.current = clientX;
      lastXRef.current = clientX;
      velocityRef.current = 0;
    },
    [draggable]
  );

  const handleDragMove = useCallback(
    (clientX: number) => {
      if (!draggable || !isDraggingRef.current) return;
      const deltaX = clientX - lastXRef.current;
      lastXRef.current = clientX;

      // Sensitivity factor
      const step = deltaX * 0.22;
      rotationRef.current += step;
      velocityRef.current = step;
      setRotationY(rotationRef.current);
    },
    [draggable]
  );

  const handleDragEnd = useCallback(() => {
    if (!draggable || !isDraggingRef.current) return;
    isDraggingRef.current = false;
  }, [draggable]);

  // Global mouse & touch listeners
  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => handleDragMove(e.clientX);
    const onMouseUp = () => handleDragEnd();
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) handleDragMove(e.touches[0].clientX);
    };
    const onTouchEnd = () => handleDragEnd();

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("touchmove", onTouchMove);
    window.addEventListener("touchend", onTouchEnd);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [handleDragMove, handleDragEnd]);

  // Click card to center it smoothly
  const handleCardClick = (relativeAngle: number) => {
    if (Math.abs(velocityRef.current) > 0.4) return;
    // Animate to center
    velocityRef.current = -relativeAngle * 0.12;
  };

  const handleScrollDown = () => {
    window.scrollBy({
      top: window.innerHeight * 0.9,
      behavior: "smooth",
    });
  };

  const totalSlots = ringItems.length;
  const angleStep = 360 / totalSlots;

  return (
    <div
      className={`relative w-full h-full overflow-hidden select-none flex flex-col items-center justify-between py-8 md:py-12 ${containerClassName}`}
      style={{ backgroundColor }}
      onMouseDown={(e) => handleDragStart(e.clientX)}
      onTouchStart={(e) => {
        if (e.touches.length > 0) handleDragStart(e.touches[0].clientX);
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 3D Cylindrical Stage */}
      <div
        className="relative w-full flex-1 flex items-center justify-center cursor-grab active:cursor-grabbing"
        style={{
          perspective: `${perspective}px`,
          perspectiveOrigin: "50% 50%",
        }}
      >
        <div
          className="relative flex items-center justify-center"
          style={{
            width: `${dimensions.cardWidth}px`,
            height: `${dimensions.cardHeight}px`,
            transformStyle: "preserve-3d",
          }}
        >
          {ringItems.map((item, index) => {
            // Calculate base angle around circle
            const baseAngle = index * angleStep;

            // Calculate current relative angle between -180 and 180
            let relativeAngle = (baseAngle + rotationY) % 360;
            if (relativeAngle > 180) relativeAngle -= 360;
            if (relativeAngle < -180) relativeAngle += 360;

            const absAngle = Math.abs(relativeAngle);

            // Only render cards within the visible front-facing concave arc (+/- 90 degrees)
            if (absAngle > 92) {
              return null;
            }

            // Trigonometry for concave inward-curving panorama
            const rad = (relativeAngle * Math.PI) / 180;
            const x = Math.sin(rad) * dimensions.radius;
            // z brings the cards forward as they move to the sides, creating the concave curved amphitheater effect
            const z = (1 - Math.cos(rad)) * dimensions.radius * 0.9;
            // Face points inward towards viewer
            const cardRotateY = -relativeAngle;

            // Smooth fade at the extreme peripheral edges
            const opacity =
              absAngle < 65 ? 1 : Math.max(0, 1 - (absAngle - 65) / 26);

            const zIndex = Math.round(100 - absAngle);

            return (
              <div
                key={`${item.image}-${index}`}
                onClick={() => handleCardClick(relativeAngle)}
                className="absolute top-0 left-0 overflow-hidden shadow-2xl transition-opacity duration-150 ease-out cursor-pointer group"
                style={{
                  width: `${dimensions.cardWidth}px`,
                  height: `${dimensions.cardHeight}px`,
                  transform: `translate3d(${x}px, 0px, ${z}px) rotateY(${cardRotateY}deg)`,
                  transformOrigin: "center center",
                  zIndex,
                  opacity,
                  backfaceVisibility: "hidden",
                  willChange: "transform, opacity",
                }}
              >
                {/* Image */}
                <div className="relative w-full h-full bg-neutral-900">
                  <Image
                    src={item.image}
                    alt={item.title || `Gallery artwork ${index + 1}`}
                    fill
                    sizes="(max-width: 768px) 300px, 450px"
                    priority={index < 4}
                    draggable={false}
                    className="pointer-events-none object-cover object-center group-hover:scale-103 transition-transform duration-700 ease-out"
                  />

                  {/* Dark gradient overlay for typography readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none" />

                  {/* Card Typography (Category + Title) matching screenshot */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 z-10 flex flex-col justify-end pointer-events-none">
                    {item.category && (
                      <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.24em] text-white/70 font-light drop-shadow-sm">
                        {item.category}
                      </span>
                    )}
                    {item.title && (
                      <h3 className="font-astoria text-xl sm:text-2xl md:text-[28px] text-white tracking-wide font-light mt-1 drop-shadow-md leading-tight">
                        {item.title}
                      </h3>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>


    </div>
  );
};

export default ThreeDImageRing;
