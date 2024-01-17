"use client";
import Link from "next/link";
import Tag from "../components/Tags/TagsClient";
import { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import ProductCard from "../components/productCard";
import { fetchData } from "@/src/helpers/fetchData";
function ReplacedClient() {
  const [replacedProducts, setReplacedProducts] = useState();
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchData(`replaced-products`, page).then((data) => {
      setReplacedProducts(data);
    });
  }, [page]);

  return (
    <>
      <div>
        <h1 className="text-2xl font-medium mb-2 mt-8">
          You Should Look For Alternative To
        </h1>
        <div className="mt-10 w-full grid grid-cols-2 lg:grid-cols-1 gap-3 h-fit">
          {replacedProducts &&
            replacedProducts?.map((product: object) => {
              return (
                <ProductCard
                  key={product._id}
                  product={product}
                  alternative={false}
                />
              );
            })}
        </div>
        <Button
          variant={"link"}
          className="text-center mx-auto p-2 mt-6 block text-blue-600 font-semibold underline text-lg hover:opacity-80"
          onClick={() => setPage(page + 1)}
        >
          More
        </Button>
      </div>
    </>
  );
}

export default ReplacedClient;
