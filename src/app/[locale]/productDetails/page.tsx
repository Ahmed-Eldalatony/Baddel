import { useLocale, useTranslations } from "next-intl";
import Favorite from "./favorite";
import { fetchDataById } from "@/src/helpers/fetchData";
import Image from "next/image";
import TagsClient from "../components/Tags/TagsClient";
import Link from "next/link";
import Description from "./description";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { LuHeart } from "react-icons/lu";
import { RatingComponent } from "./rating";

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
  // egyptian,
} from "@/src/app/lib/tagTypes";
import { getTranslations } from "next-intl/server";
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
  // egyptian,
};

// !Not sure wtf is this doing
// TODO: remove it to utils
const pick = function (obj, keys) {
  return keys.reduce((acc, key) => {
    if (obj.hasOwnProperty(key)) {
      acc[key] = obj[key];
    }
    return acc;
  }, {});
};

function ReviewProvider({ productId }) {
  const messages = useMessages();
  return (
    <NextIntlClientProvider
      messages={pick(messages, ["TagTypes", "Shared", "Product"])}
    >
      <RatingComponent productId={productId} />
    </NextIntlClientProvider>
  );
}
function FavoriteProvider({ productId }) {
  const messages = useMessages();
  return (
    <NextIntlClientProvider messages={pick(messages, ["Toasts"])}>
      <Favorite productId={productId} />
    </NextIntlClientProvider>
  );
}
async function ProductDetails({ searchParams }: any) {
  const tP = await getTranslations("Product");
  const id = searchParams.productId;
  const product = await fetchDataById("productDetails", id);
  const locale = useLocale();
  const {
    name,
    title,
    description,
    thumbnail,
    owner,
    alternatives,
    category,
    accessability,
    types,
    more_types,
  } = product;

  return (
    <>
      <main className="mt-8 container px-2 flex lg:flex-col  justify-between">
        <div>
          <div className="flex gap-6">
            <div className="border min-h-[100px] flex items-center border-gray-300 rounded-xl p-2 ">
              <Image
                className="rounded-sm "
                src={thumbnail}
                alt={name}
                width={100}
                height={100}
              />
            </div>
            <div className="space-y-2 w-full ">
              <div className="flex   items-center justify-between">
                <h1 className="font-semibold text-4xl text-gray-900 ">
                  {name.en}
                </h1>
                <FavoriteProvider productId={product._id} />
              </div>
              <p className="text-gray-700 text-lg">{title[locale]}</p>
            </div>
          </div>
          <div className="flex gap-2 mt-4 ms-1 ">
            {types.map((type) => {
              return (
                <TagsClient
                  key={type}
                  tag={
                    typesArr[`${type}`] === undefined
                      ? type
                      : typesArr[`${type}`]
                  }
                />
              );
            })}
          </div>
          <h2 className="font-semibold text-2xl mt-8 text-gray-900 ">
            {tP("details")}
          </h2>
          <Description
            more={tP("description.more")}
            less={tP("description.less")}
            description={description[locale]}
          />
          <h2 className="text-2xl font-semibold my-8 ">{tP("reviews")}</h2>

          <ReviewProvider productId={product._id} />
        </div>

        <div className=" w-80 lg:hidden  max-h-[300px] border-s-2 ps-3">
          <div className="flex gap-1">
            <p className=" whitespace-nowrap">{tP("owner")}</p>{" "}
            <strong className="text-gray-800 ">
              <Link className="" href={owner}>
                {owner.en}{" "}
              </Link>
            </strong>
          </div>
          {tP("noInfo")}
        </div>
      </main>
    </>
  );
}
export default ProductDetails;
