/** @format */

'use client';

import Image from 'next/image';
import { useCartStore } from '@/store';
import formatPrice from '@/utils/PriceFormat';
import { IoAddCircle, IoRemoveCircle } from 'react-icons/io5';
import basket from '../../public/basket.png';
import { motion, AnimatePresence } from 'framer-motion';
import Checkout from './Checkout';
import OrderConfirmed from './OrderConfirmed';

export default function Cart() {
  const cartStore = useCartStore();
  const totalPrice = cartStore.cart.reduce((acc, item) => {
    return acc + item.unit_amount! * item.quantity!;
  }, 0);
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      onClick={() => cartStore.toggleCart()}
      className='fixed w-full h-screen left-0 top-0 bg-black/25'>
      {/* CART */}
      <motion.div
        layout
        onClick={(e) => e.stopPropagation()}
        className='bg-white absolute right-0 top-0 w-fill lg:w-2/5 h-screen overflow-y-scroll text-gray-700'>
        <div className='flex justify-between items-center p-4'>
          {cartStore.onCheckout === 'cart' && (
            <>
              <h1>Here's your shopping 📃</h1>
              <button
                onClick={() => cartStore.toggleCart()}
                className='transition-all text-lg tracking-wide font-md px-4 py-2 text-white bg-teal-600 rounded-md shadow-md hover:shadow-sm hover:bg-teal-700'>
                Back to store
              </button>
            </>
          )}
          {cartStore.onCheckout === 'checkout' && (
            <button
              onClick={() => cartStore.setCheckout('cart')}
              className='transition-all text-lg tracking-wide font-md px-4 py-2 text-white bg-teal-600 rounded-md shadow-md hover:shadow-sm hover:bg-teal-700'>
              Back to cart
            </button>
          )}
        </div>
        {cartStore.onCheckout === 'cart' && (
          <>
            {cartStore.cart.map((item) => (
              <motion.div
                layout
                key={item.id}
                className='flex p-4 gap-4 tracking-wide'>
                <Image
                  className='rounded-md h-16 w-16'
                  src={item.image}
                  alt={item.name}
                  width={80}
                  height={80}
                />
                <motion.div layout className='tracking-wider'>
                  <h2>{item.name}</h2>
                  <div className='flex gap-2'>
                    <h2>Qty: {item.quantity}</h2>
                    <button
                      onClick={() =>
                        cartStore.removeProduct({
                          id: item.id,
                          image: item.image,
                          name: item.name,
                          unit_amount: item.unit_amount,
                          quantity: item.quantity,
                        })
                      }>
                      <IoRemoveCircle />
                    </button>
                    <button
                      onClick={() =>
                        cartStore.addProduct({
                          id: item.id,
                          image: item.image,
                          name: item.name,
                          unit_amount: item.unit_amount,
                          quantity: item.quantity,
                        })
                      }>
                      <IoAddCircle />
                    </button>
                  </div>
                  <p className='text-sm'>
                    {item.unit_amount
                      ? formatPrice(item.unit_amount as number)
                      : 9999}
                  </p>
                </motion.div>
              </motion.div>
            ))}

            {cartStore.cart.length > 0 && (
              <motion.div layout className='px-4 tracking-wider'>
                <p>Total: {totalPrice && formatPrice(totalPrice)}</p>
                <button
                  onClick={() => cartStore.setCheckout('checkout')}
                  className='tracking-wider transition-all py-2 mt-4 bg-teal-700 w-full rounded-md text-white hover:bg-teal-800'>
                  Checkout
                </button>
              </motion.div>
            )}
          </>
        )}
        {/* Checkout Form */}
        {cartStore.onCheckout === 'checkout' && <Checkout />}
        {cartStore.onCheckout === 'success' && <OrderConfirmed />}

        <AnimatePresence>
          {!cartStore.cart.length && cartStore.onCheckout === 'cart' && (
            <motion.div
              animate={{ scale: 1, rotateZ: 0, opacity: 0.75 }}
              initial={{ scale: 0.5, rotateZ: -10, opacity: 0 }}
              exit={{ scale: 0.5, rotateZ: -10, opacity: 0 }}
              className='h-screen flex flex-col justify-center items-center gap-6 text-2xl font-md opacity-75 tracking-wider mx-4'>
              <h1>Uhhh ohhhh... it's empty 😢</h1>
              <Image
                className='hue-rotate-90'
                src={basket}
                alt='empty-cart'
                width={200}
                height={200}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
