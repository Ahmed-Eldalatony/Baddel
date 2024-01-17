import { useTranslations } from "next-intl";

import {
  Card,
  CardContent,
  CardTitle,
  CardFooter,
} from "@/src/app/[locale]/components/ui/card";
import Image from "next/image";
function Learn() {
  const boycott = "https://i.ytimg.com/vi/GG42Xngt2eg/maxresdefault.jpg";
  const palestine = "https://i.ytimg.com/vi/f0oy-NicIgE/maxresdefault.jpg";
  const israelBleeds = "https://i.ytimg.com/vi/s7n2wzIWjtY/maxresdefault.jpg";
  const tH = useTranslations("Home.newItem");
  return (
    <div className="container px-2">
      <h1 className="text-2xl text-gray-800 font-semibold mt-16">
        {tH("learn")}
      </h1>
      <p className="my-4 text-gray-600">{tH("description")}</p>
      <div className="grid grid-cols-3 gap-4  md:grid-cols-2  sm:grid-cols-1">
        <Card className="p-0 overflow-hidden  rounded-lg min-h-[18em] lg:min-h-[12em]     md:w-full md:my-8 ">
          <a target="blank" href="https://www.youtube.com/watch?v=GG42Xngt2eg">
            <CardContent className="p-0 ">
              <Image
                src={boycott}
                width={"350"}
                height={"350"}
                alt="Report Image"
                className="w-full"
              />
              <CardTitle className=" text-base lg:text-sm lg-text-sm lg-text-sm lg-text-sm w-full  font-normal">
                {tH("1.title")}
              </CardTitle>
              <CardFooter className="text-sm text-gray-800 p-1">
                {tH("1.by")}
              </CardFooter>
            </CardContent>
          </a>
        </Card>

        <Card className="p-0 overflow-hidden rounded-lg     min-h-[18em]  lg:min-h-[12em]  md:w-full md:my-8   ">
          <a href="https://youtube.com/watch?v=f0oy-NicIgE">
            <CardContent className="p-0 ">
              <Image
                src={palestine}
                width={"350"}
                height={"350"}
                alt="Report Image"
                className="w-full"
              />
              <CardTitle className="     text-base lg:text-sm lg-text-sm lg-text-sm lg-text-sm w-full  font-normal">
                {tH("2.title")}
              </CardTitle>
              <CardFooter className="text-sm text-gray-800 p-1">
                {tH("2.by")}
              </CardFooter>
            </CardContent>
          </a>
        </Card>

        <Card className="p-0 overflow-hidden  rounded-lg   min-h-[18em]     lg:min-h-[12em] md:w-full md:my-8   ">
          <a href="https://youtube.com/watch?v=s7n2wzIWjtY">
            <CardContent className="p-0 ">
              <Image
                src={israelBleeds}
                width={"350"}
                height={"350"}
                alt="Report Image"
                className="w-full"
              />
              <CardTitle className="     text-base lg:text-sm lg-text-sm lg-text-sm lg-text-sm w-full  font-normal">
                {tH("3.title")}
              </CardTitle>
              <CardFooter className="text-sm text-gray-800 p-1">
                {tH("3.by")}
              </CardFooter>
            </CardContent>
          </a>
        </Card>
      </div>
    </div>
  );
}

export default Learn;
