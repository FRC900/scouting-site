import type { Metadata } from "next";
import { Ubuntu } from "next/font/google";
import  "@/components/ui/globals.css";
import Header from "@/components/header/header";

export const metadata: Metadata = {
  title: "Scouting",
  description: "The Zebracorn's scouting system for First Robotics Competitions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className='${Ubuntu.className} bg-zinc-900 p-6 text-lg'>
        <div className="flex flex-col h-screen overflow-auto">
          <div className="w-full flex-none">
            <Header />
          </div>
          <div className="w-max mx-auto">{children}</div>
        </div>
      </body>
    </html>
  );
}

// bg-gradient-to-tl from-slate-950 to-slate-800