import { NextIntlClientProvider, useMessages } from "next-intl";
import TagsClient from "./TagsClient";
import { pick } from "../../../lib/pick";
function Tags({ tag }) {
  const messages = useMessages();
  return (
    <NextIntlClientProvider messages={pick(messages, ["TagTypes"])}>
      <TagsClient tag={tag} />
    </NextIntlClientProvider>
  );
}

export default Tags;
