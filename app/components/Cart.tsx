/** @format */

'use client';

import Image from 'next/image';
import { useCartStore } from '@/store';
import formatPrice from '@/utils/PriceFormat';
import { IoAddCircle, IoRemoveCircle } from 'react-icons/io5';
import basket from '../../public/basket.png';

export default function Cart() {
  const cartStore = useCartStore();
  const totalPrice = cartStore.cart.reduce((acc, item) => {
    return acc + item.unit_amount! * item.quantity!;
  }, 0);
  return (
    <div
      onClick={() => cartStore.toggleCart()}
      className='fixed w-full h-screen left-0 top-0 bg-black/25'>
      <div
        onClick={(e) => e.stopPropagation()}
        className='bg-white absolute right-0 top-0 w-1/4 h-screen overflow-y-scroll text-gray-700'>
        {cartStore.cart.length > 0 && (
          <h1 className='text-center p-4'>Here's your shopping 📃</h1>
        )}
        {cartStore.cart.map((item) => (
          <div key={item.id} className='flex p-4 gap-4 tracking-wide'>
            <Image
              className='rounded-md h-16 w-16'
              src={item.image}
              alt={item.name}
              width={80}
              height={80}
              
            />
            <div className='tracking-wider'>
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
            </div>
          </div>
        ))}
        
        {cartStore.cart.length > 0 && (
          <div className="px-4 tracking-wider">
            <p>Total: {totalPrice && formatPrice(totalPrice)}</p>
            <button className='tracking-wider transition-all py-2 mt-4 bg-teal-700 w-full rounded-md text-white hover:bg-teal-800'>
              Checkout
            </button>
          </div>
          
        )}
        {!cartStore.cart.length && (
          <div className='h-screen flex flex-col justify-center items-center gap-6 text-2xl font-medium opacity-75 tracking-wider'>
            <h1>Uhhh ohhhh... it's empty 😢</h1>
            <Image className='hue-rotate-90' src={basket} alt='empty-cart' width={200} height={200} />
          </div>
        )}
      </div>
    </div>
  );
}
