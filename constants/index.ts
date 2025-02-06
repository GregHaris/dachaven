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

export const heroSlides = [
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
