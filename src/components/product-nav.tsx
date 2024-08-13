import { Suspense } from "react";
import Search, { SearchSkeleton } from "./search";
import Model from "./modal";

const ProductNav = () => {
  return (
    <nav className=" flex items-center justify-end p-4 lg:px-6">
      <div className="hidden justify-center md:flex md:w-1/3">
        <Suspense fallback={<SearchSkeleton />}>
          <Search />
        </Suspense>
      </div>
      <div className="flex justify-end md:w-1/3">
        <Model />
      </div>
    </nav>
  );
};

export default ProductNav;
