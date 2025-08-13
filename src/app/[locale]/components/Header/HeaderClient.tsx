"use client";
import Image from "next/image";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import logo from "@/public/imgs/Baddel.svg";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { useLocale, useTranslations } from "next-intl";
import { BsList } from "react-icons/bs";

interface User {
  username: string;
  // Add other user properties as needed
}

function HeaderClient() {
  const [user, setUser] = useState<User | null>(null);
  const [query, setQuery] = useState("");
  const [queryString, setQueryString] = useState("");
  const locale = useLocale();
  const path = usePathname();
  const router = useRouter();
  const t = useTranslations("Home.nav");

  useEffect(() => {
    fetch("/api/me")
      .then((res) => res.json())
      .then((data) => data.user?.username && setUser(data.user))
      .catch(() => setUser(null)); // Handle fetch errors
  }, [path]); // Simplified dependencies

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQueryString(e.target.value);
  };

  const handleSearch = () => {
    if (queryString.trim()) {
      router.push(`/search?q=${encodeURIComponent(queryString)}`);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const switchLanguage = () => {
    setTimeout(() => {
      router.refresh();
    }, 200);
  };

  const LanguageComponent = () => {
    return locale === "ar" ? (
      <Link
        className="ms-3 p-2 bg-gray-100 rounded-md"
        href="/en"
        onClick={switchLanguage}
      >
        EN
      </Link>
    ) : (
      <Link
        className="ms-2 p-2 bg-gray-100 rounded-md"
        href="/ar"
        onClick={switchLanguage}
      >
        AR
      </Link>
    );
  };

  return (
    <>
      <div className="bg-white">
        <div className="flex px-3  md:px-1 sticky container z-50 top-0 items-center">
          <Link href="/">
            <Image
              className="w-20 me-5 md:w-16 py-2"
              width={120}
              height={40}
              src={logo}
              alt="Logo"
            />
          </Link>

          <div className="flex ml-2 mr-2 relative items-center">
            <Input
              type="text"
              className="px-3 py-5 md:py-4 border-gray-700 border w-[32em] xl:w-80 lg:w-72 md:w-52 sm:w-32"
              placeholder={`${t("search")}...`}
              value={queryString}
              onChange={handleChange}
              onKeyUp={handleKeyPress}
            />
          </div>

          <Button
            onClick={handleSearch}
            className="px-4 sm:text-sm py-5 md:px-3 md:py-4 sm:px-1 sm:py-2 bg-red-700 border hover:bg-red-600 border-red-600 hover:border-red-600"
          >
            {t("search")}
          </Button>

          <div className="ms-auto lg:hidden gap-2 flex items-center">
            <Link className="p-2 hover:opacity-80" href="/categories">
              {t("categories")}
            </Link>
            {!user && (
              <Link
                className="p-2 hover:text-gray-600"
                href={`/${locale}/signin`}
              >
                {t("signin")}
              </Link>
            )}
            {user && (
              <div className="space-x-3">
                <Link href="/signout">{t("signout")}</Link>
              </div>
            )}
          </div>

          <LanguageComponent />

          <Sheet>
            <SheetTrigger className="ms-auto hidden lg:block">
              <BsList size={40} />
            </SheetTrigger>
            <SheetContent className="w-72">
              <div>
                <ul className="ml-auto gap-3 flex flex-col first-of-type:mt-10 items-center">
                  <li className="p-2 hover:text-gray-600">
                    <Link href="/categories">{t("categories")}</Link>
                  </li>
                  <li className="p-2 hover:text-gray-600">
                    <Link href="/about">{t("about")}</Link>
                  </li>
                  {!user && (
                    <li className="p-2 hover:text-gray-600">
                      <Link href={`/${locale}/signin`}>{t("signin")}</Link>
                    </li>
                  )}
                  {user && (
                    <li className="p-2 hover:text-gray-600">
                      <Link href="/signout">{t("signout")}</Link>
                    </li>
                  )}
                </ul>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </>
  );
}

export default HeaderClient;
