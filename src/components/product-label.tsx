"use client";
import { FC } from "react";
import { Button } from "./ui/button";
import { MdAdd } from "react-icons/md";
import { useCartStore } from "../store/cart";

const ProductLabel: FC<{ product: any }> = ({ product }) => {
  const { cartsList, setCarts } = useCartStore();

  const onClick = () => {
    if (cartsList.find((cart) => cart.id === product.id)) {
      setCarts(
        [...cartsList].map((cart) => {
          if (cart.id === product.id) {
            return { ...cart, count: cart.count + 1 };
          }
          return cart;
        })
      );
    } else {
      setCarts([...cartsList, { ...product, count: 1 }]);
    }
  };
  return (
    <div className="absolute hidden group-hover:flex h-full w-full bg-black/75 flex-col items-center justify-center">
      <div className="flex gap-2 flex-col">
        <h3 className="mr-4 line-clamp-2 flex-grow pl-2 leading-none tracking-tight">
          {product.name} - {product.price}
        </h3>
        <Button onClick={onClick} size="sm">
          <MdAdd className="mr-1 h-4 w-4" /> Add To Cart
        </Button>
      </div>
    </div>
  );
};

export { ProductLabel };
