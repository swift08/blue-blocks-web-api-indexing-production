// src/app/layout.js
import Script from "next/script";
import HeaderShell from "@/components/layout/HeaderShell";
import Footer from "@/components/layout/Footer";
import NavigationLoader from "@/components/ui/NavigationLoader";
import HashScrollFix from "@/components/ui/HashScrollFix";
import WhatsAppFloat from "@/components/ui/WhatsAppFloat";
import siteData from "@/data/site";
import JsonLd from "@/components/seo/JsonLd";
import normalizeJsonLd from "@/lib/seo/normalizeJsonLd";
import { Poppins } from "next/font/google";
import "@/styles/global.css";
import GoogleConversions from "@/components/GoogleConversions";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300","400","500","600","700"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://www.blueblocks.in"),
  verification: {
    google: "SI7CvW22nLVTd7Oz5CRp01zUa_mrzQSWsufefVcW9QA",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }) {
  // Global / site-wide schema from site.json
  const org = normalizeJsonLd(siteData?.site?.schema?.organization);
  const website = normalizeJsonLd(siteData?.site?.schema?.website);

  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body className={`min-h-screen bg-white text-slate-900 ${poppins.className}`}>
        {/* Global JSON-LD (visible in view-source) */}
        <JsonLd id="jsonld-organization" data={org} />
        <JsonLd id="jsonld-website" data={website} />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-KYX146E33J"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = gtag;
            gtag('js', new Date());

            gtag('config', 'G-KYX146E33J');
            gtag('config', 'AW-1064646284');
          `}
        </Script>

        <GoogleConversions />


        <HeaderShell />
        <NavigationLoader minMs={450} />
        <HashScrollFix extraGap={12} />
        <main>{children}</main>
        <Footer />
        <WhatsAppFloat config={siteData?.whatsapp} />
      </body>
    </html>
  );
}

