import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import Footer from "./[locale]/components/Footer";
import "./globals.css";
import Header from "./[locale]/components/Header/Header";
const rubik = Rubik({ subsets: ["latin", "arabic"] });
import { useLocale } from "next-intl";
export const metadata: Metadata = {
  title: "The Bds Project",
  description: "The boycott Pro",
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
      <body className={`${rubik.className} min-h-screen `}>
        <Header />
        <div className=" sm:px-0">{children}</div>
        <div className="bg-red-800  ">
          <Footer />
        </div>
      </body>
    </html>
  );
}
export const revalidate = 0;
