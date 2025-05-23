import type { Metadata } from "next";
import { Montserrat } from "next/font/google"; 
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"], 
  weight: ["400", "500", "700"], 
  variable: "--font-montserrat", 
});

export const metadata: Metadata = {
  title: "Sandora",
  description: "Teste técnico Sandora",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={montserrat.className}> 
        {children}
      </body>
    </html>
  );
}