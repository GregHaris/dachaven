'use client';

import { Carousel } from './Carousel';
import { desktopHeroSlides } from '@/constants';

export default function HeroSection() {
  return <Carousel isMobile={false} slides={desktopHeroSlides} />;
}
