"use client";

import Link from "next/link";
import { FaUmbrellaBeach } from "react-icons/fa";
import { ModeToggle } from "./ModeToggle";

export default function Header() {
  return (
    <header className="bg-primary text-primary-foreground py-4 px-6">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="#" className="flex items-center gap-2" prefetch={false}>
          <FaUmbrellaBeach className="w-8 h-8" />
          <span className="text-lg font-semibold">Beach Bites</span>
        </Link>
        <nav className="flex items-center gap-4">
          <Link
            href="/dashboard"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            Amministrazione
          </Link>
          <ModeToggle />
        </nav>
      </div>
    </header>
  );
}
