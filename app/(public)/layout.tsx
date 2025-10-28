import type { Metadata } from "next";
import { Geist, Geist_Mono, Montserrat, Plus_Jakarta_Sans, Inter } from "next/font/google";
import "../globals.css";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300","400","500","600","700","800"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plusjakarta",
  subsets: ["latin"],
  weight: ["500", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sehat Yar",
  description: "A medical plateform",
};

import { ReactNode, Suspense } from "react";
import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";


interface LayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <>
      <Header/>
      <Suspense>
        <main>{children}</main>
      </Suspense>
      <Footer />
    </>
  )
}
