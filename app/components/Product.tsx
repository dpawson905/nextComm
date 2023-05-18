import Image from "next/image"
import formatPrice from "@/utils/PriceFormat"
import { ProductType } from "@/types/productType"

export default function Product({name, image, price}: ProductType) {
  return (
    <div>
      <Image src={image} alt={`Product ${name} image`} width={100} height={100}/>
      <h1>{name}</h1>
      {price !== null ? formatPrice(price): 'NA'}
    </div>
  )
}