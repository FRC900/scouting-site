import type { Metadata } from "next";
import { Ubuntu } from "next/font/google";
import  "@/components/ui/globals.css";
import TopNav from "../components/topnav";

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
      <body className='${Ubuntu.className} bg-zinc-900'>
        <div className="flex h-screen flex-row overflow-auto">
          {/* <div className="w-full flex-none">
            <TopNav />
          </div> */}
          <div className="p-12 w-max mx-auto text-lg">{children}</div>
        </div>
      </body>
    </html>
  );
}

// bg-gradient-to-tl from-slate-950 to-slate-800