'use client';

import { Carousel } from './Carousel';
import { mobileHeroSlides } from '@/constants';

export default function MobileHeroSection() {
  return <Carousel isMobile={true} slides={mobileHeroSlides} />;
}
