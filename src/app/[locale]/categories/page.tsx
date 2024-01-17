import React from "react";
import Link from "next/link";
import Image from "next/image";
import technology from "/public/imgs/Technology.jpg";
import food from "/public/imgs/food.jpg";
import { useTranslations } from "next-intl";
function Categories() {
  const t = useTranslations("Categories");
  return (
    <div className="container px-4 grid grid-cols-4 mt-4  lg:grid-cols-3 md:grid-cols-2 gap-3">
      <Link
        href={"/categories/technology?page=1"}
        className="h-64 overflow-hidden"
      >
        <Image
          className="h-[14rem] mb-1 object-cover rounded-lg"
          alt="technology"
          src={technology}
        />
        <p className="pl-1">{t("technology")}</p>
      </Link>

      <Link
        href={"/categories/food-products?page=1"}
        className="h-64 overflow-hidden"
      >
        <Image
          className="h-[14rem] mb-1 object-cover rounded-lg"
          alt="food"
          src={food}
        />
        <p className="pl-1"> {t("food")}</p>
      </Link>
    </div>
  );
}

export default Categories;
