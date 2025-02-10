"use client";

import React, { useState, useEffect } from "react";
import Image, { StaticImageData } from "next/image";
// import arrow left from lucid
// import arrow right from lucid
import { ChevronLeft, ChevronRight } from "lucide-react";
import clsx from "clsx";

interface CarouselProps {
  images: StaticImageData[];
  autoSlide?: boolean;
  autoSlideInterval?: number;
}

const Carousel = ({
  images,
  autoSlide = true,
  autoSlideInterval = 3000,
}: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (autoSlide) {
      const slideInterval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, autoSlideInterval);
      return () => clearInterval(slideInterval);
    }
  }, [autoSlide, autoSlideInterval, images.length]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length,
    );
  };

  return (
    <div className="relative mx-auto w-full max-w-3xl">
      <div className="relative h-64 overflow-hidden">
        {images.map((image: StaticImageData, index: number) => (
          <div
            key={index}
            className={clsx(
              "absolute inset-0 transform rounded-2xl transition-transform",
              index === currentIndex ? "translate-x-0" : "translate-x-full",
            )}
          >
            <Image
              src={image}
              alt={`Slide ${index}`}
              className="h-full w-full rounded-2xl object-cover"
            />
          </div>
        ))}
      </div>
      <button
        className={clsx(
          "bg-foreground absolute top-1/2 left-0 -translate-y-1/2 transform cursor-pointer p-2 text-white",
        )}
        onClick={prevSlide}
      >
        <ChevronLeft />
      </button>
      <button
        className={clsx(
          "bg-foreground absolute top-1/2 right-0 -translate-y-1/2 transform cursor-pointer p-2 text-white",
        )}
        onClick={nextSlide}
      >
        <ChevronRight />
      </button>
      {/* <div className="absolute bottom-0 left-0 right-0 flex justify-center mb-4">
        {images.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full mx-1 ${
              index === currentIndex ? "bg-gray-800" : "bg-gray-400"
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div> */}
    </div>
  );
};

export default Carousel;
