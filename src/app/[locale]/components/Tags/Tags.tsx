import { NextIntlClientProvider, useMessages } from "next-intl";
import TagsClient from "./TagsClient";
function Tags({ tag }) {
  // !Not sure wtf is this doing
  function pick(obj, keys) {
    return keys.reduce((acc, key) => {
      if (obj.hasOwnProperty(key)) {
        acc[key] = obj[key];
      }
      return acc;
    }, {});
  }
  const messages = useMessages();
  return (
    <NextIntlClientProvider messages={pick(messages, ["TagTypes"])}>
      <TagsClient tag={tag} />
    </NextIntlClientProvider>
  );
}

export default Tags;
