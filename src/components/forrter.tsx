import Link from "next/link";
import { GiEdgeCrack } from "react-icons/gi";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="text-sm text-neutral-500 dark:text-neutral-400">
      <div className="border-t border-neutral-200 py-6 text-sm dark:border-neutral-700">
        <div className="flex px-4  justify-between items-center">
          <div className="flex gap-2 items-center">
            <GiEdgeCrack className="h-5 w-6" /> Crackers
          </div>
          <p>&copy; {currentYear} crackers. All rights reserved.</p>
          <p>
            <Link href="https://www.ranjithm.in/">Created by ▲ Ranjith</Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
