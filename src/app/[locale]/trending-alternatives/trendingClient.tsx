"use client";
import { Button } from "../components/ui/button";
import { useState, useEffect } from "react";
import ProductCard from "../components/productCard";
import { useTranslations } from "next-intl";
import { fetchData } from "@/src/helpers/fetchData";
function TopAltsClient() {
  const [alternativeProducts, setAlternativeProducts] = useState();
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchData(`trending-alternatives`, page).then((data) => {
      console.log(data);
      setAlternativeProducts(data);
    });
  }, [page]);

  const t = useTranslations("Shared");
  return (
    <>
      <div>
        <h1 className="text-2xl font-medium mb-2 mt-8">{t("trending")}</h1>
        <div className="">
          <div className="w-full grid grid-cols-2 lg:grid-cols-1 gap-3 h-fit ">
            {alternativeProducts &&
              alternativeProducts.map((product: any) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  alternative={true}
                />
              ))}
          </div>
        </div>
        <Button
          variant={"link"}
          className="text-center p-2 block mx-auto mt-6 text-blue-600 font-semibold underline text-lg hover:opacity-80"
          onClick={() => setPage(page + 1)}
        >
          {t("more")}
        </Button>
      </div>
    </>
  );
}

export default TopAltsClient;
