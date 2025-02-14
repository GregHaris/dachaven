export const headerLinks = [
  {
    label: 'Home',
    route: '/',
  },
  {
    label: 'Sell',
    route: '/productListings/create',
  },
  {
    label: 'Dashboard',
    route: '/dashboard',
  },
];

export const heroContent = [
  {
    title:
      'From Blockchain to AI, and Beyond.\nYour Passport to Tech Innovation.',
    cta: 'Explore Tech Products',
    backgroundImage: '/assets/images/hero1.png?height=800&width=1200',
  },
  {
    title:
      'Connect, Learn, and Grow.\nFind Your Tribe at the Next Tech ProductListings.',
    cta: 'Explore products',
    backgroundImage: '/assets/images/hero3.png?height=800&width=1200',
  },
  {
    title:
      'Navigate the Future of Tech.\nYour Gateway to the Best Tech Products.',
    cta: 'Discover Tech Products',
    backgroundImage: '/assets/images/hero4.png?height=800&width=1200',
  },
  {
    title: 'Participate or Learn from Anywhere.',
    cta: 'Explore Virtual Products',
    backgroundImage: '/assets/images/hero5.png?height=800&width=1200',
  },
];

export const productListingDefaultValues = {
  title: '',
  description: '',
  imageUrls: [],
  price: '',
  currency: 'NGN',
  categoryId: '',
  condition: 'New' as 'New',
  brand: '',
  productModel: '',
  deliveryOptions: 'Pickup',
  quantity: 0,
  location: '',
  isAvailable: false,
  isNegotiable: false,
  contactDetails: {
    phoneNumber: '',
    website: '',
    instagram: '',
    facebook: '',
    x: '',
  },
};

export const currencies = ['NGN', 'USD', 'EUR'];

export const productCondition = [
  'New',
  'Used - Like New',
  'Used - Good',
  'Used - fair',
];

export const deliveryOptions = ['Pickup', 'Home Delivery', 'Mail', 'Online'];
