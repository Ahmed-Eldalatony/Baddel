import { NextIntlClientProvider, useMessages } from "next-intl";
import HeaderClient from "./HeaderClient";

function Header() {
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
    <NextIntlClientProvider messages={pick(messages, ["Home"])}>
      <HeaderClient />
    </NextIntlClientProvider>
  );
}

export default Header;
