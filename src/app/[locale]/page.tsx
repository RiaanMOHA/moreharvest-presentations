export const dynamicParams = false;

export function generateStaticParams() {
  return [{ locale: "en" }];
}

export default function LocaleHome() {
  return <div>Locale home OK</div>;
}
