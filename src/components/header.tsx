import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { auth } from "../lib/auth";
import { Label } from "./ui/label";
import Link from "next/link";
import ToggleTheme from "./toggle-theme";

const Header = async () => {
  const { user } = (await auth()) || {};
  if (!user) {
    return null;
  }

  return (
    <header className="sticky top-0 z-30 flex items-center gap-4 border-b bg-background pb-4 px-4">
      <div className="flex-1"></div>
      <ToggleTheme />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar>
            <AvatarImage src={user.image as string} alt="user" />
            <AvatarFallback>{user.name?.[0]}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel className="flex gap-2 justify-center items-center">
            <Avatar>
              <AvatarImage src={user.image as string} alt="user" />
              <AvatarFallback>{user.name}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-1">
              <Label>{user.name}</Label>
              <Label>{user.email}</Label>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/api/auth/signout">Logout</Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};

export default Header;
