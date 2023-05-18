const formatPrice = (amt: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amt / 100);
}

export default formatPrice;