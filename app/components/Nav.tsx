'use client';

import { Session } from 'next-auth'
import { signIn } from 'next-auth/react'
import Image from 'next/image';

export default function Nav({user}: Session){
  return (
    <nav className='flex justify-between items-center py-8'>
      <h1>Styled</h1>
      <ul className='flex items-center gap-12'>
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
                width={48} 
                height={48}
              />
            </li>
          </>
          
        )}
      </ul>
    </nav>
  )
}