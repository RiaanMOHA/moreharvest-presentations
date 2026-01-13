import {NextIntlClientProvider} from "next-intl";
import {getMessages} from "next-intl/server";
export function generateStaticParams(){return[{locale:"en"},{locale:"zh-CN"},{locale:"zh-TW"}];}
export default async function LocaleLayout({children,params:{locale}}:{children:React.ReactNode;params:{locale:string}}){
  const messages=await getMessages();
  return <html lang={locale}><body><NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider></body></html>;
}
