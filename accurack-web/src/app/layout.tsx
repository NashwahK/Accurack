import type { Metadata } from "next"; 
import { Darker_Grotesque } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const darkerGrotesque = Darker_Grotesque({
  variable: "--font-darker-grotesque",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "Accurack",
  description: "Powered by Next.js and TailwindCSS - by Nashwah Mohammad",
  icons: {
    icon: "/Accurack Logo.svg"
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${darkerGrotesque.variable} antialiased bg-gray-50 dark:bg-zinc-800`}
      >
        <Navbar />  
        <main className="">
          {children}
        </main>
      </body>
    </html>
  );
}
