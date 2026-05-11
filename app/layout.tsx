import type { Metadata } from "next";
import { Bebas_Neue, Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { TicketProvider } from "@/contexts/TicketContext";
import { clientConfig } from "@/client.config";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: false,
});

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: clientConfig.meta.title,
  description: clientConfig.meta.description,
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  openGraph: {
    title: clientConfig.meta.ogTitle,
    description: clientConfig.meta.ogDescription,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${bebasNeue.variable}`}>
      <body>
        <TicketProvider>{children}</TicketProvider>
        <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
        {/* Google Analytics */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-7H0SQ4CJLH" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-7H0SQ4CJLH');
        `}</Script>
        {/* Microsoft Clarity */}
        <Script id="microsoft-clarity" strategy="afterInteractive">{`
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window,document,"clarity","script","w6aw1anta4");
        `}</Script>
      </body>
    </html>
  );
}
