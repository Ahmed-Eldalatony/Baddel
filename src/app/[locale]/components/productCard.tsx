import Image from "next/image";
import Link from "next/link";
import arrows from "@/public/imgs/Arrows.svg";
import { useLocale, useTranslations } from "next-intl";
import {
  supporter,
  american,
  european,
  israeli,
  valid,
  safe,
  unsafe,
  openSource,
  unhealthy,
  other,
} from "@/src/app/lib/tagTypes";
import TagsClient from "./Tags/TagsClient";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
const typesArr = {
  supporter,
  american,
  european,
  israeli,
  valid,
  safe,
  unsafe,
  openSource,
  unhealthy,
  other,
};

export default function ProductCard({ product, alternative }: object) {
  const {
    _id,
    name,
    description,
    thumbnail,
    title,
    owner,
    alternatives,
    category,
    accessability,
    types,
    more_types,
  } = product;
  const locale = useLocale();
  const tP = useTranslations("Product");
  return (
    <Link href={`/productDetails?productId=${product._id}`} key={_id}>
      <Card className=" border-transparent  border-b-gray-200 rounded-none">
        <CardHeader>
          <div className="flex gap-2 items-center">
            <div className="min-h-[60px] max-h-[60px] flex items-center ">
              <Image
                width={"60"}
                height={"60"}
                alt={`${name[locale]} Logo`}
                src={thumbnail}
              />
            </div>
            {alternative && (
              <>
                <Image
                  style={{ transform: locale === "ar" && "rotateY(190deg)" }}
                  width={"35"}
                  height={"35"}
                  alt={"arrows"}
                  src={arrows}
                />

                <Image
                  width={"35"}
                  height={"35"}
                  alt={alternatives[0].name}
                  src={alternatives[0].thumbnail}
                />
              </>
            )}
            <div className="ms-auto">
              <Link
                href={`categories/${category.name.en.toLowerCase()}?p=1`}
                className=" ml-5 lg:ml-2 text-[1.05em] lg:text-[.90em] font-medium text-blue-600"
              >
                #{category.name[locale]}
              </Link>

              {category.subcategory_name[locale] !== "" && (
                <>
                  <span className="text-blue-600"> \</span>

                  <Link
                    className="font-medium text-blue-600 lg:text-[.82em]"
                    href={`categories/${category.subcategory_name.en.toLowerCase()}?p=1`}
                  >
                    {category.subcategory_name[locale]}
                  </Link>
                </>
              )}
            </div>
          </div>
          <div className="pt-2 flex gap-3">
            <CardTitle>{name.en} </CardTitle>
            <div className="flex gap-1 flex-wrap">
              <TagsClient
                tag={
                  typesArr[`${types[0]}`] !== undefined
                    ? typesArr[`${types[0]}`]
                    : typesArr["other"]
                }
              />
              {types.length > 1 && (
                <span className="bg-gray-500 text-sm px-2 font-medium leading-7 text-slate-50 rounded-full ">{`+${
                  types.length - 1
                }`}</span>
              )}
            </div>
          </div>
          <CardDescription className="pt-1 flex justify-between text-[.95em]">
            {title[locale]}
            <Link
              href={owner.en.toLowerCase().replace(" ", "-")}
              className="  text-blue-500"
            >
              {owner.en}
            </Link>
          </CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}
