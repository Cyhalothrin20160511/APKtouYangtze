"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import allGeneric from "../app/locales/generic.json";
import CreateArticleForm from "@/components/CreateArticleForm";
import { useState } from "react";

type GenericText = Record<string, string>

type ArticlesFooterProps = {
  page: number;
  totalPages: number;
  hasNextPage: boolean;
};

const ArticlesFooter: React.FC<ArticlesFooterProps> = ({ page, totalPages, hasNextPage }) => {
  type Article = {
    language: string;
    title: string;
    desc: string;
    sourceUrl?: string;
    imageUrl?: string;
  };

  const { lang } = useParams() as { lang: string };
  const genericText: GenericText =
    (allGeneric as Record<string, GenericText>)[lang] ||
    (allGeneric as Record<string, GenericText>)['en']

  const [successMessage, setSuccessMessage] = useState("");

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  
  const handleArticleSubmit = (newArticle: Article) => {
    fetch(`${API_BASE_URL}/propose-articles`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newArticle),
    })
      .then((response) => response.json())
      .then((data) => {
        setSuccessMessage(genericText.success_message);
        setTimeout(() => setSuccessMessage(""), 5000);
      })
      .catch((error) => {
        console.error("Error submiting article:", error);
      });
  };

  return (
    <footer className="text-body-secondary py-5">
      <div className="container text-center">
        {page > 1 && (
          <Link href={`${page - 1}`} className="btn btn-sm btn-outline-secondary">
            {genericText.previous_page}
          </Link>
        )}
        <span> {genericText.page_1}</span>
        <span> {page}</span>
        <span>{genericText.page_2}</span>
        <span>{genericText.total_pages_1}</span>
        <span> {page} </span>
        <span>{genericText.total_pages_2} </span>
        {hasNextPage && (
          <Link href={`${page + 1}`} className="btn btn-sm btn-outline-secondary">
            {genericText.next_page}
          </Link>
        )}
      </div>
      <div className="container text-center mt-5">
        {successMessage && <div className="alert alert-success mt-3">{successMessage}</div>}
        <span>{genericText.already_translated_article} </span>
        <CreateArticleForm
          onSubmit={handleArticleSubmit}
        />
      </div>
    </footer>
  );
};

export default ArticlesFooter;
