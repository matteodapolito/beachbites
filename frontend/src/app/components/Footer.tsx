"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-muted text-muted-foreground py-4 px-6">
      <div className="container mx-auto flex items-center justify-between">
        <p className="text-sm">&copy; 2024 Beach Bites</p>
        <nav className="flex items-center gap-4">
          <Link
            href="#"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            Privacy
          </Link>
          <Link
            href="#"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            Terms
          </Link>
          <Link
            href="#"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            Contact
          </Link>
        </nav>
      </div>
    </footer>
  );
}
