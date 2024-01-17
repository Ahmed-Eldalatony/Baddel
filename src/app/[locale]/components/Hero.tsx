import Link from "next/link";
import { useTranslations } from "next-intl";
function Hero() {
  const tH = useTranslations("Home.hero");
  return (
    <div className="flex z-10 relative container  flex-col items-center text-center">
      <div className=" p-3  w-fit rounded-lg ">
        <p className="text-gray-300 md:w-[40ch] sm:w-[30ch] md:text-base mt-32 lg:mt-24 md:mt-12 inline-block me-2 ">
          {tH("info")}
        </p>
      </div>
      <h1 className="text-gray-100 text-7xl lg:text-5xl mt-16 lg:mt-12  md:mt-8 font-bold">
        {tH("header")}
      </h1>
      <p className="w-[55ch] md:w-[40ch] sm:w-[30ch] md:text-base  text-center mt-16 lg:mt-12 md:mt-8 text-gray-300 text-lg ">
        {tH("description")}
      </p>
      <div className="mt-16 lg:mt-12 md:mt-8 flex gap-8">
        <Link
          className="bg-red-700  hover:bg-red-600 border-red-600  hover:border-red-600 text-gray-100 px-3 py-3 rounded-lg "
          href={"/learn"}
        >
          {tH("learn")}
        </Link>
        <Link
          className=" bg-gray-100 px-3 hover:opacity-90 active:opacity-90 text-gray-900 py-3 border   rounded-lg"
          href={"/categories"}
        >
          {tH("categories")}
        </Link>
      </div>
    </div>
  );
}

export default Hero;
