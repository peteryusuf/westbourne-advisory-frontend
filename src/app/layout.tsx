import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

// Buda font is added via direct import since it's not available in next/font/google

export const metadata: Metadata = {
  title: "Westbourne Advisory - Expert Surrogacy Legal Services UK",
  description: "Leading UK legal specialists providing comprehensive surrogacy law support for intended parents. Expert guidance through parental orders, legal agreements, and surrogacy processes.",
  keywords: [
    "surrogacy legal services uk",
    "parental orders uk", 
    "surrogacy lawyers",
    "intended parents legal support",
    "uk surrogacy law",
    "westbourne advisory",
    "surrogacy legal advice"
  ],
  authors: [{ name: "Westbourne Advisory" }],
  creator: "Westbourne Advisory",
  publisher: "Westbourne Advisory",
  metadataBase: new URL('https://westbourneadvisory.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Westbourne Advisory - Expert Surrogacy Legal Services UK",
    description: "Leading UK legal specialists providing comprehensive surrogacy law support for intended parents. Expert guidance through parental orders, legal agreements, and surrogacy processes.",
    url: 'https://westbourneadvisory.com',
    siteName: 'Westbourne Advisory',
    images: [
      {
        url: '/WESTBOURNE-light-mode.png',
        width: 1200,
        height: 630,
        alt: 'Westbourne Advisory - Surrogacy Legal Services',
      },
    ],
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Westbourne Advisory - Expert Surrogacy Legal Services UK",
    description: "Leading UK legal specialists providing comprehensive surrogacy law support for intended parents.",
    images: ['/WESTBOURNE-light-mode.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code', // Add your Google Search Console verification
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Buda:wght@300&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LegalService",
              "name": "Westbourne Advisory",
              "description": "Leading UK legal specialists providing comprehensive surrogacy law support for intended parents.",
              "url": "https://westbourneadvisory.com",
              "logo": "https://westbourneadvisory.com/WESTBOURNE-light-mode.png",
              "areaServed": {
                "@type": "Country",
                "name": "United Kingdom"
              },
              "serviceType": [
                "Surrogacy Legal Services",
                "Parental Orders",
                "Family Law",
                "Legal Advice"
              ],
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "GB"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "Legal Services",
                "areaServed": "GB"
              }
            })
          }}
        />
      </head>
      <body
        className={`${inter.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
