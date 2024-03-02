import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "petsoft -- pet daycare",
  description: "We provide care to your pet as you enjoy your vacation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} text-sm text-color-zinc-900 bg-[#E5E8EC] min-h-screen`}>{children}</body>
    </html>
  );
}
