'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@ui/button';

const heroSlides = [
  {
    image: '/assets/images/hero3.png',
  },
  {
    image: '/assets/images/hero.png',
  },
  {
    image: '/assets/images/hero2.png',
  },
  {
    image: '/assets/images/hero1.png',
  },
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentSlide(
      (prev) => (prev - 1 + heroSlides.length) % heroSlides.length
    );
  };

  const currentHero = heroSlides[currentSlide];

  return (
    <div className="relative h-[30vh] w-full rounded-xl overflow-hidden border-2">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentSlide}
          custom={direction}
          initial={{ x: direction > 0 ? 1000 : -1000, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: direction < 0 ? 1000 : -1000, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <Image
            src={currentHero.image}
            alt={`Slide ${currentSlide + 1}`}
            fill
            className="object-cover"
          />
        </motion.div>
      </AnimatePresence>
      <CarouselNavigation onPrev={prevSlide} onNext={nextSlide} />

      <Button
        size={'lg'}
        className="button w-full sm:w-fit absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <Link href="#events">Explore Events</Link>
      </Button>

      <div className="absolute bottom-4 w-full flex justify-center">
        <CarouselDots total={heroSlides.length} current={currentSlide} />
      </div>
    </div>
  );
}

function CarouselNavigation({
  onPrev,
  onNext,
}: {
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <>
      <button
        onClick={onPrev}
        className="absolute left-5 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-4 shadow-lg hover:scale-105 transition-transform cursor-pointer"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={onNext}
        className="absolute right-5 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-4 shadow-lg hover:scale-105 transition-transform cursor-pointer"
      >
        <ChevronRight className="h-6 w-6" />
      </button>
    </>
  );
}

function CarouselDots({ total, current }: { total: number; current: number }) {
  return (
    <div className="flex justify-center gap-3 mt-8">
      {[...Array(total)].map((_, i) => (
        <div
          key={i}
          className={`h-2.5 w-2.5 rounded-full ${
            i === current ? 'bg-primary-500' : 'bg-primary-500/30'
          }`}
        />
      ))}
    </div>
  );
}
