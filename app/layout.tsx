import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from './components/ThemeProvider';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "QStudy World - Find & Apply to Schools Worldwide",
  description:
    "Explore 5,000+ schools across 120+ countries. Apply for courses, find scholarships, and get end-to-end student support - all on QStudy World.",
  keywords: "study abroad, international schools, scholarships, student visa, education platform",
  openGraph: {
    title: "QStudy World - Global School Directory",
    description: "Your one-stop platform to find, apply, and succeed at schools worldwide.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body><ThemeProvider>{children}</ThemeProvider></body>
    </html>
  );
}
