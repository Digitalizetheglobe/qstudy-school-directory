import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
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
  metadataBase: new URL("https://schoolfinderhub.com"),
  title: "Find Schools Worldwide and Study Abroad | School Finder Hub",
  description:
    "Explore international schools, boarding schools, language courses and scholarships worldwide. Find the right school and get expert admission and visa support.",
  keywords: [
    "International School Directory",
    "Find Schools Worldwide",
    "International School Admissions",
    "Study Abroad Scholarships",
    "Boarding Schools Worldwide"
  ],
  verification: {
    google: "Tj_Fyy6DJIifhYYrneseEirt02Jg2W_rZ-Qf85IsL0w",
  },
  openGraph: {
    title: "Find Schools Worldwide and Study Abroad | School Finder Hub",
    description:
      "Explore international schools, boarding schools, language courses and scholarships worldwide. Find the right school and get expert admission and visa support.",
    url: "https://schoolfinderhub.com",
    siteName: "School Finder Hub",
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
      <body suppressHydrationWarning>
        {/* Google tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-DGQRGFRZCN"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-DGQRGFRZCN');
          `}
        </Script>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
