import { NextIntlClientProvider, useMessages } from "next-intl";
import SignUp from "../../components/auth/SignUp";

function SignUpForm() {
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
    <NextIntlClientProvider messages={pick(messages, ["Register"])}>
      <SignUp />
    </NextIntlClientProvider>
  );
}
export default SignUpForm;
