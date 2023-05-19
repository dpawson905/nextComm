/** @format */

import Image from 'next/image';
import formatPrice from '@/utils/PriceFormat';
import { ProductType } from '@/types/productType';
import Link from 'next/link';

export default function Product({
  name,
  image,
  unit_amount,
  id,
  description,
  metadata,
}: ProductType) {
  const { features } = metadata;
  return (
    <Link
      href={{
        pathname: `/product/${id}`,
        query: { name, image, unit_amount, id, description, features },
      }}>
      <div className='text-gray-700'>
        <Image
          className='transition-all w-full h-96 object-cover object-center shadow-lg rounded-sm hover:shadow-md overflow-hidden duration-500 ease-in-out'
          src={image}
          alt={description as string}
          width={800}
          height={800}
        />
        <div className='font-medium py-2'>
          <h1 className='text-2xl tracking-wider'>{name}</h1>
          <h2 className='tracking-wide text-xl text-teal-700'>
            {unit_amount ? formatPrice(unit_amount as number) : 9999}
          </h2>
        </div>
      </div>
    </Link>
  );
}
