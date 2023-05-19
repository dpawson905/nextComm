'use client';

import Image from "next/image";
import { useCartStore } from "@/store";
import formatPrice from "@/utils/PriceFormat";

export default function Cart() {
  const cartStore = useCartStore();
  return (
    <div onClick={() => cartStore.toggleCart()} className="fixed w-full h-screen left-0 top-0 bg-black/25">
      <div onClick={(e) => e.stopPropagation()} className="bg-white absolute right-0 top-0 w-1/4 h-screen p-12 overflow-y-scroll text-gray-700">
        <h1>Here's your shopping 📃</h1>
        {cartStore.cart.map((item) => (
          <div className="flex py-4 gap-4">
            <Image className="rounded-md h-16 w-16" src={item.image} alt={item.name} width={80} height={80}/>
            <div>
              <h2>{item.name}</h2>
              <h2>Qty: {item.quantity}</h2>
              <p className="text-sm">{item.unit_amount ? formatPrice(item.unit_amount as number) : 9999}</p>
            </div>
          </div>
        ))}
        <button className="transition-all py-2 mt-4 bg-teal-700 w-full rounded-md text-white hover:bg-teal-800">Checkout</button>
      </div>
    </div>
  )
};
