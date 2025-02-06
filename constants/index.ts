export const headerLinks = [
  {
    label: 'Home',
    route: '/',
  },
  {
    label: 'Create Event',
    route: '/events/create',
  },
  {
    label: 'Dashboard',
    route: '/dashboard',
  },
];

export const desktopHeroSlides = [
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

export const mobileHeroSlides = [
  {
    image: '/assets/images/mobHero.png',
  },
  {
    image: '/assets/images/4.png',
  },
  {
    image: '/assets/images/5.png',
  },
  {
    image: '/assets/images/7.png',
  },
  {
    image: '/assets/images/8.png',
  },
  {
    image: '/assets/images/9.png',
  },
  {
    image: '/assets/images/10.png',
  },
];

export const eventDefaultValues = {
  title: '',
  description: '',
  location: '',
  imageUrl: '',
  startDateTime: new Date(),
  endDateTime: new Date(),
  categoryId: '',
  price: '',
  isFree: false,
  url: '',
};
