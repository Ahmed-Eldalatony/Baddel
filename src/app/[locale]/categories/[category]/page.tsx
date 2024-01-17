import { NextIntlClientProvider, useMessages } from "next-intl";
import CategoryClient from "./categoryClient";
function Page() {
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
    <NextIntlClientProvider messages={pick(messages, ["TagTypes", "Shared"])}>
      <CategoryClient />
    </NextIntlClientProvider>
  );
}

export default Page;
