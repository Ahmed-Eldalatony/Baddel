import { NextIntlClientProvider, useMessages } from "next-intl";
import TopAltsClient from "./trendingClient";
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
      <TopAltsClient />
    </NextIntlClientProvider>
  );
}

export default Page;
