import Image from "next/image";
import { Card, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Button } from "./ui/button";
import TagsClient from "./Tags/TagsClient";
import { useTranslations, useLocale } from "next-intl";
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
} from "@/src/app/lib/tagTypes";

function CompanyCard({ company }) {
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
  };
  const tC = useTranslations("Company");
  const t = useTranslations("Shared");

  const locale = useLocale();
  const { name, about, thumbnail, types } = company;
  return (
    <>
      <div>
        <div>
          {company && (
            <Card className=" border-transparent ">
              <CardHeader>
                <div className="flex gap-2 items-center">
                  <Image
                    width={"62"}
                    height={"62"}
                    alt={`${name[locale]} Logo`}
                    src={thumbnail}
                  />
                  <span className="ms-auto lg:ml-3 font-medium text-blue-600 lg:text-[.82em]">
                    {tC("company")}
                  </span>
                </div>
                <div className="pt-2 flex gap-3">
                  <CardTitle>{name[locale]} </CardTitle>
                  <div className="flex gap-1 flex-wrap">
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
                    {/* <TagsClient
                      tag={
                        typesArr[`${types[0]}`] !== undefined
                          ? typesArr[`${types[0]}`]
                          : typesArr["other"]
                      }
                    /> */}
                    {types.length > 1 && (
                      <span className="bg-gray-500 text-sm px-2 font-medium leading-7 text-slate-50 rounded-full ">{`+${
                        types.length - 1
                      }`}</span>
                    )}
                  </div>
                </div>

                <CardDescription className="pt-1 text-[.95em]">
                  {about[locale].slice(0, 55) + "...."}
                </CardDescription>
              </CardHeader>
            </Card>
          )}
        </div>
        {/* <Button
          variant={"link"}
          className="text-center p-2 block mx-auto mt-6 text-blue-600 font-semibold underline text-lg hover:opacity-80"
          onClick={() => setPage(page + 1)}
        >
          More
        </Button> */}
      </div>
    </>
  );
}

export default CompanyCard;
