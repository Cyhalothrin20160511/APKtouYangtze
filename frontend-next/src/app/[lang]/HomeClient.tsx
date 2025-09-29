'use client'
import React, { useState, useEffect, useRef } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import ClientNavbar from '@/components/ClientNavbar';

type GenericText = {
  title: string
  home_welcome: string
  home_desc: string
  video_desc: string
  play_video: string
  default_articles: string
  special_articles: string
}

export default function HomeClient({
  genericText,
  lang,
}: {
  genericText: GenericText
  lang: string
}) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [displayText, setDisplayText] = useState('')
  const [fade, setFade] = useState(true)
  const [index, setIndex] = useState(0)

  const fullText = genericText.home_welcome
  const exampleVideo = '/assets/video/【松江布】专题片.mp4'
  const videoThumbnail = '/assets/images/video-thumbnail.jpg'

  const handlePlay = () => {
    videoRef.current?.play()
    setIsPlaying(true)
  }
  const handleEnded = () => setIsPlaying(false)

  useEffect(() => {
    let iv: ReturnType<typeof setInterval>
    const isWestern = ['en', 'el', 'ru'].includes(lang)
    if (fade) {
      iv = setInterval(() => {
        setDisplayText(fullText.slice(0, index + 1))
        setIndex(i => i + 1)
      }, isWestern ? 50 : 100)
    }
    if (index === fullText.length) {
      setTimeout(() => setFade(false), 3000)
    }
    return () => clearInterval(iv)
  }, [fade, index, fullText, lang])

  useEffect(() => {
    if (!fade) {
      setIndex(0)
      setTimeout(() => {
        setDisplayText('')
        setFade(true)
      }, 500)
    }
  }, [fade])

  return (
    <>
      <Head>
        <title>{genericText.title}</title>
        <meta name="description" content={genericText.home_desc.slice(0, 150)} />
      </Head>

      <ClientNavbar />

      <main>
        <div className="bg-body-tertiary">
          <h1
            className="text-center m-5 p-3 bg-dark text-white rounded fs-2"
            style={{ minHeight: '2.2em' }}
          >
            <span style={{ opacity: fade ? 1 : 0, transition: 'opacity 0.5s' }}>
              {displayText}
            </span>
          </h1>

          <div className="container d-flex justify-content-center align-items-center">
            <div className="row mt-3 d-flex align-items-stretch">
              <div className="col-md-6 text-center d-flex flex-column justify-content-center">
                <div className="video-container position-relative w-100">
                  {!isPlaying ? (
                    <>
                      <img
                        src={videoThumbnail}
                        alt="Video Thumbnail"
                        className="w-100"
                        style={{ cursor: 'pointer' }}
                        onClick={handlePlay}
                      />
                      <button
                        className="btn btn-primary position-absolute top-50 start-50 translate-middle"
                        onClick={handlePlay}
                      >
                        ▶ {genericText.play_video}
                      </button>
                    </>
                  ) : (
                    <video
                      ref={videoRef}
                      className="w-100"
                      controls
                      preload="none"
                      onEnded={handleEnded}
                    >
                      <source src={exampleVideo} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  )}
                </div>
                <div className="m-3 text-secondary">
                  {genericText.video_desc.split('\n').map((p, i) => (
                    <p key={i} className="m-1">
                      {p}
                    </p>
                  ))}
                </div>
              </div>

              <div className="col-md-6 d-flex flex-column">
                <div className="p-4 bg-white rounded">
                  <h2 className="m-1 mb-3">{genericText.home_welcome}</h2>
                  {genericText.home_desc.split('\n').map((p, i) => (
                    <p key={i} className="m-1" style={{ textIndent: '2rem' }}>
                      {p}
                    </p>
                  ))}
                </div>

                <div className="mb-4 d-flex justify-content-center w-100 flex-grow-1">
                  <Link
                    href={`/${lang}/china/articles/1`}
                    className="btn btn-danger text-white m-3 flex-grow-1 fs-4 d-flex align-items-center justify-content-center"
                  >
                    {genericText.default_articles}
                  </Link>
                  <Link
                    href={`/${lang}/songjiang/articles/1`}
                    className="btn btn-success text-white m-3 flex-grow-1 fs-4 d-flex align-items-center justify-content-center"
                  >
                    {genericText.special_articles}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}