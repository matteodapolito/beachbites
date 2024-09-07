"use client";
import Image from "next/image";
import Link from "next/link";
import { Home, PanelLeft, Settings, ShoppingCart } from "lucide-react";
import { CiBoxList } from "react-icons/ci";
import { FaShippingFast, FaUmbrellaBeach } from "react-icons/fa";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";

import useSWR from "swr";
import { fetcher } from "@/app/fetcher";
import { useRouter } from "next/navigation";
import { AuthActions } from "@/app/auth/utils";
import CommonBreadcrumbs from "../components/CommonBreadcumbs";
import { ModeToggle } from "../components/ModeToggle";
import { Toaster } from "@/components/ui/sonner";
import { NavbarClient } from "../components/NavbarClient";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const { data: user } = useSWR("/auth/users/me", fetcher);
  const { logout, removeTokens } = AuthActions();

  const handleLogout = () => {
    logout()
      .res(() => {
        removeTokens();

        router.push("/");
      })
      .catch(() => {
        removeTokens();
        router.push("/");
      });
  };

  const goToPage = (e: React.MouseEvent, page: string) => {
    e.preventDefault();
    router.push(page);
  };

  return (
    <TooltipProvider>
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
          <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="#"
                  onClick={(e) => goToPage(e, "/dashboard")}
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <Home className="h-5 w-5" />
                  <span className="sr-only">Dashboard</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Dashboard</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="#"
                  onClick={(e) => goToPage(e, "/dashboard/ordini")}
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <FaShippingFast className="h-5 w-5" />
                  <span className="sr-only">Ordini</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Ordini</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="#"
                  onClick={(e) => goToPage(e, "/dashboard/prodotti")}
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <CiBoxList className="h-5 w-5" />
                  <span className="sr-only">Prodotti</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Prodotti</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="#"
                  onClick={(e) => goToPage(e, "/dashboard/settings")}
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <Settings className="h-5 w-5" />
                  <span className="sr-only">Impostazioni</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Impostazioni</TooltipContent>
            </Tooltip>
          </nav>
        </aside>
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          {/* <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6"> */}
          <header className="sticky top-0 z-30 items-center gap-4 border-b bg-background sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 p-2">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-3 items-center">
                <a
                  rel="noreferrer noopener"
                  href="/"
                  className="ml-2 font-bold text-xl flex"
                >
                  <FaUmbrellaBeach className="h-8 w-8  mr-3" />
                  Beach Bites
                </a>
                <CommonBreadcrumbs />
              </div>
              <div className="flex items-center gap-3">
                <ModeToggle />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="overflow-hidden rounded-full"
                    >
                      <Image
                        src="/avatar.jpg"
                        width={36}
                        height={36}
                        alt="Avatar"
                        className="overflow-hidden rounded-full"
                      />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>
                      {user?.first_name} {user?.last_name}{" "}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Impostazioni</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <Sheet>
                  <SheetTrigger asChild>
                    <Button size="icon" variant="outline" className="sm:hidden">
                      <PanelLeft className="h-5 w-5" />
                      <span className="sr-only">Apri Menu</span>
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="sm:max-w-xs">
                    <nav className="grid gap-6 text-lg font-medium">
                      <Link
                        href="#"
                        onClick={(e) => goToPage(e, "/dashboard")}
                        className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                      >
                        <Home className="h-5 w-5" />
                        Dashboard
                      </Link>
                      <Link
                        href="#"
                        onClick={(e) => goToPage(e, "/dashboard/ordini")}
                        className="flex items-center gap-4 px-2.5 text-foreground"
                      >
                        <FaShippingFast className="h-5 w-5" />
                        Ordini
                      </Link>
                      <Link
                        href="#"
                        onClick={(e) => goToPage(e, "/dashboard/prodotti")}
                        className="flex items-center gap-4 px-2.5 text-foreground"
                      >
                        <CiBoxList className="h-5 w-5" />
                        Prodotti
                      </Link>

                      <Link
                        href="#"
                        onClick={(e) => goToPage(e, "/dashboard/settings")}
                        className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                      >
                        <Settings className="h-5 w-5" />
                        Impostazioni
                      </Link>
                    </nav>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </header>
          {children}
        </div>
      </div>
      <Toaster />
    </TooltipProvider>
  );
}
