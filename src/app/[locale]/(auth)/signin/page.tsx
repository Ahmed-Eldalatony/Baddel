import { NextIntlClientProvider, useMessages } from "next-intl";
import SignIn from "../../components/auth/SignIn";
function SignInForm() {
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
    <NextIntlClientProvider messages={pick(messages, ["Register"])}>
      <SignIn />
    </NextIntlClientProvider>
  );
}

export default SignInForm;
