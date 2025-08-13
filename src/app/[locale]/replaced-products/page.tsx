import { NextIntlClientProvider, useMessages } from "next-intl";
import ReplacedClient from "./ReplacedClient";
import { pick } from "../../lib/pick";
function Page() {
  const messages = useMessages();
  return (
    <NextIntlClientProvider messages={pick(messages, ["TagTypes", "Shared"])}>
      <ReplacedClient />
    </NextIntlClientProvider>
  );
}

export default Page;
