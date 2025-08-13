import type { Metadata } from "next";
import {
  // Open_Sans,
  // Rubik,
  // Merriweather,
  // Noto_Serif,
  Readex_Pro,
  // Lora,
} from "next/font/google";

import Footer from "./[locale]/components/Footer";
import "./globals.css";
import Header from "./[locale]/components/Header/Header";
import { useLocale } from "next-intl";

const openSans = Readex_Pro({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});
export const metadata: Metadata = {
  title: "Baddel",
  description: "The boycott Pro",
  icons: {
    icon: "/favicon.ico?v=4",
    apple: "/apple-touch-icon.png?v=4",
    shortcut: "/apple-touch-icon.png",
  },
};
export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: any;
}) {
  const locale = useLocale();
  // if (params.locale !== locale) {
  // }
  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr "}>
      <body className={`${openSans.className} min-h-screen `}>
        <Header />
        <div className=" sm:px-0">{children}</div>
        <div className="bg-slate-900  ">
          <Footer />
        </div>
      </body>
    </html>
  );
}
export const revalidate = 0;
