'use client'

import { motion } from 'framer-motion';
import Image from 'next/image';
import  success  from '@/public/baby-min.gif'
import { useCartStore } from '@/store';
import Link from 'next/link';
import { useEffect } from 'react';

export default function OrderConfirmed() {
  const cartStore = useCartStore();
  useEffect(() => {
    cartStore.setPaymentIntent('');
    cartStore.clearCart();
  }, [])
  return (
    <motion.div className='w-full h-screen flex flex-col justify-center items-center'
      initial={{scale: 0.5, opacity: 0}} 
      animate={{scale: 1, opacity: 1}}
    >
      <div className='font-bold text-lg text-gray-600 tracking-wide text-center'>
        <h1 className='pb-3'>Your order has been placed 🚀</h1>
        <h2>Check your email for the receipt.</h2>
        <Image className='py-8' src={success} alt="success" />
      </div>
      <div className='mt-5 flex gap-5 flex-wrap font-md'>
        <Link href={'/dashboard'}>
          <button className='font-md' onClick={() => {
          setTimeout(() => {
            cartStore.setCheckout('cart')
            cartStore.toggleCart()
          }, 500);
        }}>Check your order</button>
        </Link>
        <button className='font-md' onClick={() => {
          setTimeout(() => {
            cartStore.setCheckout('cart')
            cartStore.toggleCart()
          }, 500);
        }}>Go back to store</button>
      </div>
    </motion.div>
  )
};
