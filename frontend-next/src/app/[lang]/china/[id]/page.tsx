import { notFound } from 'next/navigation'
import Head from 'next/head'
import allGeneric from '../../../locales/generic.json'
import allArticles from '../../../locales/articles.json'
import ClientNavbar from '@/components/ClientNavbar';
import ProposeChanges from "@/components/ProposeChanges";
import Link from 'next/link'

type GenericText = Record<string, string>

type ArticleEntry = {
  image_url: string
  translations: Record<string, { title: string; desc: string }>
}

type Article = {
  id: string
  title: string
  desc: string
  image_url: string
}

type Params = { lang: string; id: string }

export async function generateStaticParams() {
  const langs = ['en','zh','ru','ja','el']
  const ids = Object.keys(allArticles as Record<string, ArticleEntry>)
  return langs.flatMap(lang => ids.map(id => ({ lang, id })))
}

interface PageProps {
  params: Promise<Params>
  searchParams?: Promise<Record<string, string | string[] | undefined>>
}

export default async function ContentPage({
  params,
  searchParams,
}: PageProps) {

  const { lang, id } = await params

  const genericText: GenericText =
    (allGeneric as Record<string, GenericText>)[lang] ||
    (allGeneric as Record<string, GenericText>)['en']

  const entry = (allArticles as Record<string, ArticleEntry>)[id]
  if (!entry) notFound()

  const tr = entry.translations[lang] || entry.translations['en']
  const article: Article = {
    id,
    title: tr.title,
    desc: tr.desc,
    image_url: entry.image_url,
  }

  return (
    <>
      <Head>
        <title>{article.title}</title>
      </Head>

      <ClientNavbar />

      <div className="position-relative overflow-hidden p-3 text-center">
        <div className="col-md-7 p-lg-5 mx-auto">
          <h1 className="display-4 font-weight-normal">{article.title}</h1>

          {article.image_url && (
            <>
              <img
                className="bd-placeholder-img my-4"
                src={article.image_url}
                alt={article.title}
                style={{
                  maxWidth: '60%',
                  height: 'auto',
                  display: 'block',
                  margin: '0 auto',
                }}
              />
              <p
                className="text-body-secondary"
                style={{
                  whiteSpace: 'pre-wrap',
                  maxWidth: '80%',
                  margin: '1rem auto',
                  wordBreak: 'break-word',
                }}
              >
                {genericText.image_source} {article.image_url}
              </p>
            </>
          )}

          <div
            style={{ whiteSpace: 'pre-wrap', textAlign: 'justify', lineHeight: 1.8 }}
          >
            {article.desc.split('\n\n').map((para, idx) => (
              <p
                key={idx}
                className="lead font-weight-normal"
                style={{ textIndent: '2em', maxWidth: '80%', margin: '0 auto 1.5em' }}
              >
                {para}
              </p>
            ))}
          </div>

          <p
            className="text-body-secondary"
            style={{
              whiteSpace: 'pre-wrap',
              maxWidth: '80%',
              margin: '1rem auto',
              wordBreak: 'break-word',
            }}
          >
            {genericText.text_source}
            <br />
            <a
              href={`https://www.ihchina.cn/project_details/${id.replace(
                'article_',
                '',
              )}`}
            >
              {`https://www.ihchina.cn/project_details/${id.replace(
                'article_',
                '',
              )}`}
            </a>
          </p>
        </div>

        <footer className="text-body-secondary">
          <div className="container d-flex justify-content-end align-items-center mb-3">
            <button
              className="btn btn-outline-secondary m-2"
              data-bs-toggle="modal"
              data-bs-target="#editModal"
            >
              {genericText.propose_changes}
            </button>
            <Link href={`/${lang}/china/articles/1`}>
              <a className="btn btn-outline-secondary m-2">
                {genericText.back_list}
              </a>
            </Link>
          </div>
        </footer>
      </div>

      <ProposeChanges
        articleId={article.id}
        genericText={genericText}
      />
    </>
  )
}