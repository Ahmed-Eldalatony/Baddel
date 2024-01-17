import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { useTranslations } from "next-intl";
function TagsClient({ tag }) {
  const t = useTranslations("TagTypes");
  const other = typeof tag === "string" ? true : false;
  tag = other ? tag[0].toUpperCase() + tag.slice(1) : tag;
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant={other ? "otherTypes" : tag.type} size={"min"}>
            {other ? tag : t(`${tag.type}.name`)}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{other ? tag : t(`${tag.type}.tooltipContent`)}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default TagsClient;
