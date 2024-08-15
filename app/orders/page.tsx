import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { Input } from "@/src/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";
import { getAllOrders } from "@/src/service/actions/order";
import Link from "next/link";
import {  MdMoreVert, MdOutlineSearch } from "react-icons/md";

const Orders = async () => {
  const orders = await getAllOrders();

  return (
    <div className="flex flex-1 flex-col p-4 gap-4">
      <Card>
        <CardHeader className="flex justify-between flex-row ">
          <div className="flex flex-col gap-2">
            <CardTitle>Orders</CardTitle>
            <CardDescription>Orders history and their sales.</CardDescription>
          </div>
          <div className="relative">
            <MdOutlineSearch className="w-4 h-4 absolute  top-2.5 left-2" />
            <Input placeholder="Search" className="w-full pl-8" />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer name</TableHead>
                <TableHead className="text-right w-[200px]">
                  Phone Number
                </TableHead>
                <TableHead className="w-[150px]">City</TableHead>
                <TableHead className="text-right">Total amount Sales</TableHead>
                <TableHead>Products</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">
                    {order.Customer?.name}
                  </TableCell>
                  <TableCell className="text-right">
                    {order.Customer?.phone}
                  </TableCell>
                  <TableCell>{order.Customer?.city}</TableCell>
                  <TableCell className="text-right">{order.total}</TableCell>
                  <TableCell className="text-center">
                    {order.products.length}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MdMoreVert />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56">
                        <DropdownMenuGroup>
                          <DropdownMenuItem>
                            <Link href={`/orders/${order.id}`}>View Order</Link>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>View Invoice</DropdownMenuItem>
                        </DropdownMenuGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Orders;
