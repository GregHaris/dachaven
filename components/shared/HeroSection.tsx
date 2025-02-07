'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import Image from 'next/image';

import { heroSlides } from '@/constants';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '@/css/heroSectionStyles.css';

export function HeroSection() {
  const images = heroSlides;

  return (
    <div>
      <Swiper
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        pagination={{
          type: 'bullets',
          clickable: true,
          bulletClass: 'swiper-pagination-bullet custom-bullet',
          bulletActiveClass:
            'swiper-pagination-bullet-active custom-bullet-active',
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        loop={true}
        modules={[Navigation, Pagination, Autoplay]}
        className="h-96 w-full rounded-lg cursor-pointer"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="flex h-full w-full items-center justify-center">
              <Image
                src={image.src}
                alt={image.alt}
                width={1000}
                height={1000}
                className="block h-full w-full object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
        <div className="swiper-button-next custom-swiper-button"></div>
        <div className="swiper-button-prev custom-swiper-button"></div>
      </Swiper>
    </div>
  );
}
