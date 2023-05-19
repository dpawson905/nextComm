/** @format */

import Image from 'next/image';
import { SearchParamTypes } from '@/types/searchParamTypes';
import formatPrice from '@/utils/PriceFormat';

export default function Product({ searchParams }: SearchParamTypes) {
  return (
    <div className='flex justify-between gap-24 p-12 text-gray-700'>
      <Image
        className='shadow-lg rounded-sm'
        src={searchParams.image}
        alt={`Product ${searchParams.name} image`}
        width={600}
        height={600}
      />
      <div className='font-medium text-gray-700'>
        <h1 className='text-2xl py-2'>{searchParams.name}</h1>
        <p className='py-2'>{searchParams.description}</p>
        {searchParams.features && (
          <p className='py-2'>{searchParams.features}</p>
        )}
        <div className='flex gap-2'>
          <p className='font-bold text-teal-700'>
            {searchParams.unit_amount
              ? formatPrice(searchParams.unit_amount as number)
              : 9999}
          </p>
        </div>
        <button className='my-8 text-white py-2 px-6 bg-teal-700 rounded-md'>
          Add to card
        </button>
      </div>
    </div>
  );
}
