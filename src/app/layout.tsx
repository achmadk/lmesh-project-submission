import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { ToastContainer } from "react-toastify/unstyled";

import "./globals.css";
import "react-toastify/ReactToastify.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Project Test LMesh - Achmad Kurnianto",
  description: "The submission of Project Test LMesh Recruitment",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable}`}>
      <body>
        {children}
        <ToastContainer autoClose={false} position="top-center" />
      </body>
    </html>
  );
}
