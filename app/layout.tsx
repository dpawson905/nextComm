/** @format */

import './globals.css';
import Nav from './components/Nav';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import Hydrate from './components/Hydrate';
import { Quicksand, Lobster_Two } from 'next/font/google';

const quicksand = Quicksand({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
});

export const metadata = {
  title: 'NextComm',
  description:
    'I do not know what I am going to sell... Probably some bullshit.',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Fetch the user
  const session = await getServerSession(authOptions);
  return (
    <html lang='en'>
      <body className={`${quicksand.className}`}>
        <Hydrate>
          <div className='px-4'>
            <Nav user={session?.user} expires={session?.expires as string} />
            {children}
          </div>
        </Hydrate>
      </body>
    </html>
  );
}
