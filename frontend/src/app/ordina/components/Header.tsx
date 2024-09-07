"use client";

import Link from "next/link";
import { FaUmbrella } from "react-icons/fa";

export default function Header() {
  return (
    <header className="bg-primary text-primary-foreground py-4 px-6">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="#" className="flex items-center gap-2" prefetch={false}>
          <FaUmbrella />
          <span className="text-lg font-semibold">Beach Bites</span>
        </Link>
        <nav className="flex items-center gap-4"></nav>
      </div>
    </header>
  );
}
