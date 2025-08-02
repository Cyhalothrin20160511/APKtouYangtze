import { notFound } from 'next/navigation'
import HomeClient from './HomeClient'
import allGeneric from '../locales/generic.json'

export async function generateStaticParams() {
  return ['en','gr','sc','ja','ru'].map((lang) => ({ lang }))
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
