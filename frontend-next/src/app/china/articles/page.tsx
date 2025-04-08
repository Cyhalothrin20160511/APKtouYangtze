"use client";

import React, {Suspense} from "react";
import Navbar from "@/components/Navbar";
import { useGenericText } from "@/context/GenericTextProvider";
import Head from "next/head";
import ArticlesFooter from "@/components/ArticlesFooter";
import { useState, useEffect } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const RawArticlesPage = () => {
  type Article = {
    article_id: string;
    title: string;
    short_desc: string;
    image_url: string;
  };
  
  const { genericText } = useGenericText();
  const [articles, setArticles] = useState<Article[]>([]);
  const [hasNextPage, setHasNextPage] = useState(false);
  const { language } = useLanguage();
  const searchParams = useSearchParams();
  
  const page = parseInt(searchParams.get("page") || "1", 10);
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  
  useEffect(() => {
    fetch(`${API_BASE_URL}/articles?lang=${language}&page=${page}`)
      .then((response) => response.json())
      .then((data) => {
        setArticles(data.articles);
        setHasNextPage(data.hasNextPage);
      })
      .catch((error) => console.error("Error fetching articles:", error));
  }, [API_BASE_URL, language, page]);

  return (
    <>
      <Head>
        <title>{genericText.title}</title>
      </Head>
      <Navbar />
      <main>
        <div className="album py-5 bg-body-tertiary">
          <div className="container">
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 gx-3 gy-5">
              {articles.map((article) => (
                <div className="col" key={article.article_id}>
                  <div className="card shadow-sm">
                    <img className="bd-placeholder-img card-img-top" src={article.image_url} alt={article.title} />
                    <div className="card-body">
                      <strong  style={{ fontSize: "1.5em"}}>{article.title}</strong>
                      <p
                        className="card-text m-1"
                        style={{
                            textIndent: "2em"
                        }}>
                          {article.short_desc}
                      </p>
                      <div className="d-flex justify-content-between align-items-center">
                          <small className="text-body-secondary"></small>
                          <Link type="button" className="btn btn-outline-secondary" href={`/china/${article.article_id}`}>{genericText.read_more}</Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <ArticlesFooter page={page} hasNextPage={hasNextPage} />
    </>
  );
};

const ArticlesPage = () => {
  return (
    <Suspense fallback={<div></div>}>
      <RawArticlesPage/>
    </Suspense>
  )
};

export default ArticlesPage;
