"use client";
import { useState, useEffect } from "react";
import CompanyCard from "../components/CompanyCard";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "../components/ui/button";
import Loading from "../../loading";
import ProductCard from "../components/productCard";
import { LoadMore } from "../components/InfiniteSrcollProducts";
function SearchClient() {
  const searchParams = useSearchParams();
  const [page, setPage] = useState();
  const search = searchParams.get("q");
  const [products, setProducts] = useState();
  const [companies, setCompanies] = useState();
  const [loading, setLoading] = useState(false);
  const notYet = "Sorry, Product/Company not found, but it is coming soon";
  useEffect(() => {
    try {
      setLoading(true);
      fetch(`/api/search?q=${search}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.products.length === 0 && data.companies.length === 0) {
            setProducts(notYet);
            setCompanies(notYet);
          } else {
            setCompanies(data.companies);
            setProducts(data.products);
          }
        })
        .finally(() => setLoading(false));
    } catch (err) {
      console.log(err);
    }
  }, [search]);
  return (
    <div className=" container px-4  gap-3">
      {loading && <Loading />}
      <p className="my-8 text-2xl font-semibold text-gray-800">
        {loading ? "Searching" : "Results"} for &quot;{search}&quot;
      </p>
      <div className="w-full grid grid-cols-2 lg:grid-cols-1 gap-5 h-fit">
        {products === notYet && companies === notYet && (
          <p className="mx-auto  col-span-2 block mt-32 text-xl font-semibold">
            {notYet}
          </p>
        )}
        {products &&
          products !== notYet &&
          products.map((product) => {
            return (
              <ProductCard
                key={product._id}
                product={product}
                alternative={false}
              />
            );
          })}
        {companies &&
          companies !== notYet &&
          companies.map((company) => {
            return <CompanyCard key={company._id} company={company} />;
          })}
      </div>
      {/* <LoadMore count={10} initialData={products} /> */}
    </div>
  );
}

export default SearchClient;
