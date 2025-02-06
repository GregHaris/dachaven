'use client';

import { desktopHeroSlides } from '@/constants';
import { Carousel } from './Carousel';

export default function HeroSection() {
  return <Carousel isMobile={false} slides={desktopHeroSlides}/>;
}
