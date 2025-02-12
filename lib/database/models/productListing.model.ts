import { Document, Schema, model, models } from 'mongoose';

export interface IProductListing extends Document {
  _id: string;
  title: string;
  description?: string;
  imageUrls: string[];
  price: string;
  currency: string;
  category: { _id: string; name: string };
  seller: { _id: string; firstName: string; lastName: string };
  createdAt: Date;
  updatedAt: Date;
  condition: string;
  brand?: string;
  productModel?: string;
  deliveryOptions: string;
  quantity: number;
  location: string;
  isAvailable: boolean;
  isNegotiable: boolean;
  contactDetails: {
    phoneNumber: string;
    website?: string;
    instagram?: string;
    facebook?: string;
    x?: string;
  };
}

const ProductListingSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    imageUrls: { type: [String], required: true },
    price: { type: String, required: true, default: '0' },
    currency: { type: String, required: true, default: 'NGN' },
    category: { type: Schema.Types.ObjectId, ref: 'Category'},
    seller: { type: Schema.Types.ObjectId, ref: 'User'},
    condition: { type: String, required: true },
    brand: { type: String },
    productModel: { type: String },
    deliveryOptions: { type: String, required: true },
    quantity: { type: Number, required: true, default: 0 },
    location: { type: String, required: true },
    isAvailable: { type: Boolean, default: false },
    isNegotiable: { type: Boolean, default: false },
    contactDetails: {
      phoneNumber: { type: String, required: true },
      website: { type: String },
      instagram: { type: String },
      facebook: { type: String },
      x: { type: String },
    },
  },
  { timestamps: true }
);

const ProductListing =
  models.ProductListing ||
  model<IProductListing>('ProductListing', ProductListingSchema);

export default ProductListing;
