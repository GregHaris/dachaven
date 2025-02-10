import { useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';

import { Button } from '../ui/button';
import { checkoutOrder } from '@/lib/actions/order.actions';
import { IProductListing } from '@/lib/database/models/productListing.model';

loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const Checkout = ({
  productListing,
  userId,
}: {
  productListing: IProductListing;
  userId: string;
}) => {
  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get('success')) {
      console.log('Order placed! You will receive an email confirmation.');
    }

    if (query.get('canceled')) {
      console.log(
        'Order canceled -- continue to shop around and checkout when you’re ready.'
      );
    }
  }, []);

  const onCheckout = async () => {
    const order = {
      productListingTitle: productListing.title,
      buyerId: userId,
      productListingId: productListing._id,
      price: productListing.price,
      quantity: productListing.quantity,
    };

    await checkoutOrder(order);
  };
  return (
    <form action={onCheckout}>
      <Button type="submit" role="link" size="lg" className="button sm:w-fit">
        {'Buy'}
      </Button>
    </form>
  );
};

export default Checkout;
