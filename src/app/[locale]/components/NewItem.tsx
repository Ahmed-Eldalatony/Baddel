import Link from "next/link";
import { Card, CardContent, CardTitle, CardFooter } from "./ui/card";
import Image from "next/image";
import { useTranslations } from "next-intl";
export default function NewItem() {
  const t = useTranslations("Home.newItem");
  
  const boycott = "https://i.ytimg.com/vi/GG42Xngt2eg/maxresdefault.jpg";
  return (
    <Card className="w-1/2 p-0 border-none max-h-fit  h-fit md:w-full md:my-8 ">
      <a href="https://youtube.com/watch?v=GG42Xngt2eg">
        <CardContent className="p-0 ">
          <Image
            width={"600"}
            height={"500"}
            className="rounded-2xl  object-cover h-[25em] lg:h-[18em] md:h-96 object-right "
            src={boycott}
            alt="Report Image"
          />
          <CardTitle className=" text-base font-normal">
            {t("1.title")}
          </CardTitle>
          <CardFooter className="text-sm text-gray-800 p-1">
            {t("1.by")}
          </CardFooter>
        </CardContent>
      </a>
    </Card>
  );
}
