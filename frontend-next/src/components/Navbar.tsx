"use client";

import React from "react";
import { useParams, usePathname, useSearchParams } from 'next/navigation';
import Image from "next/image";
import Link from "next/link";

import allGeneric from "../app/locales/generic.json";

type GenericText = Record<string, string>

const Navbar = () => {
  const params = useParams() as { lang: string };
  const lang = params.lang;

  const genericText: GenericText =
    (allGeneric as Record<string, GenericText>)[lang] ||
    (allGeneric as Record<string, GenericText>)['en'];

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const qs = searchParams.toString();

  const pathWithoutLang = pathname.replace(/^\/[a-z]{2}/, "") || "/";

  const logo = "/assets/images/icon.png";
  const supportedLocales = [
    { code: 'en', label: 'English' },
    { code: 'el', label: 'Ελληνικά' },
    { code: 'sc', label: '简体中文' },
    { code: 'ja', label: '日本語' },
    { code: 'ru', label: 'Русский' },
  ];

  return (
    <nav data-bs-theme="dark">
      <div className="collapse text-bg-dark" id="navbarHeader">
        <div className="container">
          <div className="row">
            <div className="col-sm-8 col-md-7 py-4">
              <h4>{genericText.about_encyclopedia}</h4>
              <p className="text-body-secondary">
                {genericText.about_encyclopedia_desc}
              </p>
              <h4>{genericText.github_url}</h4>
              <p className="text-body-secondary">
                <a
                  href="https://github.com/Cyhalothrin20160511/APKtouYangtze"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-body-secondary"
                >
                  https://github.com/Cyhalothrin20160511/APKtouYangtze
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="navbar navbar-dark bg-dark shadow-sm">
        <div className="container d-flex align-items-center justify-content-between">
          <Link
            href={`/${lang}`}
            className="navbar-brand d-flex align-items-center"
            style={{
              wordWrap: "break-word",
              overflowWrap: "break-word",
              whiteSpace: "normal",
              wordBreak: "break-all",
            }}
          >
            <Image
              src={logo}
              alt="Logo"
              width={40}
              height={40}
              style={{ marginRight: 10 }}
            />
            <strong>{genericText.title}</strong>
          </Link>

          <div className="btn-group">
            {supportedLocales.map(({ code, label }) => {
              const href = `/${code}${pathWithoutLang}${
                qs ? "?" + qs : ""
              }`;

              return (
                <Link
                  key={code}
                  href={href}
                  className={`btn btn-sm btn-outline-secondary ${
                    lang === code ? "active" : ""
                  }`}
                >
                  {label}
                </Link>
              );
            })}
          </div>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarHeader"
            aria-controls="navbarHeader"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
