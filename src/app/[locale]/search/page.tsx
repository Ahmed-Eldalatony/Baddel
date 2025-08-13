import { NextIntlClientProvider, useMessages } from "next-intl";
import SearchClient from "./SearchClient";
import { pick } from "../../lib/pick";
function Search() {
  const messages = useMessages();
  return (
    <NextIntlClientProvider
      messages={pick(messages, ["Card", "TagTypes", "Company"])}
    >
      <SearchClient />
    </NextIntlClientProvider>
  );
}

export default Search;
