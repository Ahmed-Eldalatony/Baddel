import { NextIntlClientProvider, useMessages } from "next-intl";
import SignUp from "../../components/auth/SignUp";
import { pick } from "../../../lib/pick";
function SignUpForm() {
  const messages = useMessages();
  return (
    <NextIntlClientProvider messages={pick(messages, ["Register"])}>
      <SignUp />
    </NextIntlClientProvider>
  );
}
export default SignUpForm;
