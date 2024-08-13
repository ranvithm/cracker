import Link from "next/link";
import { cn } from "@/src/lib/utils";
import Carousel from "@/src/components/carousel";
import ProductList from "@/src/components/product-list";
import { buttonVariants } from "@/src/components/ui/button";
import { getAllProducts } from "@/src/service/actions/product";
import ProductNav from "@/src/components/product-nav";

const Home = async () => {
  const products = await getAllProducts();
  return products.length > 3 ? (
    <main className="flex flex-1 flex-col">
      <ProductNav />
      <ProductList />
      <Carousel />
    </main>
  ) : (
    <main className="flex flex-1 justify-center flex-col items-center">
      <h1 className="text-4xl font-bold">No products found</h1>
      <Link
        href="/products"
        className={cn(buttonVariants({ variant: "link" }))}
      >
        Go to products
      </Link>
    </main>
  );
};

export default Home;
