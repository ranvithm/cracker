"use client";
import { Button, buttonVariants } from "@/src/components/ui/button";
import { Card } from "@/src/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { cn } from "@/src/lib/utils";
import { useCartStore } from "@/src/store/cart";
import _ from "lodash";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const NewOrders = () => {
  const router = useRouter();
  const [customers, setCustomers] = useState<any[]>([]);
  const [customer, setCustomer] = useState<string>("");
  const { cartsList, setCarts } = useCartStore();
  const { data } = useSession();

  useEffect(() => {
    const getCustomers = async () => {
      const response = await fetch("/api/customers");
      const data = await response.json();
      setCustomers(data);
    };
    getCustomers();
  }, []);

  const onSubmitOrder = async () => {
    if (!customer || cartsList.length === 0 || !data?.user?.email) return;
    const _data = {
      userId: data?.user?.email,
      customerId: customer,
      total: _.sumBy(cartsList, (cart) => cart.price * cart.count),
    };

    const response = await fetch("/api/orders", {
      method: "POST",
      body: JSON.stringify(_data),
    });
    const _res = await response.json();
    _.forEach(cartsList, (cart) => {
      fetch("/api/orderAndProduct", {
        method: "POST",
        body: JSON.stringify({
          orderId: _res.id,
          productId: cart.id,
          quantity: cart.count,
        }),
      });
    });
    setCarts([]);
    router.push("/orders");
  };

  return (
    <div className="flex flex-1 flex-col justify-between items-center p-4 w-full">
      <div className="flex w-80 flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Select onValueChange={(val) => setCustomer(val)}>
            <SelectTrigger className="w-[220px]">
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Customers</SelectLabel>
                {_.map(customers, (customer) => (
                  <SelectItem key={customer.id} value={customer.id}>
                    {customer.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <Card className="flex flex-1 overflow-auto p-4">
          <ul className="flex-grow overflow-auto py-4">
            {cartsList.map((cart) => (
              <li key={cart.id} className="flex w-full flex-col border-b ">
                <div className="relative flex w-full flex-row justify-between px-1 py-4">
                  <Button
                    className="absolute z-40 h-6 w-6 text-[0.5rem] shadow rounded-full -ml-1 -mt-2"
                    size="icon"
                  >
                    {cart.count}
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
                      <div className="flex flex-col w-full">
                        <div className="flex justify-between gap-4 text-base">
                          <span className="leading-tight">{cart.name}</span>
                          <span className="leading-tight">
                            ₹ {cart.price * cart.count}
                          </span>
                        </div>
                        <div className="">
                          <span className="text-sm text-gray-400">
                            ₹ {cart.price}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </div>
      <div className="flex justify-end w-3/4 gap-4">
        <Link
          href="/orders"
          className={cn(buttonVariants({ variant: "ghost" }))}
        >
          Cancel
        </Link>
        <Button onClick={onSubmitOrder}>Order</Button>
      </div>
    </div>
  );
};

export default NewOrders;
