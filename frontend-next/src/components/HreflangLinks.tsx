"use client";

import React from "react";
import Head from "next/head";
import { usePathname } from "next/navigation";
import { localeConfig } from "@/localeConfig";

type HreflangLinksProps = {
  currentLocale: string;
};

const siteUrl = "https://apktouyangtze.schuletoushu.com";

export default function HreflangLinks({ currentLocale }: HreflangLinksProps) {
  const pathname = usePathname();

  const { locales } = localeConfig;

  return (
    <Head>
      {locales.map((lng) => {
        const strippedPath = pathname.replace(`/${currentLocale}`, "");  
        const href = `${siteUrl}/${lng}${strippedPath}`;

        return (
          <link
            key={lng}
            rel="alternate"
            hrefLang={lng}
            href={href}
          />
        );
      })}

      <link
        rel="alternate"
        hrefLang="x-default"
        href={`${siteUrl}${pathname.replace(`/${currentLocale}`, "")}`}
      />
    </Head>
  );
}
