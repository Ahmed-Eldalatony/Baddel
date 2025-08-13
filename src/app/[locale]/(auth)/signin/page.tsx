import { NextIntlClientProvider, useMessages } from "next-intl";
import SignIn from "../../components/auth/SignIn";
import { pick } from "@/src/app/lib/pick";
function SignInForm() {
  const messages = useMessages();
  return (
    <NextIntlClientProvider messages={pick(messages, ["Register"])}>
      <SignIn />
    </NextIntlClientProvider>
  );
}

export default SignInForm;
