import { notFound } from 'next/navigation'
import HomeClient from './HomeClient'
import allGeneric from '../locales/generic.json'
import type { Metadata } from 'next'

type GenericText = Record<string, string>

type Params = {
  lang: string
  page: string
}

interface PageProps {
  params: Promise<Params>
  searchParams?: Promise<Record<string, string | string[] | undefined>>
}

const siteUrl = "https://apktouyangtze.schuletoushu.com";
const supportedLangs = ["en", "el", "sc", "ja", "ru"];

export async function generateMetadata({ params }: PageProps ): Promise<Metadata> {
  const { lang } = await params
  const tr = (allGeneric as Record<string, GenericText>)[lang] 
    || (allGeneric as Record<string, GenericText>)['en']

  const languages: Record<string, string> = {};
  supportedLangs.forEach((lng) => {
    languages[lng] = `${siteUrl}/${lng}`;
  });
  
  return {
    title: tr.title,
    description: tr.about_encyclopedia_desc,
    openGraph: { title: tr.title, description: tr.about_encyclopedia_desc },
    alternates: {
      canonical: `${siteUrl}/${lang}`,
      languages,
    },
  }
}

export async function generateStaticParams() {
  return ['en','el','sc','ja','ru'].map((lang) => ({ lang }))
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const genericText = (allGeneric as Record<string, any>)[lang] || allGeneric['en']

  if (!genericText) {
    notFound()
  }

  return <HomeClient genericText={genericText} lang={lang} />
}
