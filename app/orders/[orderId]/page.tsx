"use client";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Separator } from "@/src/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";
import { FC, useEffect, useRef, useState } from "react";
import { GiEdgeCrack } from "react-icons/gi";
import { useReactToPrint } from "react-to-print";

const ViewOrders: FC<{ params: any }> = ({ params }) => {
  const [order, setOrders] = useState<any>();
  const { orderId } = params;
  const contentToPrint = useRef(null);

  useEffect(() => {
    const getOrders = async () => {
      const response = await fetch(`/api/orders/${orderId}`);
      const data = await response.json();
      setOrders(data);
    };
    getOrders();
  }, [orderId]);

  const handlePrint = useReactToPrint({
    documentTitle: "Print This Document",
    content: () => contentToPrint.current,
  });

  const createdAt = new Date(order?.createdAt);
  const date = `${createdAt.getDate()} - ${createdAt.getMonth()} - ${createdAt.getFullYear()}`;

  return (
    <div>
      <Button onClick={handlePrint}>PRINT</Button>
      <div className="p-4" ref={contentToPrint}>
        <Card>
          <CardHeader className="flex items-center justify-between flex-row">
            <div className="flex gap-4 items-center">
              <GiEdgeCrack className="h-12 w-12 transition-all group-hover:scale-110" />
              <CardTitle>Crackers</CardTitle>
            </div>
            <div className="flex gap-2 flex-col items-center">
              <CardTitle>Invoice - #001</CardTitle>
              <p>Date: {date}</p>
            </div>
          </CardHeader>
          <Separator />
          <CardContent className="pt-4">
            <div className="flex flex-col gap-4">
              <div className="flex justify-between gap-4">
                <div className="flex flex-col gap-2">
                  <p className="uppercase">Bill To:</p>
                  <p> {order?.Customer.name}</p>
                  <p>{order?.Customer.address}</p>
                  <p> {order?.Customer.city}</p>
                  <p> {order?.Customer.state}</p>
                  <p>
                    {order?.Customer.country} - {order?.Customer.postalCode}
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="uppercase">Bill From:</p>
                  <p>Spark phyrotech</p>
                  <p>Maraneri, Sivakasi</p>
                  <p>
                    India - 626124
                  </p>
                  <p>87780 52808</p>
                  <p>96296 66013</p>
                </div>
              </div>
              <Separator />
              <div className="flex flex-col gap-2">
                <p>Products:</p>
                <div className="flex flex-col gap-2">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-blue-950">
                        <TableHead className="text-white">Item</TableHead>
                        <TableHead className="w-[150px] text-white">
                          Price
                        </TableHead>
                        <TableHead className="text-center w-[150px] text-white">
                          Quantity
                        </TableHead>
                        <TableHead className="text-right w-[150px] text-white">
                          Amount
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {order?.products.map((order: any) => (
                        <TableRow key={order.id}>
                          <TableCell className="font-medium">
                            {order.Product.name}
                          </TableCell>
                          <TableCell>{order.Product.price}</TableCell>
                          <TableCell className="text-center">
                            {order.quantity}
                          </TableCell>
                          <TableCell className="text-right">
                            {order.Product.price * order.quantity}
                          </TableCell>
                        </TableRow>
                      ))}
                      <TableRow>
                        <TableCell colSpan={3} className="text-right">
                          Total
                        </TableCell>
                        <TableCell className="text-right">
                          ₹ {order?.total}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>
              <Separator />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
export default ViewOrders;
