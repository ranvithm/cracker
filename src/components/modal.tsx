"use client";
import { MdAdd, MdClose, MdShoppingCart } from "react-icons/md";
import _ from "lodash";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Badge } from "./ui/badge";
import { Button, buttonVariants } from "./ui/button";
import { useCartStore } from "../store/cart";
import Image from "next/image";
import { FaMinus } from "react-icons/fa6";
import Link from "next/link";
import { cn } from "../lib/utils";

const Model = () => {
  const { cartsList, setCarts } = useCartStore();

  const onChangeVal = (id: string, value: number) => {
    const _value = isNaN(value) ? 1 : value < 1 ? 1 : value;
    const newCarts = _.map(cartsList, (cart) =>
      cart.id === id ? { ...cart, count: _value } : cart
    );
    setCarts(newCarts);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="relative flex h-11 w-11 items-center justify-center rounded-md border border-neutral-200 text-black transition-colors dark:border-neutral-700 dark:text-white">
          <MdShoppingCart className="h-4 transition-all ease-in-out hover:scale-110" />
          {cartsList.length > 0 && (
            <Badge className="absolute right-0 top-0 -mr-2 -mt-2 flex justify-center h-4 w-4 rounded">
              {cartsList.length}
            </Badge>
          )}
        </div>
      </SheetTrigger>
      <SheetContent className="h-full flex flex-col justify-between">
        <SheetHeader>
          <SheetTitle>My Cart</SheetTitle>
        </SheetHeader>
        <div className="flex flex-1 overflow-auto">
          <ul className="flex-grow overflow-auto py-4">
            {cartsList.map((cart) => (
              <li key={cart.id} className="flex w-full flex-col border-b ">
                <div className="relative flex w-full flex-row justify-between px-1 py-4">
                  <Button
                    className="absolute z-40 h-6 w-6 shadow rounded-full bg-primary/60 hover:bg-primary -ml-1 -mt-2"
                    size="icon"
                    onClick={() => {
                      setCarts(_.filter(cartsList, (c) => c.id !== cart.id));
                    }}
                  >
                    <MdClose />
                  </Button>
                  <div className="flex w-full gap-4 ">
                    <div className="relative h-16 w-16 overflow-hidden rounded-md border bg-black/75">
                      <Image
                        className="h-full w-full object-cover"
                        width={64}
                        height={52}
                        alt={cart.name}
                        src={cart.images[0] as string}
                      />
                    </div>
                    <div className="flex w-[calc(100%_-_6rem)]">
                      <div className="flex justify-between gap-2 flex-col w-full">
                        <div className="flex justify-between flex-1 gap-4 text-base">
                          <span className="leading-tight">{cart.name}</span>
                          <span className="leading-tight">
                            ₹ {cart.price * cart.count}
                          </span>
                        </div>
                        <div className="flex items-center flex-1 justify-center">
                          <div className="flex gap-0 w-full p-2 border rounded-lg">
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-6 w-6"
                              onClick={() => {
                                onChangeVal(cart.id, cart.count - 1);
                              }}
                            >
                              <FaMinus />
                            </Button>
                            <input
                              value={cart.count}
                              onChange={(e) => {
                                onChangeVal(cart.id, parseInt(e.target.value));
                              }}
                              className="appearance-none pl-2 w-[calc(100%_-_3rem)] outline-none border-none bg-transparent"
                            />
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-6 w-6"
                              onClick={() => {
                                onChangeVal(cart.id, cart.count + 1);
                              }}
                            >
                              <MdAdd />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Link href="/orders/new" className={cn(buttonVariants())}>
              Proceed to Checkout
            </Link>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default Model;
