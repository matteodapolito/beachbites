import Footer from "@/app/components/Footer";
import type { Metadata } from "next";
import { cn } from "@/lib/utils";
import "./globals.css";
import { ThemeProvider } from "@/app/components/ThemeProvider";

export const metadata: Metadata = {
  title: "Beach Concierge",
  description: "Prenota comodamente il tuo aperitivo!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html lang="it" suppressHydrationWarning>
        <head />
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Footer />
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}
