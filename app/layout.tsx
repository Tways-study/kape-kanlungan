import type { Metadata } from "next";
import { Fraunces, Bricolage_Grotesque } from "next/font/google";
import { MotionProvider } from "@/components/motion-provider";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  axes: ["opsz"],
  style: ["normal", "italic"],
  weight: "variable",
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const siteUrl = "https://kapekanlungan.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Kapé Kanlungan — Specialty Coffee in Sibalom, Antique",
  description:
    "A quiet refuge of wood, greenery, and slow afternoons — where every cup is brewed with care in the heart of Sibalom, Antique.",
  openGraph: {
    title: "Kapé Kanlungan — Specialty Coffee in Sibalom, Antique",
    description: "Your daily shelter in every sip.",
    url: siteUrl,
    siteName: "Kapé Kanlungan",
    images: [{ url: "/og.jpg", width: 1200, height: 900 }],
    locale: "en_PH",
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
      className={`${fraunces.variable} ${bricolage.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream text-ink">
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
