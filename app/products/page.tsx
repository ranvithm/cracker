import { buttonVariants } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";
import { cn } from "@/src/lib/utils";
import { getAllProducts } from "@/src/service/actions/product";
import Link from "next/link";
import { MdAdd, MdOutlineSearch } from "react-icons/md";

const Products = async () => {
  const products = await getAllProducts();

  return (
    <div className="flex flex-1 flex-col p-4 gap-4">
      <div className="w-full justify-end flex pb-2">
        <Link
          href="/products/add"
          className={cn(buttonVariants({ size: "sm" }), "h-7 gap-1")}
        >
          <MdAdd className="h-3.5 w-3.5" /> Add Product
        </Link>
      </div>
      <Card>
        <CardHeader className="flex justify-between flex-row ">
          <div className="flex flex-col gap-2">
            <CardTitle>Products</CardTitle>
            <CardDescription>
              Manage your products and view their sales performance.
            </CardDescription>
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
                <TableHead >Product name</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="w-[150px]">Updated Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">
                    {product.name}
                  </TableCell>
                  <TableCell  className="text-right">{product.price}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>
                    {product.updatedAt.toDateString()}
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

export default Products;
