'use client';

import {useState, useEffect} from 'react';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useCartStore } from '@/store';
import formatPrice from '@/utils/PriceFormat';


export default function CheckoutForm({ clientSecret }: {clientSecret: string}) {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const cartStore = useCartStore();
  const totalPrice = cartStore.cart.reduce((acc, item) => {
    return acc + item.unit_amount! * item.quantity!;
  }, 0);
  const formattedPrice = formatPrice(totalPrice);

  useEffect(() => {
    if (!stripe) return;
    if (!clientSecret) return;
  }, [stripe]);

  const handleSubmit = async (e:React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setIsLoading(true);
    stripe.confirmPayment({
      elements,
      redirect: 'if_required'
    }).then((result) => {
      if (!result.error) {
        cartStore.setCheckout('success');
      }
      setIsLoading(false);
    })
  }

  return (
    <form onSubmit={handleSubmit} id='payment-form'>
      <PaymentElement id='payment-element' options={{layout: 'tabs'}} />
      <h1 className='text-sm py-4 tracking-wider font-bold text-gray-600'>Total: {formattedPrice}</h1>
      <button className={`transition-all font-md text-lg tracking-wide py-2 mt-4 w-full bg-teal-600 rounded-md text-white shadow-md hover:shadow-sm hover:bg-teal-700 disabled:opacity-25`} id="submit" disabled={isLoading || !stripe || !elements}>
        <span id="button-text">
          {isLoading ? <span>Processing...</span>: <span>Pay Now</span>}
        </span>
      </button>
    </form>
  )
};
