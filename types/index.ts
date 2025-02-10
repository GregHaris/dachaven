// ====== USER PARAMS
export type CreateUserParams = {
  clerkId: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  image: string;
};

export type UpdateUserParams = {
  firstName: string;
  lastName: string;
  username: string;
  image: string;
};

// ====== PRODUCT LISTING PARAMS
export type CreateProductListingParams = {
  userId: string;
  productListing: {
    title: string;
    description: string;
    imageUrl: string;
    price: string;
    currency: string;
    categoryId: string;
    condition: string;
    brand?: string;
    productModel?: string;
    deliveryOptions: string;
    quantity: number;
    location: string;
    isAvailable: boolean;
    isNegotiable: boolean;
  };
  path: string;
};

export type UpdateProductListingParams = {
  userId: string;
  productListing: {
    _id: string;
    title: string;
    description: string;
    imageUrl: string;
    price: string;
    currency: string;
    categoryId: string;
    condition: string;
    brand?: string;
    productModel?: string;
    deliveryOptions: string;
    quantity: number;
    location: string;
    isAvailable: boolean;
    isNegotiable: boolean;
  };
  path: string;
};

export type DeleteProductListingParams = {
  productListingId: string;
  path: string;
};

export type GetAllProductListingsParams = {
  query: string;
  category: string;
  limit: number;
  page: number;
  location: string;
};

export type GetProductListingsByUserParams = {
  userId: string;
  limit?: number;
  page: number;
};

export type GetRelatedProductListingsByUserParams = {
  categoryId: string;
  productListingId: string;
  limit?: number;
  page: number | string;
};

export type ProductListing = {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  price: string;
  currency: string;
  condition: string;
  brand?: string;
  productModel?: string;
  deliveryOptions: string;
  quantity: number;
  location: string;
  isAvailable: boolean;
  isNegotiable: boolean;
  seller: {
    _id: string;
    firstName: string;
    lastName: string;
  };
  category: {
    _id: string;
    name: string;
  };
  createdAt: Date;
  updatedAt: Date;
};

// ====== CATEGORY PARAMS
export type CreateCategoryParams = {
  categoryName: string;
};

// ====== ORDER PARAMS
export type CheckoutOrderParams = {
  productListingTitle: string;
  productListingId: string;
  price: string;
  quantity: number;
  buyerId: string;
};

export type CreateOrderParams = {
  stripeId: string;
  productListingId: string;
  buyerId: string;
  quantity: string;
  totalAmount: string;
  createdAt: Date;
};

export type GetOrdersByProductListingsParams = {
  productListingId: string;
  searchString: string;
};

export type GetOrdersByUserParams = {
  userId: string | null;
  limit?: number;
  page: string | number | null;
};

// ====== URL QUERY PARAMS
export type UrlQueryParams = {
  params: string;
  key: string;
  value: string | null;
};

export type RemoveUrlQueryParams = {
  params: string;
  keysToRemove: string[];
};

export type SearchParamProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};
