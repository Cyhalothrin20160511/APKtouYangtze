import type { Metadata } from "next";

const siteUrl = "https://apktouyangtze.schuletoushu.com";

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = params;

  return {
    alternates: {
      canonical: `${siteUrl}/${lang}`,
      languages: {
        en: `${siteUrl}/en`,
        el: `${siteUrl}/gr`,
        sc: `${siteUrl}/sc`,
        ja: `${siteUrl}/ja`,
        ru: `${siteUrl}/ru`,
      },
    },
  };
}

export default function LocaleLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
