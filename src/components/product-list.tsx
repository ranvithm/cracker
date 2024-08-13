import Image from "next/image";
import { getAllProducts } from "../service/actions/product";
import { ProductLabel } from "./product-label";

const ProductList = async () => {
  const products = await getAllProducts();
  return (
    <div className="flex flex-1 flex-wrap gap-8 p-8 justify-center items-center">
      {products.map((product) => (
        <div key={`${product.id}`} className="relative p-2">
          <div className="group flex h-full w-full items-center justify-center overflow-hidden rounded-lg border bg-white hover:border-blue-600 dark:bg-black relative">
            {Array.isArray(product.images) && product.images.length > 0 ? (
              <Image
                alt={product.name}
                className="relative rounded-xl transition duration-300 ease-in-out group-hover:scale-105"
                width={350}
                height={250}
                src={product.images[0] as string}
              />
            ) : null}
            <ProductLabel product={product} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
