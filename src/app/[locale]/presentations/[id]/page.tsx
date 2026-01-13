export const dynamicParams = false;

export function generateStaticParams() {
  return [{ locale: "en", id: "test" }];
}

export default function PresentationPage({ params }: any) {
  return <div>Presentation {params.id}</div>;
}
