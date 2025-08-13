import { NextIntlClientProvider, useMessages } from "next-intl";
import CategoryClient from "./categoryClient";
import { pick } from "../../../lib/pick";
function Page() {
  const messages = useMessages();
  return (
    <NextIntlClientProvider messages={pick(messages, ["TagTypes", "Shared"])}>
      <CategoryClient />
    </NextIntlClientProvider>
  );
}

export default Page;
