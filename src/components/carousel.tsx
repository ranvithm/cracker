import Image from "next/image";
import { getAllProducts } from "../service/actions/product";
import { Label } from "./ui/label";
import { ProductLabel } from "./product-label";

const Carousel = async () => {
  const products = await getAllProducts();

  if (!products?.length) return null;

  const carouselProducts = [...products, ...products, ...products];

  return (
    <div className="w-full overflow-x-auto p-2">
      <ul className="flex animate-carousel gap-4">
        {carouselProducts.map((product, i) => (
          <li
            key={`${product.id}`}
            className="relative aspect-square flex h-44 p-2 justify-center w-72 flex-none"
          >
            <div className="relative p-2">
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
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Carousel;
