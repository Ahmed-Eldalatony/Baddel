import {getRequestConfig} from 'next-intl/server';

export default getRequestConfig(async ({locale}) => ({
  messages: (
    await (locale === 'ar'
      ? // When using Turbopack, this will enable HMR for `en`
        import('/src/messages/ar.json')
      : import(`src/messages/${locale}.json`))
  ).default
}));