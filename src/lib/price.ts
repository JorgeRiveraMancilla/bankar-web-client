export const formatPrice = (price: number): string => {
  return price.toLocaleString("es-CL", {
    style: "currency",
    currency: "CLP",
  });
};
