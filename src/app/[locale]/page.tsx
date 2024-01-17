import Hero from "./components/Hero";
import TopAlts from "./components/TopAlts";
import NewItem from "./components/NewItem";
import AltsTo from "./components/AltsTo";
import Link from "next/link";
import { useTranslations } from "next-intl";
import Image from "next/image";
import qds from "@/public/imgs/qds.jpg";
// import translator from "@/src/helpers/translate";
export default function Home() {
  const tH = useTranslations("Home");
  const t = useTranslations("Shared");
  // const translator = async () => {
  //   const dataTranslated = await fetch(`${URL}/translate`).then((res) =>
  //     res.json()
  //   );
  //   console.log(dataTranslated.message);
  // };
  // translator();

  return (
    <>
      <main className="">
        <div className="relative w-screen h-screen">
          <div className=" absolute bg-black w-full h-full z-0 opacity-60" />
          <Image
            className="absolute z-[-1]"
            src={qds}
            alt="qds"
            layout="fill"
            objectFit="cover"
          />

          <Hero />
        </div>
        <div className="container px-4">
          <Link className="text-blue-700 underline" href={"/support"}></Link>
          <h1 className="text-2xl font-medium mb-2 mt-16">{t("trending")}</h1>
          <div className="flex gap-5 md:flex-col">
            <TopAlts />
            <NewItem />
          </div>
          <h1 className="text-2xl font-medium mb-2 mt-16">{t("replaced")}</h1>
          <AltsTo />
        </div>
      </main>
    </>
  );
}
