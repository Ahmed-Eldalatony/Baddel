import { NextIntlClientProvider, useMessages } from "next-intl";
import TopAltsClient from "./trendingClient";
import { pick } from "../../lib/pick";
function Page() {
  const messages = useMessages();
  return (
    <NextIntlClientProvider messages={pick(messages, ["TagTypes", "Shared"])}>
      <TopAltsClient />
    </NextIntlClientProvider>
  );
}

export default Page;
