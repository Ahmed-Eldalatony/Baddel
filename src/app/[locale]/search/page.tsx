import { NextIntlClientProvider, useMessages } from "next-intl";
import SearchClient from "./SearchClient";
function Search() {
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
    <NextIntlClientProvider
      messages={pick(messages, ["Card", "TagTypes", "Company"])}
    >
      <SearchClient />
    </NextIntlClientProvider>
  );
}

export default Search;
