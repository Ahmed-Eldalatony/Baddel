import ProductCard from "./productCard";
import Link from "next/link";
import Loading from "../../loading";
import { fetchData } from "@/src/helpers/fetchData";
import { useTranslations } from "next-intl";
async function TopAlts() {
  // const tH = useTranslations("Home");
  const tS = useTranslations("Shared");
  const alternativeProducts = await fetchData("trending-alternatives", 1).then(
    (res) => res
  );
  alternativeProducts.length = 3;
  return (
    <>
      <div className="w-1/2 md:w-full">
        <div className=" w-full h-fit border flex flex-col overflow-hidden  rounded-2xl">
          {alternativeProducts &&
            alternativeProducts.map((product: any) => (
              <ProductCard
                key={product._id}
                product={product}
                alternative={true}
              />
            ))}
          {!alternativeProducts && <Loading />}
        </div>

        <Link
          className="text-center p-2 block text-blue-600 font-semibold underline text-lg hover:opacity-80"
          href={"/trending-alternatives"}
        >
          {tS("more")}
        </Link>
      </div>
    </>
  );
}

export default TopAlts;
