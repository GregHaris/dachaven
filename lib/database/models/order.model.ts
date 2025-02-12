import { Schema, model, models, Document } from 'mongoose';

export interface IOrder extends Document {
  createdAt: Date;
  stripeId: string;
  totalAmount: string;
  productListing: {
    _id: string;
    title: string;
  };
  buyer: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
}

export type IOrderItem = {
  _id: string;
  quantity: number;
  totalAmount: string;
  createdAt: Date;
  productListingTitle: string;
  productListingId: string;
  buyer: string;
  buyerEmail: string;
};

const OrderSchema = new Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  stripeId: {
    type: String,
    required: true,
    unique: true,
  },
  totalAmount: {
    type: String,
  },
  productListing: {
    type: Schema.Types.ObjectId,
    ref: 'ProductListing',
  },
  buyer: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

const Order = models.Order || model('Order', OrderSchema);

export default Order;
