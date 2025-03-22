import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import MainLayout from "@/components/layout/MainLayout";
import { ToastProvider } from '@/components/ui/ToastProvider';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "WealthPA - Your Financial Mentor & Assistant",
  description: "Connect with qualified personal financial assistants for personalized guidance.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToastProvider>
          <MainLayout>{children}</MainLayout>
        </ToastProvider>
      </body>
    </html>
  );
}
