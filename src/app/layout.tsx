import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { Provider } from "../utils/provider";
import Link from "next/link";
import { Button } from "@nextui-org/react";

const inter = Montserrat({
  preload: false,
  weight: ["100", "300", "400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "Anime Recommendation",
  description: "Powered by AI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} h-full`}>
        <header className="bg-[#333333] pt-2 pb-2 pl-4 pr-4 flex justify-between items-center">
          <div className="text-white font-bold text-xl">IAnime</div>
          <nav className="flex space-x-4">
            <Link className="text-white" href="#">
              Guideline
            </Link>
            <Link className="text-white" href="#">
              Faq
            </Link>
            <Link className="text-white" href="#">
              Contact Us
            </Link>
            <Link className="text-white" href="#">
              Discord
            </Link>
            <Link className="text-white" href="#">
              Twitter
            </Link>
          </nav>
          <Button className="bg-yellow-400 text-black">Join Us</Button>
        </header>
        <div className="bg-[#F2E9D0] p-2 text-dark">
          <div className="bg-white dark:bg-dark rounded-2xl shadow-xl">
            <Provider>{children}</Provider>
          </div>
        </div>
      </body>
    </html>
  );
}
