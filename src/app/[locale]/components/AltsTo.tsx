import { fetchData } from "@/src/helpers/fetchData";
import Loading from "../../loading";
import ProductCard from "./productCard";
import Link from "next/link";
import { useTranslations } from "next-intl";
async function AltsTo() {
  const tS = useTranslations("Shared");
  const replacedProducts = await fetchData("replaced-products", 1).then(
    (res) => res
  );

  return (
    <>
      <div>
        <div className="h-fit  grid grid-cols-2 lg:grid-cols-1 gap-3  overflow-hidden  rounded-2xl">
          {replacedProducts?.map((product: any) => (
            <ProductCard
              key={product._id}
              product={product}
              alternative={false}
            />
          ))}

          {!replacedProducts && <Loading />}
        </div>
        <Link
          className="text-center p-2 block text-blue-600 font-semibold underline text-lg hover:opacity-80"
          href={"/replaced-products"}
        >
          {tS("more")}
        </Link>
      </div>
    </>
  );
}

export default AltsTo;
