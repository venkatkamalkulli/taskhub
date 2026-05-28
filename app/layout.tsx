import "./globals.css";

import type {
  Metadata,
} from "next";

import {
  Inter,
} from "next/font/google";

import {
  Toaster,
} from "react-hot-toast";

import {
  ThemeProvider,
} from "@/components/ThemeProvider";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {

  title: "TaskHub",

  description:
    "Modern AI Task Management Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (

    <html
      lang="en"
      suppressHydrationWarning
    >

      <body
        className={inter.className}
      >

        <ThemeProvider>

          <Toaster position="top-right" />

          {children}

        </ThemeProvider>

      </body>

    </html>
  );
}