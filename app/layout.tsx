import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ReMem - Cognitive Restoration Engine",
  description: "Remember where your mind left off. Restore context and reconstruct your cognitive state for seamless development.",
  keywords: ["cognitive restoration", "context recovery", "developer tools", "AI assistant"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col items-center w-full bg-[#FFFFFF] text-[#1A1A1A] overflow-x-hidden text-center">
        {children}
      </body>
    </html>
  );
}
