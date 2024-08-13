"use client";
import Link from "next/link";
import { FaUsers } from "react-icons/fa6";
import { GoPackage } from "react-icons/go";
import { GiEdgeCrack } from "react-icons/gi";
import { usePathname } from "next/navigation";
import { MdHome, MdShoppingCart } from "react-icons/md";
import { cn } from "../lib/utils";
import { buttonVariants } from "./ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

const SideBar = () => {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-10 w-14 flex-col border-r bg-background flex">
      <nav className="flex flex-col items-center gap-4 px-2 py-4">
        <Link
          href="/"
          className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
        >
          <GiEdgeCrack className="h-4 w-4 transition-all group-hover:scale-110" />
          <span className="sr-only">Acme Inc</span>
        </Link>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="/"
              className={cn(
                "text-muted-foreground transition-colors",
                buttonVariants({
                  variant: pathname === "/" ? "secondary" : "ghost",
                  size: "sm",
                })
              )}
            >
              <MdHome className="h-5 w-5" />
              <span className="sr-only">Dashboard</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Dashboard</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="/orders"
              className={cn(
                "text-muted-foreground transition-colors",
                buttonVariants({
                  variant: pathname === "/orders" ? "secondary" : "ghost",
                  size: "sm",
                })
              )}
            >
              <MdShoppingCart className="h-5 w-5" />
              <span className="sr-only">Orders</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Orders</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="/products"
              className={cn(
                "text-muted-foreground transition-colors",
                buttonVariants({
                  variant: pathname === "/products" ? "secondary" : "ghost",
                  size: "sm",
                })
              )}
            >
              <GoPackage className="h-5 w-5" />
              <span className="sr-only">Products</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Products</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="/customers"
              className={cn(
                "text-muted-foreground transition-colors",
                buttonVariants({
                  variant: pathname === "/customers" ? "secondary" : "ghost",
                  size: "sm",
                })
              )}
            >
              <FaUsers className="h-5 w-5" />
              <span className="sr-only">Customers</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Customers</TooltipContent>
        </Tooltip>
      </nav>
    </aside>
  );
};

export default SideBar;
