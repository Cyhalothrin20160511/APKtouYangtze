import Link from 'next/link'
import ArticlesFooter from '@/components/ArticlesFooter'
import allGeneric from '../../../../locales/generic.json'
import allArticles from '../../../../locales/songjiang.json'
import { notFound } from 'next/navigation'
import ClientNavbar from '@/components/ClientNavbar';

type GenericText = Record<string, string>

type ArticleEntry = {
  image_url: string
  translations: Record<string, { title: string; short_desc?: string }>
}

type Article = {
  article_id: string
  title: string
  short_desc?: string
  image_url: string
}

type Params = {
  lang: string
  page: string
}

const PER_PAGE = 6

export async function generateStaticParams() {
  const langs = Object.keys(allGeneric)
  const totalPages = Math.ceil(
    Object.keys(allArticles as Record<string, ArticleEntry>).length / PER_PAGE
  )

  return langs.flatMap(lang =>
    Array.from({ length: totalPages }, (_, i) => ({
      lang,
      page: String(i + 1),
    }))
  )
}

interface PageProps {
  params: Promise<Params>
  searchParams?: Promise<Record<string, string | string[] | undefined>>
}

export default async function SongjiangArticlesPage({
  params,
  searchParams,
}: PageProps) {

  const { lang, page } = await params
  const pageNum = parseInt(page, 10)

  const genericText: GenericText =
    (allGeneric as Record<string, GenericText>)[lang] ||
    (allGeneric as Record<string, GenericText>)['en']

  const entries = allArticles as Record<string, ArticleEntry>
  const ids = Object.keys(entries)
  const start = (pageNum - 1) * PER_PAGE
  const sliceIds = ids.slice(start, start + PER_PAGE)

  if (sliceIds.length === 0) notFound()

  const articles: Article[] = sliceIds.map((id) => {
    const entry = entries[id]
    const tr = entry.translations[lang] || entry.translations['en']
    return {
      article_id: id,
      title: tr.title,
      short_desc: tr.short_desc,
      image_url: entry.image_url,
    }
  })

  const hasNextPage = start + PER_PAGE < ids.length

  return (
    <>
      <ClientNavbar />

      <main>
        <div className="album py-5 bg-body-tertiary">
          <div className="container">
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-2 gx-3 gy-5">
              {articles.map((article) => (
                <div className="col" key={article.article_id}>
                  <div className="card shadow-sm">
                    <img
                      className="bd-placeholder-img card-img-top"
                      src={article.image_url}
                      alt={article.title}
                    />
                    <div className="card-body">
                      <strong style={{ fontSize: '1.5em' }}>
                        {article.title}
                      </strong>
                      {article.short_desc && (
                        <p className="card-text m-1" style={{ textIndent: '2em' }}>
                          {article.short_desc}
                        </p>
                      )}
                      <div className="d-flex justify-content-between align-items-center">
                        <Link
                          className="btn btn-outline-secondary"
                          href={`/${lang}/songjiang/${article.article_id}`}
                        >
                          {genericText.read_more}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <ArticlesFooter page={pageNum} hasNextPage={hasNextPage} />
    </>
  )
}
