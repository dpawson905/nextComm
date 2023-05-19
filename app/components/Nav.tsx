'use client';

import { Session } from 'next-auth'
import { signIn } from 'next-auth/react'
import Image from 'next/image';
import Link from 'next/link';
import Cart from './Cart';
import { useCartStore } from '@/store';
import { AiOutlineShoppingCart } from 'react-icons/ai';

export default function Nav({user}: Session){
  const cartStore = useCartStore();
  return (
    <nav className='flex justify-between items-center py-12'>
      <Link href={'/'}>
        <h1>Styled</h1>
      </Link>
      <ul className='flex items-center gap-12'>
        <li className='flex items-center text-3xl cursor-pointer relative text-teal-900'>
          <AiOutlineShoppingCart />
          <span className='bg-teal-700 text-white text-sm font-bold w-5 h-5 rounded-full absolute left-4 bottom-4 flex items-center justify-center m-0 p-0'>
            {cartStore.cart.length}
          </span>
        </li>
        {/* If the user is not signed in */}
        {!user && (
          <li className='transition-all bg-teal-600 text-white py-2 px-4 rounded-md hover:bg-teal-700'>
            <button className='' onClick={() => signIn()}>Sign In</button>
          </li>
        )}
        {user && (
          <>
            <li>
              <Image 
                className='rounded-full shadow-md' 
                src={user?.image as string} 
                alt={user.name as string} 
                width={36} 
                height={36}
              />
            </li>
          </>
          
        )}
      </ul>
      {cartStore.isOpen && <Cart />}
    </nav>
  )
}