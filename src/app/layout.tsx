import type { Metadata } from "next";
// @ts-ignore: side-effect import of global CSS without type declarations
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProviders";
import { Poppins } from "next/font/google";
import { Toaster } from "react-hot-toast";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "700"], // sesuaikan kebutuhan
});

export const metadata: Metadata = {
  title: "Compay",
  description: "Hr and Payroll Management System",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.variable} antialiased flex `}>
        <Toaster />
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
