import React from 'react';
import HreflangLinks from "@/components/HreflangLinks";

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: { lang: string };
}

export default function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { lang } = params;

  return (
    <html lang={lang}>
      <body>
        <HreflangLinks currentLocale={lang} />
        {children}
      </body>
    </html>
  );
}
